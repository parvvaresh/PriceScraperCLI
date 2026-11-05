package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"time"
	_ "time/tzdata" // embed tz database so Asia/Tehran works in minimal containers/CI
)

// Snapshot is the JSON document written by -json / -out and consumed by the web UI.
type Snapshot struct {
	Source     string      `json:"source"`
	FetchedAt  time.Time   `json:"fetchedAt"`
	JalaliDate string      `json:"jalaliDate"`
	Time       string      `json:"time"`
	Items      []PriceItem `json:"items"`
}

// HistoryPoint is one compact entry in history.json.
type HistoryPoint struct {
	T      time.Time          `json:"t"`
	Values map[string]float64 `json:"v"`
}

func tehran() *time.Location {
	if loc, err := time.LoadLocation("Asia/Tehran"); err == nil {
		return loc
	}
	return time.FixedZone("IRST", 3*3600+30*60)
}

// FetchSnapshot scrapes tgju.org and returns a structured snapshot.
func FetchSnapshot() (*Snapshot, error) {
	doc, err := fetchDocument()
	if err != nil {
		return nil, err
	}
	items := ExtractItems(doc)
	if len(items) == 0 {
		return nil, errors.New("no prices found on page (layout may have changed)")
	}
	now := time.Now().In(tehran())
	return &Snapshot{
		Source:     tgjuURL,
		FetchedAt:  now.UTC().Truncate(time.Second),
		JalaliDate: jalaliDateString(now),
		Time:       now.Format("15:04:05"),
		Items:      items,
	}, nil
}

func writeJSON(path string, v any, indent bool) error {
	var b []byte
	var err error
	if indent {
		b, err = json.MarshalIndent(v, "", "  ")
	} else {
		b, err = json.Marshal(v)
	}
	if err != nil {
		return err
	}
	b = append(b, '\n')
	if path == "" || path == "-" {
		_, err = os.Stdout.Write(b)
		return err
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return err
	}
	return os.WriteFile(path, b, 0o644)
}

// AppendHistory loads path (if present), appends the snapshot, keeps the newest
// maxPoints entries and writes it back.
func AppendHistory(path string, snap *Snapshot, maxPoints int) error {
	var hist []HistoryPoint
	b, err := os.ReadFile(path)
	switch {
	case err == nil:
		if err := json.Unmarshal(b, &hist); err != nil {
			fmt.Fprintf(os.Stderr, "warning: ignoring unreadable history %s: %v\n", path, err)
			hist = nil
		}
	case errors.Is(err, fs.ErrNotExist):
	default:
		return err
	}

	point := HistoryPoint{T: snap.FetchedAt, Values: make(map[string]float64, len(snap.Items))}
	for _, it := range snap.Items {
		point.Values[it.Key] = it.Value
	}
	hist = append(hist, point)
	if maxPoints > 0 && len(hist) > maxPoints {
		hist = hist[len(hist)-maxPoints:]
	}
	return writeJSON(path, hist, false)
}
