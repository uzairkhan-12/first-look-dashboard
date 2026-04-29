## Goal

Replace hardcoded `ipoData` usage in the Participation tab with live Supabase queries against `ipo_participation` (per-IPO) and `participation_kpis` (summary cards), preserving all existing styling, colors, and layout.

## Findings

- The Supabase project is connected (config.toml + secrets exist), but no Supabase JS client file currently exists at `src/integrations/supabase/client.ts`. We need to create it.
- `participation_kpis` view returns rows for years 2024, 2025, 2026 with: `avg_retail_alloc_pct`, `median_retail_coverage`, `avg_subscribers_thousands`, `undersubscribed_count`, `total_ipos`.
- `ipo_participation` has 27 rows with all fields needed for the bar charts and scatter plot.
- Other tabs (Aftermarket, Sentiment, etc.) still use `ipoData`, so the local mock file must remain — only ParticipationTab changes.

## Changes

### 1. Create `src/integrations/supabase/client.ts`

Initialize the client using the env vars Lovable auto-populates (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) so it can be imported as `@/integrations/supabase/client`.

### 2. Rewrite `src/components/dashboard/ParticipationTab.tsx`

- Add two `useQuery` hooks (TanStack Query is already in the project) — or `useEffect` + `useState` if simpler — to fetch:
  - `ipo_participation` ordered by `year, listing_date` → drives the 4 charts (retail coverage bar, allocation bar, subscribers bar, size vs coverage scatter).
  - `participation_kpis` ordered by `year` → drives the 6 KPI cards.
- Map DB columns to the existing chart shape:
  - `ipo_name` → `name` / `fullName`
  - `retail_coverage_multiple` → `coverage`
  - `retail_allocation_pct` → `allocation`
  - `retail_subscribers` (nullable) → `subscribers` (÷1000 for K display); filter nulls for the subscriber chart
  - `ipo_size_sar_millions` → `size`
- KPI card mapping (exactly as specified):
  - 2024 Avg Retail Alloc → `avg_retail_alloc_pct` (year 2024)
  - 2025 Avg Retail Alloc → `avg_retail_alloc_pct` (year 2025)
  - 2024 Med. Retail Cov → `median_retail_coverage` (year 2024)
  - 2025 Med. Retail Cov → `median_retail_coverage` (year 2025)
  - 2025 Undersubscribed → `undersubscribed_count` / `total_ipos` (year 2025)
  - 2024 Avg Subscribers → `avg_subscribers_thousands` (year 2024), formatted `822K`
- Loading state: while either query is pending, show skeleton blocks (`@/components/ui/skeleton`) sized to match the KPI grid and the four chart cards. Keep section header visible.
- Error state: small inline error message inside the section card (no toast) if either query fails.
- Keep all styling untouched: same `TOOLTIP_STYLE`, `BLUE`/`PURPLE` colors, ReferenceLines, Cell coloring by year, Key Observations block (now driven by computed values from the live KPI rows).
- The Key Observations text currently references `d24`/`d25`; replace with the corresponding values from the KPI query results.

### 3. No other files change

- Do NOT touch `src/data/ipoData.ts` — still used by other tabs.
- Do NOT modify chart layout, grid breakpoints, or copy beyond substituting computed numbers.

## Notes

- 2026 data exists in both sources (1 IPO: Saleh Al Rashed). Per spec, KPI cards only display 2024/2025, but the per-IPO charts will naturally include 2026 rows too. Since they only color-code 2024 (blue) and 2025 (purple), 2026 rows would render in a fallback color. I will filter the per-IPO query to `year in (2024, 2025)` to match the existing visual contract (two-year comparison). If you want 2026 included with a third color, let me know.
