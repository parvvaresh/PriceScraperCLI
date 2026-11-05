package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"regexp"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/fatih/color"
	"github.com/jedib0t/go-pretty/v6/table"
	"github.com/jedib0t/go-pretty/v6/text"
)

// --------------------------- Labels & Order ---------------------------

// Map Persian labels (as seen on tgju.org) to English keys for display.
var columnMap = map[string]string{
	"بورس":      "Stock",
	"انس طلا":   "GoldOunce",
	"مثقال طلا": "GoldMithqal",
	"طلا ۱۸":    "Gold18K",
	"سکه":       "Coin",
	"دلار":      "Dollar",
	"نفت برنت":  "BrentOil",
	"تتر":       "Tether",
	"بیت کوین":  "Bitcoin",
}

// Display order of English keys
var displayOrder = []string{
	"Stock", "GoldOunce", "GoldMithqal", "Gold18K", "Coin", "Dollar", "BrentOil", "Tether", "Bitcoin",
}

// --------------------------- Utils ---------------------------

func clearScreen() {
	// ANSI clear; works in most terminals (Windows 10+ with ANSI)
	fmt.Print("\033[H\033[2J")
}

// Normalize digits & separators (handles Persian/Arabic numerals and separators)
func normalizeNumberString(s string) string {
	replacements := map[rune]rune{
		'۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
		'٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
	}
	var b strings.Builder
	for _, r := range s {
		if rep, ok := replacements[r]; ok {
			b.WriteRune(rep)
			continue
		}
		// Persian decimal separator '٫' should become '.'
		if r == '٫' {
			b.WriteRune('.')
			continue
		}
		// drop common thousands separators & bidi controls; keep dot for decimals
		if r == '٬' || r == '،' || r == ',' || r == ' ' ||
			r == '\u200f' || r == '\u200e' || r == '\u202a' || r == '\u202b' {
			continue
		}
		if (r >= '0' && r <= '9') || r == '.' {
			b.WriteRune(r)
		}
	}
	return b.String()
}

func parseFloatSafe(s string) float64 {
	ns := normalizeNumberString(s)
	if ns == "" {
		return 0
	}
	f, err := strconv.ParseFloat(ns, 64)
	if err != nil {
		return 0
	}
	return f
}

// Extract first number-like token
var numRe = regexp.MustCompile(`[\d۰-۹٠-٩\.,٬،٫]+`)

func firstNumberLike(text string) string {
	return numRe.FindString(text)
}

func cloneMap(m map[string]string) map[string]string {
	cp := make(map[string]string, len(m))
	for k, v := range m {
		cp[k] = v
	}
	return cp
}

// --------------------------- Jalali (Shamsi) Date ---------------------------
// Convert Gregorian date to Jalali (algorithm based on well-known civil calendar conversion)
func gregorianToJalali(gy, gm, gd int) (jy, jm, jd int) {
	g_d_m := [...]int{0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334}
	if gy > 1600 {
		jy = 979
		gy -= 1600
	} else {
		jy = 0
		gy -= 621
	}
	var gy2 int
	if gm > 2 {
		gy2 = gy + 1
	} else {
		gy2 = gy
	}
	days := 365*gy + (gy2+3)/4 - (gy2+99)/100 + (gy2+399)/400 - 80 + gd + g_d_m[gm-1]
	jy += 33 * (days / 12053)
	days %= 12053
	jy += 4 * (days / 1461)
	days %= 1461
	if days > 365 {
		jy += (days - 1) / 365
		days = (days - 1) % 365
	}
	if days < 186 {
		jm = 1 + days/31
		jd = 1 + days%31
	} else {
		days -= 186
		jm = 7 + days/30
		jd = 1 + days%30
	}
	return
}

func jalaliDateString(t time.Time) string {
	jy, jm, jd := gregorianToJalali(t.Year(), int(t.Month()), t.Day())
	return fmt.Sprintf("%04d-%02d-%02d", jy, jm, jd)
}

// --------------------------- Scraper ---------------------------

const tgjuURL = "https://www.tgju.org/"

func fetchDocument() (*goquery.Document, error) {
	req, err := http.NewRequest("GET", tgjuURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")

	client := &http.Client{Timeout: 12 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("status code: %d", resp.StatusCode)
	}
	return goquery.NewDocumentFromReader(resp.Body)
}

func ScrapePrices() (map[string]string, error) {
	doc, err := fetchDocument()
	if err != nil {
		return nil, err
	}

	data := ExtractPrices(doc)

	now := time.Now()
	data["Time"] = now.Format("15:04:05")
	data["JalaliDate"] = jalaliDateString(now)
	return data, nil
}

// runJSON fetches one snapshot and writes it as JSON (stdout or -out), optionally
// appending to a history file. Used by the GitHub Pages workflow.
func runJSON(out, historyPath string, historyMax int) error {
	snap, err := FetchSnapshot()
	if err != nil {
		return err
	}
	if err := writeJSON(out, snap, true); err != nil {
		return err
	}
	if historyPath != "" {
		return AppendHistory(historyPath, snap, historyMax)
	}
	return nil
}

// --------------------------- Table Rendering ---------------------------

func formatDiff(d float64) string {
	sign := ""
	if d < 0 {
		sign = "-"
		d = -d
	}
	return fmt.Sprintf("%s%.4f", sign, d)
}

func renderTable(curr, prev map[string]string) {
	tw := table.NewWriter()
	tw.SetOutputMirror(os.Stdout)
	tw.SetStyle(table.StyleRounded)
	tw.Style().Options.SeparateRows = false
	tw.Style().Options.DrawBorder = true
	tw.Style().Options.DoNotColorBordersAndSeparators = false

	tw.AppendHeader(table.Row{"Item", "Price", "Change"})

	for _, key := range displayOrder {
		val := strings.TrimSpace(curr[key])

		changeCell := "—"
		displayVal := val

		if prev != nil && prev[key] != "" && val != "" {
			prevF := parseFloatSafe(prev[key])
			currF := parseFloatSafe(val)

			if prevF > 0 && currF > 0 {
				diff := currF - prevF
				pct := (diff / prevF) * 100.0
				switch {
				case diff > 0:
					displayVal = color.New(color.FgGreen, color.Bold).Sprint(val)
					changeCell = color.New(color.FgGreen).Sprintf("▲ %s (%.2f%%)", formatDiff(diff), pct)
				case diff < 0:
					displayVal = color.New(color.FgRed, color.Bold).Sprint(val)
					changeCell = color.New(color.FgRed).Sprintf("▼ %s (%.2f%%)", formatDiff(diff), pct)
				default:
					displayVal = color.New(color.FgHiBlack).Sprint(val)
					changeCell = color.New(color.FgHiBlack).Sprint("• 0")
				}
			} else {
				displayVal = color.New(color.FgHiBlack).Sprint(val)
				changeCell = color.New(color.FgHiBlack).Sprint("• —")
			}
		} else if val != "" {
			displayVal = color.New(color.FgHiWhite).Sprint(val)
			changeCell = color.New(color.FgHiBlack).Sprint("• —")
		} else {
			displayVal = color.New(color.FgHiBlack).Sprint("—")
			changeCell = color.New(color.FgHiBlack).Sprint("• —")
		}

		tw.AppendRow(table.Row{key, displayVal, changeCell})
	}

	tw.SetColumnConfigs([]table.ColumnConfig{
		{Number: 1, Align: text.AlignLeft},
		{Number: 2, Align: text.AlignRight},
		{Number: 3, Align: text.AlignRight},
	})

	header := color.New(color.FgCyan, color.Bold).Sprintf("Date (Jalali): %s   |   Time: %s", curr["JalaliDate"], curr["Time"])
	fmt.Println(header)
	tw.Render()
	fmt.Println()
}

// --------------------------- Main ---------------------------

func main() {
	interval := flag.Int("interval", 20, "Auto refresh interval (seconds). 0 or negative disables auto refresh.")
	once := flag.Bool("once", false, "Fetch once and exit.")
	jsonOut := flag.Bool("json", false, "Fetch once and print a JSON snapshot instead of the table.")
	out := flag.String("out", "", "With -json: write the snapshot to this file instead of stdout.")
	historyPath := flag.String("history", "", "With -json: append the snapshot to this JSON history file.")
	historyMax := flag.Int("history-max", 2000, "With -history: maximum number of points to keep.")
	flag.Parse()

	log.SetFlags(0)

	if *jsonOut || *out != "" {
		if err := runJSON(*out, *historyPath, *historyMax); err != nil {
			log.Fatalf("error: %v", err)
		}
		return
	}

	quitCh := make(chan struct{})
	go handleSignals(quitCh)

	inputCh := make(chan string, 1)
	go readInput(inputCh)

	var prev map[string]string

	refresh := func() {
		data, err := ScrapePrices()
		if err != nil {
			clearScreen()
			log.Printf(color.New(color.FgRed, color.Bold).Sprintf("Error fetching prices: %v\n", err))
			return
		}
		clearScreen()
		renderTable(data, prev)
		prev = cloneMap(data)
		fmt.Println(color.New(color.FgHiBlack).Sprint("r + Enter: refresh   |   q + Enter: quit"))
	}

	refresh()

	if *once {
		return
	}

	var tick *time.Ticker
	if *interval > 0 {
		tick = time.NewTicker(time.Duration(*interval) * time.Second)
		defer tick.Stop()
	}

	for {
		select {
		case <-quitCh:
			fmt.Println("\nExiting. Goodbye!")
			return
		case s := <-inputCh:
			s = strings.TrimSpace(strings.ToLower(s))
			if s == "q" {
				fmt.Println("\nExiting. Goodbye!")
				return
			}
			if s == "r" || s == "" {
				refresh()
			}
		case <-func() <-chan time.Time {
			if tick != nil {
				return tick.C
			}
			return make(chan time.Time)
		}():
			refresh()
		}
	}
}

func handleSignals(quitCh chan<- struct{}) {
	c := make(chan os.Signal, 2)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	<-c
	close(quitCh)
}

func readInput(out chan<- string) {
	reader := bufio.NewReader(os.Stdin)
	for {
		text, err := reader.ReadString('\n')
		if err != nil {
			return
		}
		out <- text
	}
}
