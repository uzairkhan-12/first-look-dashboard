import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, CartesianGrid, Area, AreaChart, ReferenceLine, PieChart, Pie, Cell } from "recharts";

const TOOLTIP_STYLE = { background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" };
const BLUE = "hsl(210, 80%, 55%)";
const PURPLE = "hsl(270, 60%, 55%)";
const GREEN = "hsl(142, 70%, 45%)";
const RED = "hsl(0, 72%, 51%)";
const AMBER = "hsl(35, 90%, 55%)";

// Illustrative sentiment data — would be replaced with real API/scraping data
const monthlySentiment = [
  { month: "Jan 24", positive: 62, negative: 18, neutral: 20, volume: 3200 },
  { month: "Mar 24", positive: 68, negative: 12, neutral: 20, volume: 4800 },
  { month: "Jun 24", positive: 71, negative: 14, neutral: 15, volume: 5200 },
  { month: "Sep 24", positive: 58, negative: 22, neutral: 20, volume: 3900 },
  { month: "Dec 24", positive: 55, negative: 25, neutral: 20, volume: 4100 },
  { month: "Jan 25", positive: 48, negative: 30, neutral: 22, volume: 3600 },
  { month: "Mar 25", positive: 42, negative: 35, neutral: 23, volume: 5100 },
  { month: "Jun 25", positive: 35, negative: 42, neutral: 23, volume: 6200 },
  { month: "Sep 25", positive: 30, negative: 48, neutral: 22, volume: 4800 },
  { month: "Dec 25", positive: 28, negative: 52, neutral: 20, volume: 3900 },
  { month: "Jan 26", positive: 32, negative: 45, neutral: 23, volume: 4200 },
];

const themeData = [
  { theme: "Overvaluation", "2024": 15, "2025": 42 },
  { theme: "Poor Returns", "2024": 8, "2025": 38 },
  { theme: "Dividend Yield", "2024": 22, "2025": 12 },
  { theme: "Growth Story", "2024": 35, "2025": 18 },
  { theme: "Distrust / Rigged", "2024": 10, "2025": 28 },
  { theme: "FOMO / Hype", "2024": 30, "2025": 8 },
];

const platformData = [
  { name: "X (Twitter)", value: 45 },
  { name: "Argaam Forums", value: 28 },
  { name: "Twtbuyer", value: 12 },
  { name: "Reddit/Other", value: 8 },
  { name: "YouTube", value: 7 },
];

const PIE_COLORS = [BLUE, PURPLE, GREEN, AMBER, RED];

const influencerSentiment = [
  { name: "Top Finance Accounts", positive2024: 72, positive2025: 35, followers: "500K+" },
  { name: "Market Analysts", positive2024: 65, positive2025: 28, followers: "100-500K" },
  { name: "Retail Traders", positive2024: 58, positive2025: 22, followers: "10-100K" },
  { name: "Media Outlets", positive2024: 70, positive2025: 40, followers: "N/A" },
];

const MetricCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-mono font-bold ${color || "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const SentimentTab = () => {
  const latest = monthlySentiment[monthlySentiment.length - 1];
  const netSentiment = latest.positive - latest.negative;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Section Header */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Sentiment Indicators</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Social media and forum sentiment analysis — tracks retail investor mood, discussion themes, and influencer positioning.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-medium border border-amber-200">
            ⚠ Illustrative Data
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 italic">
          Note: This tab uses illustrative data to demonstrate the framework. Production version would integrate real-time social listening 
          via Argaam API, X API, and Brunswick Digital's sentiment analysis tools. Requires alignment with digital team and Meghna.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Current Net Sentiment" value={`${netSentiment > 0 ? "+" : ""}${netSentiment}`} color={netSentiment >= 0 ? "text-up" : "text-down"} sub="Positive − Negative" />
        <MetricCard label="Positive %" value={`${latest.positive}%`} color="text-up" sub={`vs ${monthlySentiment[0].positive}% in Jan '24`} />
        <MetricCard label="Discussion Volume" value={`${(latest.volume / 1000).toFixed(1)}K`} sub="Monthly mentions" />
        <MetricCard label="Trend" value="↓ Declining" color="text-down" sub="6-month trajectory" />
      </div>

      {/* Charts Row 1: Sentiment Trend + Theme Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Sentiment Trend (% Positive vs Negative)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlySentiment}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 9 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[0, 80]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
              <Area type="monotone" dataKey="positive" fill={GREEN} fillOpacity={0.15} stroke={GREEN} strokeWidth={2} name="Positive" />
              <Area type="monotone" dataKey="negative" fill={RED} fillOpacity={0.15} stroke={RED} strokeWidth={2} name="Negative" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Key Discussion Themes (Mention %)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={themeData} layout="vertical">
              <XAxis type="number" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <YAxis dataKey="theme" type="category" width={100} tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 10 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
              <Bar dataKey="2024" fill={BLUE} radius={[0, 4, 4, 0]} barSize={10} />
              <Bar dataKey="2025" fill={PURPLE} radius={[0, 4, 4, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2: Platform Mix + Influencer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Discussion Platform Mix</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={platformData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                {platformData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Influencer Tone: % Positive by Segment</h3>
          <div className="space-y-3 mt-2">
            {influencerSentiment.map(inf => (
              <div key={inf.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-foreground font-medium">{inf.name}</span>
                  <span className="text-muted-foreground font-mono">{inf.followers}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 flex gap-1">
                    <div className="h-3 rounded-sm" style={{ width: `${inf.positive2024}%`, background: BLUE }} />
                    <div className="h-3 rounded-sm" style={{ width: `${inf.positive2025}%`, background: PURPLE }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono w-20 text-right">
                    {inf.positive2024}% → {inf.positive2025}%
                  </span>
                </div>
              </div>
            ))}
            <div className="flex gap-4 text-[10px] text-muted-foreground mt-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ background: BLUE }} /> 2024</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ background: PURPLE }} /> 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Observations */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Key Observations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">🔴 Sentiment Reversal</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Net sentiment shifted from strongly positive (+50 in mid-2024) to negative (-13 by Jan 2026). 
              "Overvaluation" and "poor returns" have replaced "growth story" as dominant themes.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">📢 Influencer Effect</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Key finance influencers shifted from 72% positive to 35% positive — their tone has an outsized 
              impact on retail participation decisions. Targeted influencer engagement should be considered.
            </p>
          </div>
          <div className="p-3 rounded-md bg-muted/30 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1">💡 Opportunity</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Discussion volume remains high, indicating continued interest despite negative sentiment. 
              This suggests latent demand that could be re-activated with better IPO performance and comms strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentTab;
