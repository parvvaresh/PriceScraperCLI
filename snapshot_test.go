package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/PuerkitoBio/goquery"
)

const tgjuLikeHTML = `
<ul class="info-bar mobile-hide">
  <li id="l-ons" class=" high"><h3><em></em> انس طلا</h3>
    <span class="info-value"><span class="info-price">4,134.49</span></span>
    <span class="info-change">(1.77%) 71.96</span></li>
  <li id="l-oil_brent" class=" low"><h3><em></em> نفت برنت</h3>
    <span class="info-value"><span class="info-price">93.731</span></span>
    <span class="info-change">(1.53%) 1.432</span></li>
  <li id="l-price_dollar_rl" class=" "><h3><em></em> دلار</h3>
    <span class="info-value"><span class="info-price">2,689,000</span></span>
    <span class="info-change">(0%) 0</span></li>
</ul>`

func TestExtractItems(t *testing.T) {
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(tgjuLikeHTML))
	if err != nil {
		t.Fatal(err)
	}
	items := ExtractItems(doc)
	if len(items) != 3 {
		t.Fatalf("got %d items, want 3: %+v", len(items), items)
	}
	// displayOrder: GoldOunce, Dollar, BrentOil
	want := []struct {
		key, dir   string
		value, pct float64
		amount     float64
	}{
		{"GoldOunce", "up", 4134.49, 1.77, 71.96},
		{"Dollar", "flat", 2689000, 0, 0},
		{"BrentOil", "down", 93.731, -1.53, -1.432},
	}
	for i, w := range want {
		got := items[i]
		if got.Key != w.key || got.Direction != w.dir || got.Value != w.value ||
			got.ChangePercent != w.pct || got.ChangeAmount != w.amount {
			t.Errorf("item %d = %+v; want %+v", i, got, w)
		}
	}
}

func TestParseChange(t *testing.T) {
	cases := []struct {
		in          string
		pct, amount float64
	}{
		{"(1.77%) 71.96", 1.77, 71.96},
		{"(-0.5%) -1,200", -0.5, -1200},
		{"(۰٫۵%) ۱۲", 0.5, 12},
		{"", 0, 0},
	}
	for _, c := range cases {
		pct, amount := parseChange(c.in)
		if pct != c.pct || amount != c.amount {
			t.Errorf("parseChange(%q) = %v, %v; want %v, %v", c.in, pct, amount, c.pct, c.amount)
		}
	}
}

func TestAppendHistoryTrims(t *testing.T) {
	path := filepath.Join(t.TempDir(), "data", "history.json")
	for i := 0; i < 5; i++ {
		snap := &Snapshot{
			FetchedAt: time.Date(2026, 1, 1, 0, i, 0, 0, time.UTC),
			Items:     []PriceItem{{Key: "Dollar", Value: float64(100 + i)}},
		}
		if err := AppendHistory(path, snap, 3); err != nil {
			t.Fatal(err)
		}
	}
	b, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	var hist []HistoryPoint
	if err := json.Unmarshal(b, &hist); err != nil {
		t.Fatal(err)
	}
	if len(hist) != 3 || hist[0].Values["Dollar"] != 102 || hist[2].Values["Dollar"] != 104 {
		t.Fatalf("unexpected history: %+v", hist)
	}
}
