import { ipoData } from "@/data/ipoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ScatterChart, Scatter, CartesianGrid, Legend, LineChart, Line } from "recharts";

const TOOLTIP_STYLE = { background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" };
const BLUE = "hsl(210, 80%, 55%)";
const PURPLE = "hsl(270, 60%, 55%)";

const getYearData = (year: number) => {
  const ipos = ipoData.filter(d => d.year === year);
  const avgRetailAlloc = ipos.reduce((s, d) => s + d.retailAllocationPercent, 0) / ipos.length;
  const avgRetailCov = ipos.reduce((s, d) => s + d.retailCoverageMultiple, 0) / ipos.length;
  const avgInstCov = ipos.reduce((s, d) => s + d.institutionalCoverageMultiple, 0) / ipos.length;
  const medianRetailCov = [...ipos].sort((a, b) => a.retailCoverageMultiple - b.retailCoverageMultiple)[Math.floor(ipos.length / 2)].retailCoverageMultiple;
  const subscribersData = ipos.filter(d => d.retailSubscriberCount !== null);
  const avgSubscribers = subscribersData.length ? subscribersData.reduce((s, d) => s + d.retailSubscriberCount!, 0) / subscribersData.length : 0;
  const oversubscribed = ipos.filter(d => d.retailCoverageMultiple >= 1).length;
  const undersubscribed = ipos.filter(d => d.retailCoverageMultiple < 1).length;
  return { ipos, avgRetailAlloc, avgRetailCov, avgInstCov, medianRetailCov, avgSubscribers, subscribersData, oversubscribed, undersubscribed };
};

const d24 = getYearData(2024);
const d25 = getYearData(2025);

// Retail coverage by IPO
const retailCoverageData = ipoData
  .map(d => ({
    name: d.name.length > 10 ? d.name.substring(0, 8) + "…" : d.name,
    fullName: d.name,
    coverage: d.retailCoverageMultiple,
    year: d.year,
    size: d.totalOfferSize,
  }))
  .sort((a, b) => b.coverage - a.coverage);

// Retail allocation trend
const allocationData = ipoData.map(d => ({
  name: d.name.length > 8 ? d.name.substring(0, 6) + "…" : d.name,
  fullName: d.name,
  allocation: d.retailAllocationPercent,
  year: d.year,
  listingDate: d.listingDate,
}));

// Subscriber count data
const subscriberData = ipoData
  .filter(d => d.retailSubscriberCount !== null)
  .map(d => ({
    name: d.name.length > 10 ? d.name.substring(0, 8) + "…" : d.name,
    fullName: d.name,
    subscribers: d.retailSubscriberCount! / 1000,
    coverage: d.retailCoverageMultiple,
    year: d.year,
  }))
  .sort((a, b) => b.subscribers - a.subscribers);

// Scatter: Size vs Coverage
const scatterData = ipoData
  .map(d => ({
    name: d.name,
    size: d.totalOfferSize,
    coverage: d.retailCoverageMultiple,
    year: d.year,
  }));

const MetricCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-mono font-bold ${color || "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const ParticipationTab = () => {
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
        <MetricCard label="2024 Avg Retail Alloc" value={`${d24.avgRetailAlloc.toFixed(0)}%`} color="text-chart-line" />
        <MetricCard label="2025 Avg Retail Alloc" value={`${d25.avgRetailAlloc.toFixed(0)}%`} color="text-chart-line" sub="↑ CMA mandate" />
        <MetricCard label="2024 Med. Retail Cov" value={`${d24.medianRetailCov.toFixed(1)}x`} color="text-accent" />
        <MetricCard label="2025 Med. Retail Cov" value={`${d25.medianRetailCov.toFixed(1)}x`} color="text-accent" />
        <MetricCard label="2025 Undersubscribed" value={`${d25.undersubscribed}/${d25.ipos.length}`} color={d25.undersubscribed > 0 ? "text-down" : "text-up"} sub="Coverage < 1.0x" />
        <MetricCard label="2024 Avg Subscribers" value={`${(d24.avgSubscribers / 1000).toFixed(0)}K`} sub={`${d24.subscribersData.length} IPOs w/ data`} />
      </div>

      {/* Charts Row 1: Retail Coverage + Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Retail Coverage Multiple by IPO</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Blue = 2024, Purple = 2025</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={retailCoverageData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 8 }} angle={-40} textAnchor="end" height={60} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}x`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}x`, "Retail Coverage"]} labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""} />
              <ReferenceLine y={1} stroke="hsl(0, 72%, 51%)" strokeDasharray="4 4" label={{ value: "1x", fill: "hsl(0, 72%, 51%)", fontSize: 10 }} />
              <Bar dataKey="coverage" radius={[3, 3, 0, 0]}>
                {retailCoverageData.map((d, i) => (
                  <Cell key={i} fill={d.year === 2024 ? BLUE : PURPLE} opacity={0.85} />
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
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[0, 35]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, "Retail Allocation"]} labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""} />
              <ReferenceLine y={10} stroke="hsl(220, 10%, 65%)" strokeDasharray="4 4" label={{ value: "Old min 10%", fill: "hsl(220, 10%, 65%)", fontSize: 9 }} />
              <ReferenceLine y={20} stroke="hsl(142, 55%, 35%)" strokeDasharray="4 4" label={{ value: "New min 20%", fill: "hsl(142, 55%, 35%)", fontSize: 9 }} />
              <Bar dataKey="allocation" radius={[3, 3, 0, 0]}>
                {allocationData.map((d, i) => (
                  <Cell key={i} fill={d.year === 2024 ? BLUE : PURPLE} opacity={0.85} />
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
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}K`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v.toFixed(0)}K`, "Subscribers"]} labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""} />
              <Bar dataKey="subscribers" radius={[3, 3, 0, 0]}>
                {subscriberData.map((d, i) => (
                  <Cell key={i} fill={d.year === 2024 ? BLUE : PURPLE} opacity={0.85} />
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
              <XAxis dataKey="size" name="Size (Mn)" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}M`} />
              <YAxis dataKey="coverage" name="Coverage" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}x`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, name: string) => [name === "Size (Mn)" ? `${v.toFixed(0)}M` : `${v}x`, name]} labelFormatter={(_, payload) => payload?.[0]?.payload?.name || ""} />
              <ReferenceLine y={1} stroke="hsl(0, 72%, 51%)" strokeDasharray="4 4" />
              <Scatter data={scatterData.filter(d => d.year === 2024)} fill={BLUE} name="2024" />
              <Scatter data={scatterData.filter(d => d.year === 2025)} fill={PURPLE} name="2025" />
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
              2025 median retail coverage ({d25.medianRetailCov.toFixed(1)}x) is significantly lower than 2024, 
              with {d25.undersubscribed} IPOs failing to reach 1x subscription — a signal of waning retail confidence.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">📊 Allocation Shift</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Average retail allocation increased from {d24.avgRetailAlloc.toFixed(0)}% (2024) to {d25.avgRetailAlloc.toFixed(0)}% (2025), 
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
