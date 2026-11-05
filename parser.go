package main

import (
	"strings"

	"github.com/PuerkitoBio/goquery"
)

// PriceItem is a single indicator scraped from tgju.org.
type PriceItem struct {
	Key           string  `json:"key"`           // English key, e.g. "Dollar"
	Title         string  `json:"title"`         // Persian label as shown on tgju.org
	Price         string  `json:"price"`         // raw price text, e.g. "2,689,000"
	Value         float64 `json:"value"`         // parsed numeric price
	ChangePercent float64 `json:"changePercent"` // daily change in percent (signed)
	ChangeAmount  float64 `json:"changeAmount"`  // daily change in price units (signed)
	Direction     string  `json:"direction"`     // "up", "down" or "flat"
}

var infoBarSelectors = []string{
	"ul.info-bar.mobile-hide li",
	"ul.info-bar li",
}

// ExtractPrices parses a tgju.org DOM and extracts price fields based on Persian labels
// mapped to English keys via columnMap.
func ExtractPrices(doc *goquery.Document) map[string]string {
	data := make(map[string]string)
	for _, it := range ExtractItems(doc) {
		data[it.Key] = it.Price
	}
	return data
}

// ExtractItems parses a tgju.org DOM into structured items (price + daily change),
// returned in displayOrder.
func ExtractItems(doc *goquery.Document) []PriceItem {
	found := make(map[string]PriceItem)

	for _, sel := range infoBarSelectors {
		doc.Find(sel).Each(func(i int, s *goquery.Selection) {
			fullText := strings.TrimSpace(s.Text())
			if fullText == "" {
				return
			}
			for fa, en := range columnMap {
				if _, ok := found[en]; ok {
					continue
				}
				if !strings.Contains(fullText, fa) {
					continue
				}
				price := firstPrice(s, fullText)
				if price == "" {
					continue
				}
				item := PriceItem{
					Key:   en,
					Title: fa,
					Price: price,
					Value: parseFloatSafe(price),
				}
				item.ChangePercent, item.ChangeAmount = parseChange(strings.TrimSpace(s.Find(".info-change").Text()))
				item.Direction = direction(s, item.ChangeAmount)
				if item.Direction == "down" {
					item.ChangePercent, item.ChangeAmount = -abs(item.ChangePercent), -abs(item.ChangeAmount)
				}
				found[en] = item
			}
		})
	}

	items := make([]PriceItem, 0, len(found))
	for _, key := range displayOrder {
		if it, ok := found[key]; ok {
			items = append(items, it)
		}
	}
	return items
}

func firstPrice(s *goquery.Selection, fullText string) string {
	candidates := []string{
		strings.TrimSpace(s.Find(".value").Text()),
		strings.TrimSpace(s.Find(".info-price").Text()),
		strings.TrimSpace(s.Find("span").Last().Text()),
		fullText,
	}
	for _, c := range candidates {
		if c == "" {
			continue
		}
		if num := firstNumberLike(c); num != "" {
			return num
		}
	}
	return ""
}

// parseChange reads tgju's change text, formatted like "(1.77%) 71.96".
func parseChange(text string) (pct, amount float64) {
	if text == "" {
		return 0, 0
	}
	if open, close := strings.Index(text, "("), strings.Index(text, ")"); open >= 0 && close > open {
		pct = parseSignedFloat(text[open+1 : close])
		text = text[close+1:]
	}
	amount = parseSignedFloat(text)
	return pct, amount
}

func parseSignedFloat(s string) float64 {
	v := parseFloatSafe(firstNumberLike(s))
	if strings.ContainsAny(s, "-−") {
		v = -v
	}
	return v
}

// direction prefers tgju's own "high"/"low" class and falls back to the change sign.
func direction(s *goquery.Selection, amount float64) string {
	switch {
	case s.HasClass("high"):
		return "up"
	case s.HasClass("low"):
		return "down"
	case amount > 0:
		return "up"
	case amount < 0:
		return "down"
	default:
		return "flat"
	}
}

func abs(f float64) float64 {
	if f < 0 {
		return -f
	}
	return f
}
