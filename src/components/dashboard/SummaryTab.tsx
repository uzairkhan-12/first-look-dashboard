import { ipoData, ipoPerformance, summaryStats } from "@/data/ipoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, RadialBarChart, RadialBar, ReferenceLine } from "recharts";

const chartData = [
{ horizon: "3M", "2024": summaryStats.find((s) => s.horizon === "3M" && s.listingYear === 2024)!.medianAbnormalReturn, "2025": summaryStats.find((s) => s.horizon === "3M" && s.listingYear === 2025)!.medianAbnormalReturn },
{ horizon: "6M", "2024": summaryStats.find((s) => s.horizon === "6M" && s.listingYear === 2024)!.medianAbnormalReturn, "2025": summaryStats.find((s) => s.horizon === "6M" && s.listingYear === 2025)!.medianAbnormalReturn },
{ horizon: "9M", "2024": summaryStats.find((s) => s.horizon === "9M" && s.listingYear === 2024)!.medianAbnormalReturn, "2025": summaryStats.find((s) => s.horizon === "9M" && s.listingYear === 2025)!.medianAbnormalReturn }];


const underperformData = [
{ horizon: "3M", "2024": summaryStats.find((s) => s.horizon === "3M" && s.listingYear === 2024)!.underperformRate, "2025": summaryStats.find((s) => s.horizon === "3M" && s.listingYear === 2025)!.underperformRate },
{ horizon: "6M", "2024": summaryStats.find((s) => s.horizon === "6M" && s.listingYear === 2024)!.underperformRate, "2025": summaryStats.find((s) => s.horizon === "6M" && s.listingYear === 2025)!.underperformRate },
{ horizon: "9M", "2024": summaryStats.find((s) => s.horizon === "9M" && s.listingYear === 2024)!.underperformRate, "2025": summaryStats.find((s) => s.horizon === "9M" && s.listingYear === 2025)!.underperformRate }];


const TOOLTIP_STYLE = { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" };
const PIE_COLORS = ["hsl(142, 70%, 45%)", "hsl(0, 72%, 51%)", "hsl(35, 90%, 55%)", "hsl(210, 80%, 55%)", "hsl(270, 60%, 55%)"];

// Year-level aggregations
const getYearMetrics = (year: number) => {
  const ipos = ipoData.filter((d) => d.year === year);
  const perfs = ipoPerformance.filter((d) => d.year === year);
  const totalSize = ipos.reduce((s, d) => s + d.totalOfferSize, 0);
  const avgOfferPrice = ipos.reduce((s, d) => s + d.offerPrice, 0) / ipos.length;
  const avgRetailCov = ipos.reduce((s, d) => s + d.retailCoverageMultiple, 0) / ipos.length;
  const iposExFlyNas = ipos.filter((d) => d.ticker !== "4264");
  const avgRetailCovExFlyNas = iposExFlyNas.length ? iposExFlyNas.reduce((s, d) => s + d.retailCoverageMultiple, 0) / iposExFlyNas.length : avgRetailCov;
  const avgInstCov = ipos.reduce((s, d) => s + d.institutionalCoverageMultiple, 0) / ipos.length;
  const medianOfferSize = [...ipos].sort((a, b) => a.totalOfferSize - b.totalOfferSize)[Math.floor(ipos.length / 2)].totalOfferSize;
  const perfs3M = perfs.filter((d) => d.return3M !== null);
  const avgReturn3M = perfs3M.length ? perfs3M.reduce((s, d) => s + d.return3M!, 0) / perfs3M.length : 0;
  const positiveReturns3M = perfs3M.filter((d) => d.return3M! > 0).length;
  const bestPerformer = perfs3M.length ? perfs3M.reduce((best, d) => d.return3M! > (best.return3M ?? -Infinity) ? d : best, perfs3M[0]) : null;
  const worstPerformer = perfs3M.length ? perfs3M.reduce((worst, d) => d.return3M! < (worst.return3M ?? Infinity) ? d : worst, perfs3M[0]) : null;

  // Sector distribution
  const sectors = ipos.reduce((acc, d) => {
    const s = d.sector.length > 18 ? d.sector.substring(0, 16) + "…" : d.sector;
    const ex = acc.find((x) => x.sector === s);
    if (ex) ex.count++;else
    acc.push({ sector: s, count: 1 });
    return acc;
  }, [] as {sector: string;count: number;}[]).sort((a, b) => b.count - a.count);

  // Size bucket distribution
  const buckets = ipos.reduce((acc, d) => {
    const ex = acc.find((x) => x.bucket === d.ipoSizeBucket);
    if (ex) ex.count++;else
    acc.push({ bucket: d.ipoSizeBucket, count: 1 });
    return acc;
  }, [] as {bucket: string;count: number;}[]);

  return {
    count: ipos.length,
    totalSize,
    avgOfferPrice,
    avgRetailCov,
    avgRetailCovExFlyNas,
    avgInstCov,
    medianOfferSize,
    avgReturn3M,
    positiveReturns3M,
    bestPerformer,
    worstPerformer,
    sectors,
    buckets
  };
};

const m24 = getYearMetrics(2024);
const m25 = getYearMetrics(2025);

// Comparison bar data
const comparisonData = [
{ metric: "Total Size (Bn)", "2024": +(m24.totalSize / 1000).toFixed(1), "2025": +(m25.totalSize / 1000).toFixed(1) },
{ metric: "Avg Price (SAR)", "2024": +m24.avgOfferPrice.toFixed(0), "2025": +m25.avgOfferPrice.toFixed(0) },
{ metric: "Med. Size (Mn)", "2024": +m24.medianOfferSize.toFixed(0), "2025": +m25.medianOfferSize.toFixed(0) }];


const coverageComparison = [
{ metric: "Retail Cov.", "2024": +m24.avgRetailCov.toFixed(1), "2025": +m25.avgRetailCov.toFixed(1) },
{ metric: "Inst. Cov.", "2024": +m24.avgInstCov.toFixed(1), "2025": +m25.avgInstCov.toFixed(1) }];


// Individual IPO return comparison chart
const returnComparisonData = ipoPerformance.
filter((d) => d.return3M !== null).
map((d) => ({
  name: d.name.length > 10 ? d.name.substring(0, 8) + "…" : d.name,
  return3M: d.return3M!,
  year: d.year
})).
sort((a, b) => b.return3M - a.return3M);

const MetricRow = ({ label, val2024, val2025, suffix = "", better }: {label: string;val2024: string;val2025: string;suffix?: string;better?: "2024" | "2025" | null;}) =>
<div className="flex items-center justify-between py-2.5 border-b border-border/50">
    <span className="text-xs text-muted-foreground">{label}</span>
    <div className="flex gap-6">
      <span className={`font-mono text-sm ${better === "2024" ? "text-up font-bold" : "text-foreground"}`}>{val2024}{suffix}</span>
      <span className={`font-mono text-sm ${better === "2025" ? "text-up font-bold" : "text-foreground"}`}>{val2025}{suffix}</span>
    </div>
  </div>;


const SummaryTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Year Cohort Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[2024, 2025].map((year) => {
          const stats = summaryStats.filter((s) => s.listingYear === year);
          const s3M = stats.find((s) => s.horizon === "3M")!;
          return (
            <div key={year} className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4">{year} IPO Cohort</h3>
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) =>
                <div key={s.horizon} className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{s.horizon}</p>
                    <p className={`text-xl font-mono font-bold ${s.medianAbnormalReturn >= 0 ? "text-up" : "text-down"}`}>
                      {s.medianAbnormalReturn > 0 ? "+" : ""}{s.medianAbnormalReturn}%
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">Median Abnormal</p>
                    <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                      className={`h-full rounded-full ${s.underperformRate > 50 ? "bg-destructive" : "bg-primary"}`}
                      style={{ width: `${s.underperformRate}%` }} />

                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{s.underperformRate}% underperform</p>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-border flex justify-between text-xs text-muted-foreground">
                <span>Total IPOs: {s3M.ipoCountTotal}</span>
                <span>With Data (3M): {s3M.ipoCountWithData}</span>
              </div>
            </div>);

        })}
      </div>

      {/* Head-to-Head Comparison */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-1">Head-to-Head: 2024 vs 2025</h3>
        <p className="text-xs text-muted-foreground mb-4">Key IPO market metrics side by side</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Metric</span>
              <div className="flex gap-6">
                <span className="text-[10px] uppercase tracking-wider text-chart-line">2024</span>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: "hsl(270, 60%, 55%)" }}>2025</span>
              </div>
            </div>
            <MetricRow label="IPO Count" val2024={`${m24.count}`} val2025={`${m25.count}`} />
            <MetricRow label="Total Offer Size" val2024={`${(m24.totalSize / 1000).toFixed(1)}B`} val2025={`${(m25.totalSize / 1000).toFixed(1)}B`} better={m24.totalSize > m25.totalSize ? "2024" : "2025"} />
            <MetricRow label="Median Offer Size" val2024={`${m24.medianOfferSize.toFixed(0)}M`} val2025={`${m25.medianOfferSize.toFixed(0)}M`} />
            <MetricRow label="Avg Offer Price" val2024={`${m24.avgOfferPrice.toFixed(0)}`} val2025={`${m25.avgOfferPrice.toFixed(0)}`} suffix=" SAR" />
            <MetricRow label="Avg 3M Return" val2024={`${m24.avgReturn3M >= 0 ? "+" : ""}${m24.avgReturn3M.toFixed(1)}%`} val2025={`${m25.avgReturn3M >= 0 ? "+" : ""}${m25.avgReturn3M.toFixed(1)}%`} better={m24.avgReturn3M > m25.avgReturn3M ? "2024" : "2025"} />
            <MetricRow label="Positive 3M Returns" val2024={`${m24.positiveReturns3M}/${m24.count}`} val2025={`${m25.positiveReturns3M}/${m25.count}`} better={m24.positiveReturns3M / m24.count > m25.positiveReturns3M / m25.count ? "2024" : "2025"} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Coverage</span>
              <div className="flex gap-6">
                <span className="text-[10px] uppercase tracking-wider text-chart-line">2024</span>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: "hsl(270, 60%, 55%)" }}>2025</span>
              </div>
            </div>
            <MetricRow label="Avg Retail Coverage*" val2024={`${m24.avgRetailCovExFlyNas.toFixed(1)}x`} val2025={`${m25.avgRetailCovExFlyNas.toFixed(1)}x`} better={m24.avgRetailCovExFlyNas > m25.avgRetailCovExFlyNas ? "2024" : "2025"} />
            <MetricRow label="Avg Inst. Coverage" val2024={`${m24.avgInstCov.toFixed(1)}x`} val2025={`${m25.avgInstCov.toFixed(1)}x`} better={m24.avgInstCov > m25.avgInstCov ? "2024" : "2025"} />
            {m24.bestPerformer && <MetricRow label="Best Performer (3M)" val2024={`${m24.bestPerformer.name.substring(0, 12)} +${m24.bestPerformer.return3M}%`} val2025={m25.bestPerformer ? `${m25.bestPerformer.name.substring(0, 12)} ${m25.bestPerformer.return3M! > 0 ? "+" : ""}${m25.bestPerformer.return3M}%` : "—"} />}
            {m24.worstPerformer && <MetricRow label="Worst Performer (3M)" val2024={`${m24.worstPerformer.name.substring(0, 12)} ${m24.worstPerformer.return3M}%`} val2025={m25.worstPerformer ? `${m25.worstPerformer.name.substring(0, 12)} ${m25.worstPerformer.return3M}%` : "—"} />}
            <div className="mt-4 p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-accent font-semibold">Key Insight:</span> 2024 IPOs significantly outperformed 2025 across all horizons. 
                The 2024 cohort had a {m24.positiveReturns3M}/{m24.count} positive 3M return rate vs {m25.positiveReturns3M}/{m25.count} for 2025, 
                suggesting a notable shift in market conditions and investor sentiment.
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 italic">* Excludes FlyNas (349.7x retail coverage) as an outlier</p>
          </div>
        </div>
      </div>

      {/* Charts Row 1: Abnormal Returns + Underperformance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Median Abnormal Return: 2024 vs 2025</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="horizon" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <ReferenceLine y={0} stroke="hsl(220, 15%, 25%)" />
              <Legend wrapperStyle={{ color: "hsl(215, 12%, 50%)" }} />
              <Bar dataKey="2024" fill="hsl(210, 80%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill="hsl(270, 60%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Underperformance Rate: 2024 vs 2025</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={underperformData}>
              <XAxis dataKey="horizon" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <ReferenceLine y={50} stroke="hsl(35, 90%, 55%)" strokeDasharray="4 4" label={{ value: "50%", fill: "hsl(35, 90%, 55%)", fontSize: 10 }} />
              <Legend wrapperStyle={{ color: "hsl(215, 12%, 50%)" }} />
              <Bar dataKey="2024" fill="hsl(210, 80%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill="hsl(270, 60%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* All IPOs 3M Return Waterfall */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">All IPOs — 3M Return Ranked</h3>
        <p className="text-xs text-muted-foreground mb-4">Blue = 2024, Purple = 2025</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={returnComparisonData}>
            <XAxis dataKey="name" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 8 }} angle={-40} textAnchor="end" height={70} />
            <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, "3M Return"]} />
            <ReferenceLine y={0} stroke="hsl(220, 15%, 25%)" />
            <Bar dataKey="return3M" radius={[3, 3, 0, 0]}>
              {returnComparisonData.map((d, i) =>
              <Cell key={i} fill={d.year === 2024 ? "hsl(210, 80%, 55%)" : "hsl(270, 60%, 55%)"} opacity={0.85} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detail Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Horizon</th>
              <th className="text-center px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Year</th>
              <th className="text-center px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">IPOs</th>
              <th className="text-center px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">With Data</th>
              <th className="text-right px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Med. IPO Ret</th>
              <th className="text-right px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Med. TASI Ret</th>
              <th className="text-right px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Med. Abnormal</th>
              <th className="text-right px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Underperf %</th>
            </tr>
          </thead>
          <tbody>
            {summaryStats.map((s, i) =>
            <tr key={`${s.horizon}-${s.listingYear}`} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                <td className="px-4 py-2.5 font-mono font-medium text-foreground">{s.horizon}</td>
                <td className="px-3 py-2.5 font-mono text-center text-muted-foreground">{s.listingYear}</td>
                <td className="px-3 py-2.5 font-mono text-center text-foreground">{s.ipoCountTotal}</td>
                <td className="px-3 py-2.5 font-mono text-center text-foreground">{s.ipoCountWithData}</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.medianIPOReturn >= 0 ? "text-up" : "text-down"}`}>{s.medianIPOReturn > 0 ? "+" : ""}{s.medianIPOReturn}%</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.medianTASIReturn >= 0 ? "text-up" : "text-down"}`}>{s.medianTASIReturn > 0 ? "+" : ""}{s.medianTASIReturn}%</td>
                <td className={`px-3 py-2.5 font-mono text-right font-bold ${s.medianAbnormalReturn >= 0 ? "text-up" : "text-down"}`}>{s.medianAbnormalReturn > 0 ? "+" : ""}{s.medianAbnormalReturn}%</td>
                <td className={`px-3 py-2.5 font-mono text-right ${s.underperformRate > 50 ? "text-down" : "text-up"}`}>{s.underperformRate}%</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

};

export default SummaryTab;