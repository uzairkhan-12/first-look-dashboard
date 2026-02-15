import { tasiData } from "@/data/tasiData";
import { ipoPerformance } from "@/data/ipoData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine, ScatterChart, Scatter, CartesianGrid, Legend } from "recharts";

const latest = tasiData[tasiData.length - 1];
const prev = tasiData[tasiData.length - 2];
const change = latest.close - prev.close;
const changePct = (change / prev.close) * 100;
const yearHigh = Math.max(...tasiData.map(d => d.high));
const yearLow = Math.min(...tasiData.map(d => d.low));

const volumeData = tasiData.slice(-20).map(d => ({
  date: d.date,
  volume: d.volume / 1e6,
}));

const TOOLTIP_STYLE = { background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" };

// IPO Return vs TASI Return scatter data (3M)
const scatterData = ipoPerformance
  .filter(d => d.return3M !== null && d.tasiReturn3M !== null)
  .map(d => ({
    name: d.name,
    year: d.year,
    ipoReturn: d.return3M!,
    tasiReturn: d.tasiReturn3M!,
    abnormal: d.abnormalReturn3M!,
  }));

// Abnormal return by IPO
const abnormalData = ipoPerformance
  .filter(d => d.abnormalReturn3M !== null)
  .map(d => ({
    name: d.name.length > 10 ? d.name.substring(0, 8) + "…" : d.name,
    fullName: d.name,
    abnormal3M: d.abnormalReturn3M!,
    year: d.year,
  }))
  .sort((a, b) => b.abnormal3M - a.abnormal3M);

// IPO vs TASI paired bars
const pairedReturnData = ipoPerformance
  .filter(d => d.return3M !== null)
  .map(d => ({
    name: d.name.length > 10 ? d.name.substring(0, 8) + "…" : d.name,
    fullName: d.name,
    ipoReturn: d.return3M!,
    tasiReturn: d.tasiReturn3M!,
    year: d.year,
  }))
  .sort((a, b) => b.ipoReturn - a.ipoReturn);

// Aggregate stats
const perfs2024 = ipoPerformance.filter(d => d.year === 2024 && d.return3M !== null);
const perfs2025 = ipoPerformance.filter(d => d.year === 2025 && d.return3M !== null);
const avg3M_2024 = perfs2024.reduce((s, d) => s + d.return3M!, 0) / perfs2024.length;
const avg3M_2025 = perfs2025.reduce((s, d) => s + d.return3M!, 0) / perfs2025.length;
const avgTasi3M_2024 = perfs2024.reduce((s, d) => s + d.tasiReturn3M!, 0) / perfs2024.length;
const avgTasi3M_2025 = perfs2025.reduce((s, d) => s + d.tasiReturn3M!, 0) / perfs2025.length;
const beatRate2024 = perfs2024.filter(d => d.abnormalReturn3M! > 0).length;
const beatRate2025 = perfs2025.filter(d => d.abnormalReturn3M! > 0).length;

// TASI at listing dates
const tasiAtListings = ipoPerformance.map(d => {
  const tasiMatch = tasiData.reduce((closest, t) => {
    const diff = Math.abs(new Date(t.date).getTime() - new Date(d.listingDate).getTime());
    const closestDiff = Math.abs(new Date(closest.date).getTime() - new Date(d.listingDate).getTime());
    return diff < closestDiff ? t : closest;
  }, tasiData[0]);
  return { name: d.name, year: d.year, tasiLevel: tasiMatch.close, return3M: d.return3M };
}).filter(d => d.return3M !== null);

const TASITab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">TASI Close</p>
          <p className="text-2xl font-mono font-bold text-foreground">{latest.close.toLocaleString()}</p>
          <p className={`text-xs font-mono mt-1 ${change >= 0 ? "text-up" : "text-down"}`}>
            {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)} ({changePct >= 0 ? "+" : ""}{changePct.toFixed(2)}%)
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Period High</p>
          <p className="text-2xl font-mono font-bold text-up">{yearHigh.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Period Low</p>
          <p className="text-2xl font-mono font-bold text-down">{yearLow.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Last Volume</p>
          <p className="text-2xl font-mono font-bold text-chart-line">{(latest.volume / 1e6).toFixed(0)}M</p>
        </div>
      </div>

      {/* Price Chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">TASI Index — Close Price</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={tasiData}>
            <defs>
              <linearGradient id="tasiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(210, 80%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(210, 80%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 10 }} interval={8} />
            <YAxis domain={["dataMin - 200", "dataMax + 200"]} tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => v.toLocaleString()} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [v.toLocaleString(), "Close"]} />
            <Area type="monotone" dataKey="close" stroke="hsl(210, 80%, 55%)" fill="url(#tasiGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Trading Volume (Last 20 Sessions, Mn shares)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={volumeData}>
            <XAxis dataKey="date" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 10 }} />
            <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v.toFixed(0)}M`, "Volume"]} />
            <Bar dataKey="volume" fill="hsl(220, 10%, 45%)" radius={[3, 3, 0, 0]} opacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* IPO vs TASI Performance Section */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="text-lg font-semibold text-foreground mb-1">IPO vs TASI — Performance Analysis</h3>
        <p className="text-xs text-muted-foreground mb-4">How IPOs performed relative to the broader market over the same periods</p>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-md bg-muted/30 border border-border/50 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Avg IPO 3M Return</p>
            <p className="text-xs text-muted-foreground">2024</p>
            <p className={`text-lg font-mono font-bold ${avg3M_2024 >= 0 ? "text-up" : "text-down"}`}>{avg3M_2024 >= 0 ? "+" : ""}{avg3M_2024.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-1">2025</p>
            <p className={`text-lg font-mono font-bold ${avg3M_2025 >= 0 ? "text-up" : "text-down"}`}>{avg3M_2025 >= 0 ? "+" : ""}{avg3M_2025.toFixed(1)}%</p>
          </div>
          <div className="rounded-md bg-muted/30 border border-border/50 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Avg TASI 3M Return</p>
            <p className="text-xs text-muted-foreground">2024</p>
            <p className={`text-lg font-mono font-bold ${avgTasi3M_2024 >= 0 ? "text-up" : "text-down"}`}>{avgTasi3M_2024 >= 0 ? "+" : ""}{avgTasi3M_2024.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-1">2025</p>
            <p className={`text-lg font-mono font-bold ${avgTasi3M_2025 >= 0 ? "text-up" : "text-down"}`}>{avgTasi3M_2025 >= 0 ? "+" : ""}{avgTasi3M_2025.toFixed(1)}%</p>
          </div>
          <div className="rounded-md bg-muted/30 border border-border/50 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Beat TASI (3M)</p>
            <p className="text-xs text-muted-foreground">2024</p>
            <p className="text-lg font-mono font-bold text-foreground">{beatRate2024}/{perfs2024.length}</p>
            <p className="text-xs text-muted-foreground mt-1">2025</p>
            <p className="text-lg font-mono font-bold text-foreground">{beatRate2025}/{perfs2025.length}</p>
          </div>
          <div className="rounded-md bg-muted/30 border border-border/50 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Beat Rate</p>
            <p className="text-xs text-muted-foreground">2024</p>
            <p className={`text-lg font-mono font-bold ${beatRate2024 / perfs2024.length > 0.5 ? "text-up" : "text-down"}`}>{((beatRate2024 / perfs2024.length) * 100).toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground mt-1">2025</p>
            <p className={`text-lg font-mono font-bold ${beatRate2025 / perfs2025.length > 0.5 ? "text-up" : "text-down"}`}>{((beatRate2025 / perfs2025.length) * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Paired IPO vs TASI Return */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">IPO 3M Return vs TASI 3M Return (Same Period)</h3>
        <p className="text-xs text-muted-foreground mb-4">Blue = IPO Return, Purple = TASI Return over the same 3-month window</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={pairedReturnData}>
            <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 8 }} angle={-40} textAnchor="end" height={70} />
            <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, name: string) => [`${v}%`, name === "ipoReturn" ? "IPO Return" : "TASI Return"]} />
            <ReferenceLine y={0} stroke="hsl(40, 15%, 80%)" />
            <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} formatter={(value) => value === "ipoReturn" ? "IPO Return" : "TASI Return"} />
            <Bar dataKey="ipoReturn" fill="hsl(210, 80%, 55%)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="tasiReturn" fill="hsl(270, 60%, 55%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Abnormal Return (Alpha) */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">3M Abnormal Return (IPO Alpha vs TASI)</h3>
        <p className="text-xs text-muted-foreground mb-4">Positive = outperformed TASI, Negative = underperformed</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={abnormalData}>
            <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 8 }} angle={-40} textAnchor="end" height={70} />
            <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, "Abnormal Return"]} />
            <ReferenceLine y={0} stroke="hsl(40, 15%, 80%)" />
            <Bar dataKey="abnormal3M" radius={[3, 3, 0, 0]}>
              {abnormalData.map((d, i) => (
                <Cell key={i} fill={d.abnormal3M >= 0 ? "hsl(142, 70%, 45%)" : "hsl(0, 72%, 51%)"} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Scatter: IPO Return vs TASI Return */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">IPO Return vs TASI Return — Scatter (3M)</h3>
        <p className="text-xs text-muted-foreground mb-4">Points above the diagonal outperformed TASI. Blue = 2024, Purple = 2025</p>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart>
            <CartesianGrid stroke="hsl(40, 15%, 88%)" strokeDasharray="3 3" />
            <XAxis type="number" dataKey="tasiReturn" name="TASI Return" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} label={{ value: "TASI 3M Return %", position: "insideBottom", offset: -5, fill: "hsl(220, 10%, 45%)", fontSize: 11 }} />
            <YAxis type="number" dataKey="ipoReturn" name="IPO Return" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} label={{ value: "IPO 3M Return %", angle: -90, position: "insideLeft", fill: "hsl(220, 10%, 45%)", fontSize: 11 }} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, name: string) => [`${v}%`, name]} labelFormatter={() => ""} />
            <ReferenceLine segment={[{ x: -50, y: -50 }, { x: 50, y: 50 }]} stroke="hsl(35, 85%, 50%)" strokeDasharray="5 5" ifOverflow="extendDomain" />
            <Scatter name="2024 IPOs" data={scatterData.filter(d => d.year === 2024)} fill="hsl(210, 80%, 45%)" />
            <Scatter name="2025 IPOs" data={scatterData.filter(d => d.year === 2025)} fill="hsl(270, 60%, 55%)" />
            <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Insight */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-accent font-semibold">Key Insight:</span> In 2024, {beatRate2024} out of {perfs2024.length} IPOs outperformed TASI over 3 months, 
          with an average alpha of {(avg3M_2024 - avgTasi3M_2024) >= 0 ? "+" : ""}{(avg3M_2024 - avgTasi3M_2024).toFixed(1)}pp. 
          In contrast, only {beatRate2025} out of {perfs2025.length} IPOs in 2025 beat TASI, 
          with an average alpha of {(avg3M_2025 - avgTasi3M_2025) >= 0 ? "+" : ""}{(avg3M_2025 - avgTasi3M_2025).toFixed(1)}pp — 
          reflecting weaker IPO pricing and deteriorating market conditions.
        </p>
      </div>
    </div>
  );
};

export default TASITab;
