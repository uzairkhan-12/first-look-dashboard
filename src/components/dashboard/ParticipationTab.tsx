import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ScatterChart, Scatter, CartesianGrid, Legend } from "recharts";

const TOOLTIP_STYLE = { background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" };
const BLUE = "hsl(210, 80%, 55%)";
const PURPLE = "hsl(270, 60%, 55%)";
const TEAL = "#2DD4BF";
const yearColor = (y: number) => (y === 2024 ? BLUE : y === 2025 ? PURPLE : TEAL);

interface IpoRow {
  ipo_name: string;
  year: number;
  retail_coverage_multiple: number | null;
  retail_allocation_pct: number | null;
  retail_subscribers: number | null;
  ipo_size_sar_millions: number | null;
  is_undersubscribed: boolean | null;
  listing_date: string | null;
}

interface KpiRow {
  year: number;
  avg_retail_alloc_pct: number | null;
  median_retail_coverage: number | null;
  avg_subscribers_thousands: number | null;
  undersubscribed_count: number | null;
  total_ipos: number | null;
}

const MetricCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-mono font-bold ${color || "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const truncate = (s: string, n: number) => (s.length > n ? s.substring(0, n - 1) + "…" : s);

const ParticipationTab = () => {
  const ipoQuery = useQuery({
    queryKey: ["ipo_participation"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ipo_participation")
        .select("ipo_name, year, retail_coverage_multiple, retail_allocation_pct, retail_subscribers, ipo_size_sar_millions, is_undersubscribed, listing_date")
        .in("year", [2024, 2025, 2026])
        .order("year", { ascending: true })
        .order("listing_date", { ascending: true });
      if (error) throw error;
      return (data || []) as IpoRow[];
    },
  });

  const kpiQuery = useQuery({
    queryKey: ["participation_kpis"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("participation_kpis" as any)
        .select("*")
        .order("year", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as KpiRow[];
    },
  });

  const isLoading = ipoQuery.isLoading || kpiQuery.isLoading;
  const isError = ipoQuery.isError || kpiQuery.isError;

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-card p-4">
        <p className="text-sm text-destructive">Failed to load participation data. Please try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="text-sm font-semibold text-foreground">Participation Indicators</h2>
          <p className="text-xs text-muted-foreground mt-1">Loading live data…</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[340px] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const ipos = ipoQuery.data || [];
  const kpis = kpiQuery.data || [];
  const k24 = kpis.find((k) => k.year === 2024);
  const k25 = kpis.find((k) => k.year === 2025);

  const retailCoverageData = [...ipos]
    .map((d) => ({
      name: truncate(d.ipo_name, 10),
      fullName: d.ipo_name,
      coverage: Number(d.retail_coverage_multiple ?? 0),
      year: d.year,
      size: Number(d.ipo_size_sar_millions ?? 0),
    }))
    .sort((a, b) => b.coverage - a.coverage);

  const allocationData = ipos.map((d) => ({
    name: truncate(d.ipo_name, 8),
    fullName: d.ipo_name,
    allocation: Number(d.retail_allocation_pct ?? 0),
    year: d.year,
  }));

  const subscriberData = ipos
    .filter((d) => d.retail_subscribers !== null && d.retail_subscribers !== undefined)
    .map((d) => ({
      name: truncate(d.ipo_name, 10),
      fullName: d.ipo_name,
      subscribers: Number(d.retail_subscribers!) / 1000,
      year: d.year,
    }))
    .sort((a, b) => b.subscribers - a.subscribers);

  const scatterData = ipos.map((d) => ({
    name: d.ipo_name,
    size: Number(d.ipo_size_sar_millions ?? 0),
    coverage: Number(d.retail_coverage_multiple ?? 0),
    year: d.year,
  }));

  const fmt0 = (n: number | null | undefined) => (n == null ? "—" : `${Number(n).toFixed(0)}`);
  const fmt1 = (n: number | null | undefined) => (n == null ? "—" : `${Number(n).toFixed(1)}`);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Section Header */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-semibold text-foreground">Participation Indicators</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Measures retail investor willingness to participate — allocation take-up, oversubscription ratios, and subscriber volumes.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MetricCard label="2024 Avg Retail Alloc" value={`${fmt0(k24?.avg_retail_alloc_pct)}%`} color="text-chart-line" />
        <MetricCard label="2025 Avg Retail Alloc" value={`${fmt0(k25?.avg_retail_alloc_pct)}%`} color="text-chart-line" sub="↑ CMA mandate" />
        <MetricCard label="2024 Med. Retail Cov" value={`${fmt1(k24?.median_retail_coverage)}x`} color="text-accent" />
        <MetricCard label="2025 Med. Retail Cov" value={`${fmt1(k25?.median_retail_coverage)}x`} color="text-accent" />
        <MetricCard
          label="2025 Undersubscribed"
          value={`${k25?.undersubscribed_count ?? 0}/${k25?.total_ipos ?? 0}`}
          color={(k25?.undersubscribed_count ?? 0) > 0 ? "text-down" : "text-up"}
          sub="Coverage < 1.0x"
        />
        <MetricCard
          label="2024 Avg Subscribers"
          value={`${fmt0(k24?.avg_subscribers_thousands)}K`}
          sub="Per IPO with disclosed data"
        />
      </div>

      {/* Charts Row 1: Retail Coverage + Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Retail Coverage Multiple by IPO</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Blue = 2024, Purple = 2025, Teal = 2026</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={retailCoverageData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 8 }} angle={-40} textAnchor="end" height={60} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}x`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}x`, "Retail Coverage"]} labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""} />
              <ReferenceLine y={1} stroke="hsl(0, 72%, 51%)" strokeDasharray="4 4" label={{ value: "1x", fill: "hsl(0, 72%, 51%)", fontSize: 10 }} />
              <Bar dataKey="coverage" radius={[3, 3, 0, 0]}>
                {retailCoverageData.map((d, i) => (
                  <Cell key={i} fill={yearColor(d.year)} opacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Retail Allocation %</h3>
          <p className="text-[10px] text-muted-foreground mb-4">CMA requirement trending upward from 10% → 20-30%</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={allocationData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 8 }} angle={-40} textAnchor="end" height={60} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 35]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, "Retail Allocation"]} labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""} />
              <ReferenceLine y={10} stroke="hsl(220, 10%, 65%)" strokeDasharray="4 4" label={{ value: "Old min 10%", fill: "hsl(220, 10%, 65%)", fontSize: 9 }} />
              <ReferenceLine y={20} stroke="hsl(142, 55%, 35%)" strokeDasharray="4 4" label={{ value: "New min 20%", fill: "hsl(142, 55%, 35%)", fontSize: 9 }} />
              <Bar dataKey="allocation" radius={[3, 3, 0, 0]}>
                {allocationData.map((d, i) => (
                  <Cell key={i} fill={yearColor(d.year)} opacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2: Subscribers + Scatter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Retail Subscriber Count (thousands)</h3>
          <p className="text-[10px] text-muted-foreground mb-4">IPOs with disclosed subscriber data</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={subscriberData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 8 }} angle={-40} textAnchor="end" height={60} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}K`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v.toFixed(0)}K`, "Subscribers"]} labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""} />
              <Bar dataKey="subscribers" radius={[3, 3, 0, 0]}>
                {subscriberData.map((d, i) => (
                  <Cell key={i} fill={yearColor(d.year)} opacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">IPO Size vs Retail Coverage</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Larger IPOs tend to have lower retail coverage</p>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
              <XAxis dataKey="size" name="Size (Mn)" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}M`} />
              <YAxis dataKey="coverage" name="Coverage" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}x`} />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                formatter={(v: number, name: string) => [name === "Size (Mn)" ? `${v.toFixed(0)}M` : `${v}x`, name]}
                labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ? `Company : ${payload[0].payload.name}` : "")}
              />
              <ReferenceLine y={1} stroke="hsl(0, 72%, 51%)" strokeDasharray="4 4" />
              <Scatter data={scatterData.filter((d) => d.year === 2024)} fill={BLUE} name="2024" />
              <Scatter data={scatterData.filter((d) => d.year === 2025)} fill={PURPLE} name="2025" />
              <Scatter data={scatterData.filter((d) => d.year === 2026)} fill={TEAL} name="2026" />
              <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Observations */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Key Observations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">📉 Declining Demand</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              2025 median retail coverage ({fmt1(k25?.median_retail_coverage)}x) is significantly lower than 2024,
              with {k25?.undersubscribed_count ?? 0} IPOs failing to reach 1x subscription — a signal of waning retail confidence.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">📊 Allocation Shift</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Average retail allocation increased from {fmt0(k24?.avg_retail_alloc_pct)}% (2024) to {fmt0(k25?.avg_retail_alloc_pct)}% (2025),
              reflecting CMA's push to increase retail participation — yet coverage multiples declined.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">🔍 Size Effect</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Smaller IPOs tend to have higher coverage multiples. The inverse relationship between size and
              retail participation suggests capacity constraints in the retail investor base.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipationTab;
