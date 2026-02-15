import { ipoPerformance } from "@/data/ipoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";

const chartData = ipoPerformance
  .filter(d => d.abnormalReturn3M !== null)
  .map(d => ({
    name: d.name.length > 12 ? d.name.substring(0, 10) + "…" : d.name,
    abnormal3M: d.abnormalReturn3M!,
    return3M: d.return3M!,
  }));

const ReturnCell = ({ value }: { value: number | null }) => {
  if (value === null) return <span className="text-muted-foreground">—</span>;
  return (
    <span className={`font-mono ${value > 0 ? "text-up" : value < 0 ? "text-down" : "text-foreground"}`}>
      {value > 0 ? "+" : ""}{value}%
    </span>
  );
};

const BoolCell = ({ value }: { value: boolean | null }) => {
  if (value === null) return <span className="text-muted-foreground">—</span>;
  return value ? (
    <span className="inline-block w-2 h-2 rounded-full bg-destructive" />
  ) : (
    <span className="inline-block w-2 h-2 rounded-full bg-primary" />
  );
};

const PerformanceTab = () => {
  const avg3M = ipoPerformance.filter(d => d.return3M !== null).reduce((s, d) => s + d.return3M!, 0) / ipoPerformance.filter(d => d.return3M !== null).length;
  const posCount = ipoPerformance.filter(d => d.abnormalReturn3M !== null && d.abnormalReturn3M > 0).length;
  const totalWith3M = ipoPerformance.filter(d => d.abnormalReturn3M !== null).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Avg 3M Return</p>
          <p className={`text-2xl font-mono font-bold ${avg3M >= 0 ? "text-up" : "text-down"}`}>{avg3M >= 0 ? "+" : ""}{avg3M.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Outperformed TASI (3M)</p>
          <p className="text-2xl font-mono font-bold text-primary">{posCount}/{totalWith3M}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">2024 IPOs</p>
          <p className="text-2xl font-mono font-bold text-foreground">{ipoPerformance.filter(d => d.year === 2024).length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">2025 IPOs</p>
          <p className="text-2xl font-mono font-bold text-foreground">{ipoPerformance.filter(d => d.year === 2025).length}</p>
        </div>
      </div>

      {/* Abnormal Return Chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">3M Abnormal Return by IPO</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 9 }} angle={-35} textAnchor="end" height={60} />
            <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={{ background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" }} formatter={(v: number) => [`${v}%`, "Abnormal Return"]} />
            <ReferenceLine y={0} stroke="hsl(40, 15%, 80%)" />
            <Bar dataKey="abnormal3M" radius={[4, 4, 0, 0]}>
              {chartData.map((d, i) => (
                <Cell key={i} fill={d.abnormal3M >= 0 ? "hsl(142, 70%, 45%)" : "hsl(0, 72%, 51%)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-center px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Year</th>
                <th className="text-right px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">List Price</th>
                <th className="text-right px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">3M Ret</th>
                <th className="text-right px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">6M Ret</th>
                <th className="text-right px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">9M Ret</th>
                <th className="text-right px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">3M Abn</th>
                <th className="text-right px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">6M Abn</th>
                <th className="text-right px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">9M Abn</th>
                <th className="text-center px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Below 3M</th>
                <th className="text-center px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Below 6M</th>
                <th className="text-center px-2 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Below 9M</th>
              </tr>
            </thead>
            <tbody>
              {ipoPerformance.map((ipo, i) => (
                <tr key={ipo.ticker} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                  <td className="px-4 py-2 font-medium text-foreground whitespace-nowrap">{ipo.name}</td>
                  <td className="px-2 py-2 font-mono text-center text-muted-foreground">{ipo.year}</td>
                  <td className="px-2 py-2 font-mono text-right text-foreground">{ipo.priceAtListing}</td>
                  <td className="px-2 py-2 text-right"><ReturnCell value={ipo.return3M} /></td>
                  <td className="px-2 py-2 text-right"><ReturnCell value={ipo.return6M} /></td>
                  <td className="px-2 py-2 text-right"><ReturnCell value={ipo.return9M} /></td>
                  <td className="px-2 py-2 text-right"><ReturnCell value={ipo.abnormalReturn3M} /></td>
                  <td className="px-2 py-2 text-right"><ReturnCell value={ipo.abnormalReturn6M} /></td>
                  <td className="px-2 py-2 text-right"><ReturnCell value={ipo.abnormalReturn9M} /></td>
                  <td className="px-2 py-2 text-center"><BoolCell value={ipo.belowIssue3M} /></td>
                  <td className="px-2 py-2 text-center"><BoolCell value={ipo.belowIssue6M} /></td>
                  <td className="px-2 py-2 text-center"><BoolCell value={ipo.belowIssue9M} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
