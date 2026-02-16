import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, CartesianGrid, Area, AreaChart, Cell } from "recharts";

const TOOLTIP_STYLE = { background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" };
const BLUE = "hsl(210, 80%, 55%)";
const PURPLE = "hsl(270, 60%, 55%)";
const GREEN = "hsl(142, 70%, 45%)";
const AMBER = "hsl(35, 90%, 55%)";

// Illustrative engagement data
const micrositeTraffic = [
  { month: "Jan 24", sessions: 12500, avgTime: 3.2, bounceRate: 45 },
  { month: "Mar 24", sessions: 28000, avgTime: 4.1, bounceRate: 38 },
  { month: "Jun 24", sessions: 45000, avgTime: 4.5, bounceRate: 32 },
  { month: "Sep 24", sessions: 22000, avgTime: 3.8, bounceRate: 42 },
  { month: "Dec 24", sessions: 35000, avgTime: 3.5, bounceRate: 40 },
  { month: "Jan 25", sessions: 18000, avgTime: 3.0, bounceRate: 48 },
  { month: "Mar 25", sessions: 42000, avgTime: 3.8, bounceRate: 36 },
  { month: "Jun 25", sessions: 55000, avgTime: 4.2, bounceRate: 30 },
  { month: "Sep 25", sessions: 15000, avgTime: 2.8, bounceRate: 52 },
  { month: "Dec 25", sessions: 12000, avgTime: 2.5, bounceRate: 55 },
  { month: "Jan 26", sessions: 10000, avgTime: 2.3, bounceRate: 58 },
];

const documentDownloads = [
  { type: "Prospectus", "2024": 8500, "2025": 4200 },
  { type: "Factsheet", "2024": 12000, "2025": 5800 },
  { type: "Press Release", "2024": 6200, "2025": 3100 },
  { type: "Investor Pres.", "2024": 4800, "2025": 2400 },
  { type: "FAQ", "2024": 3200, "2025": 1800 },
];

const channelMix = [
  { channel: "Direct", "2024": 35, "2025": 28 },
  { channel: "Organic Search", "2024": 30, "2025": 22 },
  { channel: "Social Media", "2024": 20, "2025": 32 },
  { channel: "Email", "2024": 10, "2025": 12 },
  { channel: "Referral", "2024": 5, "2025": 6 },
];

const ipoMicrositeData = [
  { ipo: "FlyNas", sessions: 55000, downloads: 12500, conversion: 22.7, year: 2025 },
  { ipo: "Masar", sessions: 42000, downloads: 9800, conversion: 23.3, year: 2025 },
  { ipo: "Derayah", sessions: 38000, downloads: 8200, conversion: 21.6, year: 2025 },
  { ipo: "Fakeeh", sessions: 48000, downloads: 11200, conversion: 23.3, year: 2024 },
  { ipo: "MBC", sessions: 35000, downloads: 9500, conversion: 27.1, year: 2024 },
  { ipo: "Avalon", sessions: 32000, downloads: 8900, conversion: 27.8, year: 2024 },
  { ipo: "Rasan", sessions: 28000, downloads: 7200, conversion: 25.7, year: 2024 },
  { ipo: "UCIC", sessions: 18000, downloads: 3800, conversion: 21.1, year: 2025 },
  { ipo: "SMC", sessions: 14000, downloads: 2800, conversion: 20.0, year: 2025 },
  { ipo: "CGS", sessions: 8000, downloads: 1500, conversion: 18.8, year: 2025 },
];

const MetricCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-mono font-bold ${color || "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const EngagementTab = () => {
  const latest = micrositeTraffic[micrositeTraffic.length - 1];
  const peak = micrositeTraffic.reduce((max, d) => d.sessions > max.sessions ? d : max, micrositeTraffic[0]);
  const totalDownloads24 = documentDownloads.reduce((s, d) => s + d["2024"], 0);
  const totalDownloads25 = documentDownloads.reduce((s, d) => s + d["2025"], 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Section Header */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Engagement Indicators</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Digital engagement metrics — microsite traffic, document downloads, and channel performance for IPO communications.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-medium border border-amber-200">
            ⚠ Illustrative Data
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 italic">
          Note: Production version would pull from Google Analytics / microsite CMS for Brunswick-managed IPO campaigns. 
          Document download tracking applies only to our clients' IPOs.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Current Monthly Sessions" value={`${(latest.sessions / 1000).toFixed(0)}K`} color="text-foreground" sub={`Peak: ${(peak.sessions / 1000).toFixed(0)}K (${peak.month})`} />
        <MetricCard label="Avg Session Duration" value={`${latest.avgTime}min`} color={latest.avgTime >= 3 ? "text-up" : "text-down"} sub="Target: 3+ min" />
        <MetricCard label="2024 Total Downloads" value={`${(totalDownloads24 / 1000).toFixed(1)}K`} color="text-chart-line" />
        <MetricCard label="2025 Total Downloads" value={`${(totalDownloads25 / 1000).toFixed(1)}K`} color="text-down" sub={`${((totalDownloads25 / totalDownloads24 - 1) * 100).toFixed(0)}% YoY`} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Microsite Traffic Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={micrositeTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 9 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v.toLocaleString()}`, "Sessions"]} />
              <Area type="monotone" dataKey="sessions" fill={BLUE} fillOpacity={0.15} stroke={BLUE} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Document Downloads by Type</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={documentDownloads} layout="vertical">
              <XAxis type="number" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <YAxis dataKey="type" type="category" width={95} tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 10 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [v.toLocaleString()]} />
              <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
              <Bar dataKey="2024" fill={BLUE} radius={[0, 4, 4, 0]} barSize={10} />
              <Bar dataKey="2025" fill={PURPLE} radius={[0, 4, 4, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Traffic Channel Mix (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={channelMix}>
              <XAxis dataKey="channel" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 9 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
              <Bar dataKey="2024" fill={BLUE} radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill={PURPLE} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">IPO Microsite Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-3 py-2 text-[10px] font-medium uppercase text-muted-foreground">IPO</th>
                  <th className="text-right px-3 py-2 text-[10px] font-medium uppercase text-muted-foreground">Sessions</th>
                  <th className="text-right px-3 py-2 text-[10px] font-medium uppercase text-muted-foreground">Downloads</th>
                  <th className="text-right px-3 py-2 text-[10px] font-medium uppercase text-muted-foreground">Conv %</th>
                </tr>
              </thead>
              <tbody>
                {ipoMicrositeData.map((d, i) => (
                  <tr key={d.ipo} className={`border-b border-border/50 hover:bg-muted/30 ${i % 2 ? "bg-muted/10" : ""}`}>
                    <td className="px-3 py-1.5 font-medium text-foreground text-xs">
                      <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: d.year === 2024 ? BLUE : PURPLE }} />
                      {d.ipo}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-right text-xs text-foreground">{(d.sessions / 1000).toFixed(0)}K</td>
                    <td className="px-3 py-1.5 font-mono text-right text-xs text-foreground">{(d.downloads / 1000).toFixed(1)}K</td>
                    <td className={`px-3 py-1.5 font-mono text-right text-xs ${d.conversion >= 25 ? "text-up" : d.conversion < 20 ? "text-down" : "text-foreground"}`}>{d.conversion}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Key Observations */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Key Observations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">📉 Traffic Decline</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Microsite traffic has dropped {((1 - latest.sessions / peak.sessions) * 100).toFixed(0)}% from peak, 
              with higher bounce rates suggesting diminishing retail interest in IPO research materials.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">📄 Download Gap</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Document downloads fell {Math.abs(((totalDownloads25 / totalDownloads24 - 1) * 100)).toFixed(0)}% YoY. 
              Factsheets remain most popular — suggests investors want quick summaries over detailed prospectus review.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">📱 Channel Shift</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Social media share of traffic grew from 20% to 32%, while direct traffic declined. 
              This suggests comms strategies should prioritize social distribution over traditional microsite-centric approaches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementTab;
