import { summaryStats } from "@/data/ipoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { horizon: "3M", "2024": summaryStats.find(s => s.horizon === "3M" && s.listingYear === 2024)!.medianAbnormalReturn, "2025": summaryStats.find(s => s.horizon === "3M" && s.listingYear === 2025)!.medianAbnormalReturn },
  { horizon: "6M", "2024": summaryStats.find(s => s.horizon === "6M" && s.listingYear === 2024)!.medianAbnormalReturn, "2025": summaryStats.find(s => s.horizon === "6M" && s.listingYear === 2025)!.medianAbnormalReturn },
  { horizon: "9M", "2024": summaryStats.find(s => s.horizon === "9M" && s.listingYear === 2024)!.medianAbnormalReturn, "2025": summaryStats.find(s => s.horizon === "9M" && s.listingYear === 2025)!.medianAbnormalReturn },
];

const underperformData = [
  { horizon: "3M", "2024": summaryStats.find(s => s.horizon === "3M" && s.listingYear === 2024)!.underperformRate, "2025": summaryStats.find(s => s.horizon === "3M" && s.listingYear === 2025)!.underperformRate },
  { horizon: "6M", "2024": summaryStats.find(s => s.horizon === "6M" && s.listingYear === 2024)!.underperformRate, "2025": summaryStats.find(s => s.horizon === "6M" && s.listingYear === 2025)!.underperformRate },
  { horizon: "9M", "2024": summaryStats.find(s => s.horizon === "9M" && s.listingYear === 2024)!.underperformRate, "2025": summaryStats.find(s => s.horizon === "9M" && s.listingYear === 2025)!.underperformRate },
];

const SummaryTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[2024, 2025].map(year => {
          const stats = summaryStats.filter(s => s.listingYear === year);
          const s3M = stats.find(s => s.horizon === "3M")!;
          return (
            <div key={year} className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4">{year} IPO Cohort</h3>
              <div className="grid grid-cols-3 gap-3">
                {stats.map(s => (
                  <div key={s.horizon} className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{s.horizon}</p>
                    <p className={`text-xl font-mono font-bold ${s.medianAbnormalReturn >= 0 ? "text-up" : "text-down"}`}>
                      {s.medianAbnormalReturn > 0 ? "+" : ""}{s.medianAbnormalReturn}%
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">Median Abnormal</p>
                    <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.underperformRate > 50 ? "bg-destructive" : "bg-primary"}`}
                        style={{ width: `${s.underperformRate}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{s.underperformRate}% underperform</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border flex justify-between text-xs text-muted-foreground">
                <span>Total IPOs: {s3M.ipoCountTotal}</span>
                <span>With Data (3M): {s3M.ipoCountWithData}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Median Abnormal Return: 2024 vs 2025</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="horizon" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ color: "hsl(215, 12%, 50%)" }} />
              <Bar dataKey="2024" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Underperformance Rate: 2024 vs 2025</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={underperformData}>
              <XAxis dataKey="horizon" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ color: "hsl(215, 12%, 50%)" }} />
              <Bar dataKey="2024" fill="hsl(35, 90%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill="hsl(210, 80%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
            {summaryStats.map((s, i) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryTab;
