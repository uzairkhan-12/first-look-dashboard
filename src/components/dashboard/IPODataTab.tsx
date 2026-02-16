import { ipoData, ipoPerformance } from "@/data/ipoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, ComposedChart, Line, ReferenceLine } from "recharts";

const sizeChartData = ipoData.reduce((acc, ipo) => {
  const existing = acc.find(d => d.bucket === ipo.ipoSizeBucket);
  if (existing) {
    existing.count += 1;
    existing.totalSize += ipo.totalOfferSize;
  } else {
    acc.push({ bucket: ipo.ipoSizeBucket, count: 1, totalSize: ipo.totalOfferSize });
  }
  return acc;
}, [] as { bucket: string; count: number; totalSize: number }[]);

const sectorData = ipoData.reduce((acc, ipo) => {
  const s = ipo.sector.length > 20 ? ipo.sector.substring(0, 18) + "…" : ipo.sector;
  const existing = acc.find(d => d.sector === s);
  if (existing) existing.count += 1;
  else acc.push({ sector: s, count: 1 });
  return acc;
}, [] as { sector: string; count: number }[]).sort((a, b) => b.count - a.count).slice(0, 8);

const COLORS = ["hsl(142, 70%, 45%)", "hsl(35, 90%, 55%)", "hsl(210, 80%, 55%)", "hsl(0, 72%, 51%)", "hsl(270, 60%, 55%)"];

const amountRaisedData = [...ipoData]
  .sort((a, b) => b.totalOfferSize - a.totalOfferSize)
  .map(ipo => ({
    name: ipo.name.length > 14 ? ipo.name.substring(0, 12) + "…" : ipo.name,
    amount: ipo.totalOfferSize,
    year: ipo.year,
  }));

const instDemandData = [...ipoData]
  .map(ipo => {
    const perf = ipoPerformance.find(p => p.ticker === ipo.ticker);
    return {
      name: ipo.name.length > 14 ? ipo.name.substring(0, 12) + "…" : ipo.name,
      demand: ipo.institutionalCoverageMultiple * ipo.totalOfferSize,
      coverage: ipo.institutionalCoverageMultiple,
      return3M: perf?.return3M ?? null,
      year: ipo.year,
    };
  })
  .sort((a, b) => b.demand - a.demand);

const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}B` : `${n.toFixed(0)}M`;

const IPODataTab = () => {
  const totalOfferSize = ipoData.reduce((sum, d) => sum + d.totalOfferSize, 0);
  const avgRetailCoverage = ipoData.reduce((sum, d) => sum + d.retailCoverageMultiple, 0) / ipoData.length;
  const avgInstCoverage = ipoData.reduce((sum, d) => sum + d.institutionalCoverageMultiple, 0) / ipoData.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total IPOs</p>
          <p className="text-2xl font-mono font-bold text-foreground">{ipoData.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Offer Size</p>
          <p className="text-2xl font-mono font-bold text-primary">{formatNum(totalOfferSize)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Avg Retail Coverage</p>
          <p className="text-2xl font-mono font-bold text-accent">{avgRetailCoverage.toFixed(1)}x</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Avg Inst. Coverage</p>
          <p className="text-2xl font-mono font-bold text-chart-line">{avgInstCoverage.toFixed(1)}x</p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">IPOs by Size Bucket</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sizeChartData}>
              <XAxis dataKey="bucket" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {sizeChartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">IPOs by Sector (Top 8)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sectorData} layout="vertical">
              <XAxis type="number" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} />
              <YAxis dataKey="sector" type="category" width={130} tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" }} />
              <Bar dataKey="count" fill="hsl(142, 55%, 35%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Amount Raised by IPO */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Total Amount Raised by IPO (SAR Mn)</h3>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={amountRaisedData} margin={{ bottom: 60 }}>
            <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 10 }} angle={-45} textAnchor="end" interval={0} />
            <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => formatNum(v)} />
            <Tooltip
              contentStyle={{ background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" }}
              formatter={(value: number) => [`${value.toLocaleString()} Mn`, "Offer Size"]}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {amountRaisedData.map((entry, i) => (
                <Cell key={i} fill={entry.year === 2025 ? "hsl(142, 70%, 45%)" : "hsl(210, 80%, 55%)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-2 justify-center text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(210, 80%, 55%)" }} /> 2024</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(142, 70%, 45%)" }} /> 2025</span>
        </div>
      </div>

      {/* Total Institutional Demand */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Total Institutional Demand by IPO (SAR Mn)</h3>
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={instDemandData} margin={{ bottom: 60, right: 10 }}>
            <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 10 }} angle={-45} textAnchor="end" interval={0} />
            <YAxis yAxisId="left" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => formatNum(v)} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "hsl(0, 72%, 51%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} label={{ value: "3M Return", angle: 90, position: "insideRight", style: { fill: "hsl(0, 72%, 51%)", fontSize: 11 }, dx: 15 }} />
            <ReferenceLine yAxisId="right" y={0} stroke="hsl(220, 10%, 70%)" strokeDasharray="3 3" />
            <Tooltip
              contentStyle={{ background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" }}
              formatter={(value: number, name: string) => {
                if (name === "return3M") return [`${value}%`, "3M Return"];
                return [`${value.toLocaleString()} Mn`, "Inst. Demand"];
              }}
            />
            <Bar yAxisId="left" dataKey="demand" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="coverage" position="top" formatter={(v: number) => `${v}x`} style={{ fill: "hsl(220, 10%, 45%)", fontSize: 9, fontWeight: 500 }} />
              {instDemandData.map((entry, i) => (
                <Cell key={i} fill={entry.year === 2025 ? "hsl(270, 60%, 55%)" : "hsl(210, 80%, 55%)"} />
              ))}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="return3M" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(0, 72%, 51%)" }} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-2 justify-center text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(210, 80%, 55%)" }} /> 2024</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(270, 60%, 55%)" }} /> 2025</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 rounded" style={{ background: "hsl(0, 72%, 51%)" }} /> 3M Return</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">IPO Name</th>
                <th className="text-left px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Year</th>
                <th className="text-left px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sector</th>
                <th className="text-right px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Price (SAR)</th>
                <th className="text-right px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Size (Mn)</th>
                <th className="text-right px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Retail Cov.</th>
                <th className="text-right px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Inst. Cov.</th>
                <th className="text-left px-3 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Bucket</th>
              </tr>
            </thead>
            <tbody>
              {ipoData.map((ipo, i) => (
                <tr key={ipo.ticker} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                  <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{ipo.name}</td>
                  <td className="px-3 py-2.5 font-mono text-muted-foreground">{ipo.year}</td>
                  <td className="px-3 py-2.5 text-muted-foreground text-xs">{ipo.sector}</td>
                  <td className="px-3 py-2.5 font-mono text-right text-foreground">{ipo.offerPrice}</td>
                  <td className="px-3 py-2.5 font-mono text-right text-foreground">{ipo.totalOfferSize.toLocaleString()}</td>
                  <td className="px-3 py-2.5 font-mono text-right text-accent">{ipo.retailCoverageMultiple}x</td>
                  <td className="px-3 py-2.5 font-mono text-right text-chart-line">{ipo.institutionalCoverageMultiple}x</td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground">{ipo.ipoSizeBucket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IPODataTab;
