import { tasiData } from "@/data/tasiData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

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
            <XAxis dataKey="date" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10 }} interval={8} />
            <YAxis domain={["dataMin - 200", "dataMax + 200"]} tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} tickFormatter={(v) => v.toLocaleString()} />
            <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} formatter={(v: number) => [v.toLocaleString(), "Close"]} />
            <Area type="monotone" dataKey="close" stroke="hsl(210, 80%, 55%)" fill="url(#tasiGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Trading Volume (Last 20 Sessions, Mn shares)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={volumeData}>
            <XAxis dataKey="date" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10 }} />
            <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} formatter={(v: number) => [`${v.toFixed(0)}M`, "Volume"]} />
            <Bar dataKey="volume" fill="hsl(215, 12%, 50%)" radius={[3, 3, 0, 0]} opacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TASITab;
