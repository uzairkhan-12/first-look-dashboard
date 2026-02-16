import { ipoPerformance, ipoData } from "@/data/ipoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Legend, LineChart, Line, CartesianGrid } from "recharts";

const TOOLTIP_STYLE = { background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" };
const BLUE = "hsl(210, 80%, 55%)";
const PURPLE = "hsl(270, 60%, 55%)";
const GREEN = "hsl(142, 70%, 45%)";
const RED = "hsl(0, 72%, 51%)";

const getMetrics = (year: number) => {
  const perfs = ipoPerformance.filter(d => d.year === year);
  const with3M = perfs.filter(d => d.return3M !== null);
  const with6M = perfs.filter(d => d.return6M !== null);
  const with9M = perfs.filter(d => d.return9M !== null);

  const aboveOffer3M = with3M.filter(d => !d.belowIssue3M).length;
  const aboveOffer6M = with6M.filter(d => !d.belowIssue6M).length;
  const aboveOffer9M = with9M.filter(d => !d.belowIssue9M).length;

  const avgReturn3M = with3M.length ? with3M.reduce((s, d) => s + d.return3M!, 0) / with3M.length : 0;
  const avgReturn6M = with6M.length ? with6M.reduce((s, d) => s + d.return6M!, 0) / with6M.length : 0;
  const avgReturn9M = with9M.length ? with9M.reduce((s, d) => s + d.return9M!, 0) / with9M.length : 0;

  const avgAbnormal3M = with3M.length ? with3M.reduce((s, d) => s + d.abnormalReturn3M!, 0) / with3M.length : 0;

  return {
    count: perfs.length, with3M, with6M, with9M,
    aboveOffer3M, aboveOffer6M, aboveOffer9M,
    pctAbove3M: with3M.length ? (aboveOffer3M / with3M.length) * 100 : 0,
    pctAbove6M: with6M.length ? (aboveOffer6M / with6M.length) * 100 : 0,
    pctAbove9M: with9M.length ? (aboveOffer9M / with9M.length) * 100 : 0,
    avgReturn3M, avgReturn6M, avgReturn9M, avgAbnormal3M,
  };
};

const m24 = getMetrics(2024);
const m25 = getMetrics(2025);

// % above offer price by horizon
const aboveOfferData = [
  { horizon: "3M", "2024": +m24.pctAbove3M.toFixed(0), "2025": +m25.pctAbove3M.toFixed(0) },
  { horizon: "6M", "2024": +m24.pctAbove6M.toFixed(0), "2025": +m25.pctAbove6M.toFixed(0) },
  { horizon: "9M", "2024": +m24.pctAbove9M.toFixed(0), "2025": +m25.pctAbove9M.toFixed(0) },
];

// Average return by horizon
const avgReturnData = [
  { horizon: "3M", "2024": +m24.avgReturn3M.toFixed(1), "2025": +m25.avgReturn3M.toFixed(1) },
  { horizon: "6M", "2024": +m24.avgReturn6M.toFixed(1), "2025": +m25.avgReturn6M.toFixed(1) },
  { horizon: "9M", "2024": +m24.avgReturn9M.toFixed(1), "2025": +m25.avgReturn9M.toFixed(1) },
];

// Individual IPO return trajectory
const trajectoryData = ipoPerformance
  .filter(d => d.return3M !== null)
  .map(d => ({
    name: d.name.length > 10 ? d.name.substring(0, 8) + "…" : d.name,
    fullName: d.name,
    "3M": d.return3M,
    "6M": d.return6M,
    "9M": d.return9M,
    year: d.year,
  }));

// Return distribution buckets
const getReturnDistribution = (year: number) => {
  const returns = ipoPerformance.filter(d => d.year === year && d.return3M !== null).map(d => d.return3M!);
  const buckets = [
    { range: "< -30%", count: returns.filter(r => r < -30).length },
    { range: "-30 to -10%", count: returns.filter(r => r >= -30 && r < -10).length },
    { range: "-10 to 0%", count: returns.filter(r => r >= -10 && r < 0).length },
    { range: "0 to 20%", count: returns.filter(r => r >= 0 && r < 20).length },
    { range: "20 to 50%", count: returns.filter(r => r >= 20 && r < 50).length },
    { range: "50%+", count: returns.filter(r => r >= 50).length },
  ];
  return buckets;
};

const dist24 = getReturnDistribution(2024);
const dist25 = getReturnDistribution(2025);
const distributionData = dist24.map((b, i) => ({
  range: b.range,
  "2024": b.count,
  "2025": dist25[i].count,
}));

const MetricCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-mono font-bold ${color || "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const AftermarketTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Section Header */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-semibold text-foreground">Aftermarket Signals</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Post-IPO performance indicators — tracks how IPOs trade after listing relative to offer price and the broader TASI index.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MetricCard label="2024 Above Offer (3M)" value={`${m24.aboveOffer3M}/${m24.with3M.length}`} color="text-up" sub={`${m24.pctAbove3M.toFixed(0)}%`} />
        <MetricCard label="2025 Above Offer (3M)" value={`${m25.aboveOffer3M}/${m25.with3M.length}`} color={m25.pctAbove3M >= 50 ? "text-up" : "text-down"} sub={`${m25.pctAbove3M.toFixed(0)}%`} />
        <MetricCard label="2024 Avg 3M Return" value={`${m24.avgReturn3M >= 0 ? "+" : ""}${m24.avgReturn3M.toFixed(1)}%`} color={m24.avgReturn3M >= 0 ? "text-up" : "text-down"} />
        <MetricCard label="2025 Avg 3M Return" value={`${m25.avgReturn3M >= 0 ? "+" : ""}${m25.avgReturn3M.toFixed(1)}%`} color={m25.avgReturn3M >= 0 ? "text-up" : "text-down"} />
        <MetricCard label="2024 Avg Abnormal (3M)" value={`${m24.avgAbnormal3M >= 0 ? "+" : ""}${m24.avgAbnormal3M.toFixed(1)}%`} color={m24.avgAbnormal3M >= 0 ? "text-up" : "text-down"} />
        <MetricCard label="2025 Avg Abnormal (3M)" value={`${m25.avgAbnormal3M >= 0 ? "+" : ""}${m25.avgAbnormal3M.toFixed(1)}%`} color={m25.avgAbnormal3M >= 0 ? "text-up" : "text-down"} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">% of IPOs Trading Above Offer Price</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={aboveOfferData}>
              <XAxis dataKey="horizon" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[0, 100]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <ReferenceLine y={50} stroke="hsl(35, 85%, 50%)" strokeDasharray="4 4" label={{ value: "50%", fill: "hsl(35, 85%, 50%)", fontSize: 10 }} />
              <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
              <Bar dataKey="2024" fill={BLUE} radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill={PURPLE} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Average Post-IPO Return by Horizon</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgReturnData}>
              <XAxis dataKey="horizon" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <ReferenceLine y={0} stroke="hsl(40, 15%, 80%)" />
              <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
              <Bar dataKey="2024" fill={BLUE} radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill={PURPLE} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2: Distribution + Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">3M Return Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={distributionData}>
              <XAxis dataKey="range" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 9 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
              <Bar dataKey="2024" fill={BLUE} radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill={PURPLE} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Individual IPO Return at 3M</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Ranked by performance. Blue = 2024, Purple = 2025</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trajectoryData.sort((a, b) => (b["3M"] ?? 0) - (a["3M"] ?? 0))}>
              <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 7 }} angle={-40} textAnchor="end" height={55} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} labelFormatter={(_, p) => p?.[0]?.payload?.fullName || ""} />
              <ReferenceLine y={0} stroke="hsl(40, 15%, 80%)" />
              <Bar dataKey="3M" radius={[3, 3, 0, 0]}>
                {trajectoryData.sort((a, b) => (b["3M"] ?? 0) - (a["3M"] ?? 0)).map((d, i) => (
                  <Cell key={i} fill={d.year === 2024 ? BLUE : PURPLE} opacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Observations */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Key Observations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">🔴 Sharp Deterioration</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Only {m25.pctAbove3M.toFixed(0)}% of 2025 IPOs trade above offer at 3M vs {m24.pctAbove3M.toFixed(0)}% for 2024 — 
              a dramatic decline that directly impacts retail confidence and future participation willingness.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">📉 Negative Feedback Loop</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Poor aftermarket performance in 2025 creates a self-reinforcing cycle — retail investors who lost money 
              are less likely to participate in future IPOs, further reducing subscription rates.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">⚖️ TASI Underperformance</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              2025 IPOs underperform TASI by {Math.abs(m25.avgAbnormal3M).toFixed(0)}% on average at 3M, suggesting 
              the issue is IPO-specific rather than broad market weakness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AftermarketTab;
