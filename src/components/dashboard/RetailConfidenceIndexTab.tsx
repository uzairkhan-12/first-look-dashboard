import { ipoData, ipoPerformance } from "@/data/ipoData";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid, Cell, ReferenceLine } from "recharts";

const TOOLTIP_STYLE = { background: "hsl(40, 25%, 99%)", border: "1px solid hsl(40, 15%, 85%)", borderRadius: 8, color: "hsl(220, 20%, 12%)" };
const BLUE = "hsl(210, 80%, 55%)";
const PURPLE = "hsl(270, 60%, 55%)";
const GREEN = "hsl(142, 70%, 45%)";
const RED = "hsl(0, 72%, 51%)";
const AMBER = "hsl(35, 90%, 55%)";

// ─── Scoring Logic ───────────────────────────────────────────
// Each bucket is scored 0-100, then weighted to produce composite index

const calcParticipationScore = (year: number) => {
  const ipos = ipoData.filter(d => d.year === year);
  const avgCov = ipos.reduce((s, d) => s + d.retailCoverageMultiple, 0) / ipos.length;
  const oversubscribed = ipos.filter(d => d.retailCoverageMultiple >= 1).length / ipos.length;
  // Score: coverage component (0-50) + subscription rate component (0-50)
  const covScore = Math.min(avgCov / 20 * 50, 50); // 20x = max score
  const subScore = oversubscribed * 50;
  return Math.round(covScore + subScore);
};

const calcAftermarketScore = (year: number) => {
  const perfs = ipoPerformance.filter(d => d.year === year && d.return3M !== null);
  const aboveOffer = perfs.filter(d => !d.belowIssue3M).length / perfs.length;
  const avgReturn = perfs.reduce((s, d) => s + d.return3M!, 0) / perfs.length;
  // Score: above offer % (0-50) + return component (0-50)
  const offerScore = aboveOffer * 50;
  const returnScore = Math.max(0, Math.min(((avgReturn + 50) / 100) * 50, 50)); // -50% = 0, +50% = 50
  return Math.round(offerScore + returnScore);
};

// Illustrative sentiment/engagement scores
const sentimentScores = { 2024: 68, 2025: 28 };
const engagementScores = { 2024: 72, 2025: 38 };

const WEIGHTS = {
  participation: 0.30,
  aftermarket: 0.30,
  sentiment: 0.20,
  engagement: 0.20,
};

const buildScorecard = (year: number) => {
  const participation = calcParticipationScore(year);
  const aftermarket = calcAftermarketScore(year);
  const sentiment = year === 2024 ? sentimentScores[2024] : sentimentScores[2025];
  const engagement = year === 2024 ? engagementScores[2024] : engagementScores[2025];
  const composite = Math.round(
    participation * WEIGHTS.participation +
    aftermarket * WEIGHTS.aftermarket +
    sentiment * WEIGHTS.sentiment +
    engagement * WEIGHTS.engagement
  );
  return { participation, aftermarket, sentiment, engagement, composite };
};

const score24 = buildScorecard(2024);
const score25 = buildScorecard(2025);

const getGrade = (score: number) => {
  if (score >= 80) return { grade: "A", label: "Strong Confidence", color: GREEN };
  if (score >= 60) return { grade: "B", label: "Moderate Confidence", color: BLUE };
  if (score >= 40) return { grade: "C", label: "Cautious", color: AMBER };
  if (score >= 20) return { grade: "D", label: "Weak Confidence", color: RED };
  return { grade: "F", label: "Very Weak", color: RED };
};

const grade24 = getGrade(score24.composite);
const grade25 = getGrade(score25.composite);

// Radial data for gauge
const gaugeData24 = [{ name: "Score", value: score24.composite, fill: grade24.color }];
const gaugeData25 = [{ name: "Score", value: score25.composite, fill: grade25.color }];

// Bucket comparison
const bucketComparison = [
  { bucket: "Participation", "2024": score24.participation, "2025": score25.participation, weight: "30%" },
  { bucket: "Aftermarket", "2024": score24.aftermarket, "2025": score25.aftermarket, weight: "30%" },
  { bucket: "Sentiment", "2024": score24.sentiment, "2025": score25.sentiment, weight: "20%" },
  { bucket: "Engagement", "2024": score24.engagement, "2025": score25.engagement, weight: "20%" },
];

// Illustrative quarterly trend
const quarterlyTrend = [
  { quarter: "Q1 2024", index: 62, participation: 55, aftermarket: 72, sentiment: 62, engagement: 65 },
  { quarter: "Q2 2024", index: 71, participation: 65, aftermarket: 80, sentiment: 68, engagement: 72 },
  { quarter: "Q3 2024", index: 65, participation: 58, aftermarket: 70, sentiment: 60, engagement: 68 },
  { quarter: "Q4 2024", index: 58, participation: 50, aftermarket: 62, sentiment: 55, engagement: 62 },
  { quarter: "Q1 2025", index: 45, participation: 42, aftermarket: 48, sentiment: 42, engagement: 48 },
  { quarter: "Q2 2025", index: 38, participation: 35, aftermarket: 35, sentiment: 35, engagement: 42 },
  { quarter: "Q3 2025", index: 32, participation: 30, aftermarket: 28, sentiment: 30, engagement: 38 },
  { quarter: "Q4 2025", index: 28, participation: 25, aftermarket: 22, sentiment: 28, engagement: 35 },
];

const ScoreGauge = ({ score, grade, label, year, color }: { score: number; grade: string; label: string; year: number; color: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative" style={{ width: 160, height: 100 }}>
      <ResponsiveContainer width="100%" height={100}>
        <RadialBarChart
          cx="50%" cy="100%" innerRadius={55} outerRadius={75}
          startAngle={180} endAngle={0}
          data={[{ value: score, fill: color }]}
        >
          <RadialBar dataKey="value" background={{ fill: "hsl(40, 15%, 90%)" }} cornerRadius={5} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        <span className="text-3xl font-mono font-bold text-foreground">{score}</span>
      </div>
    </div>
    <div className="text-center mt-2">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${color}22`, color }}>
        {grade}
      </span>
      <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
      <p className="text-xs font-semibold text-foreground mt-0.5" style={{ color: year === 2024 ? BLUE : PURPLE }}>{year}</p>
    </div>
  </div>
);

const BucketRow = ({ label, score, weight, color }: { label: string; score: number; weight: string; color: string }) => (
  <div className="flex items-center gap-3 py-2 border-b border-border/50">
    <span className="text-xs text-muted-foreground w-24">{label}</span>
    <div className="flex-1 h-4 bg-muted/50 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
    </div>
    <span className="font-mono text-sm font-bold w-10 text-right text-foreground">{score}</span>
    <span className="text-[10px] text-muted-foreground w-8">{weight}</span>
  </div>
);

const RetailConfidenceIndexTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Brunswick Retail Confidence Index™</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Composite metric tracking retail investor confidence in Saudi IPO participation. 
              Combines behavioral, sentiment, and market signals into a single scored metric (0–100).
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-medium border border-amber-200">
            ⚠ Prototype
          </span>
        </div>
      </div>

      {/* Composite Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-medium text-muted-foreground text-center mb-2">Composite Index Score</h3>
          <div className="flex justify-center">
            <ScoreGauge score={score24.composite} grade={grade24.grade} label={grade24.label} year={2024} color={grade24.color} />
          </div>
          <div className="mt-4 space-y-0">
            <BucketRow label="Participation" score={score24.participation} weight="30%" color={BLUE} />
            <BucketRow label="Aftermarket" score={score24.aftermarket} weight="30%" color={BLUE} />
            <BucketRow label="Sentiment" score={score24.sentiment} weight="20%" color={BLUE} />
            <BucketRow label="Engagement" score={score24.engagement} weight="20%" color={BLUE} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-medium text-muted-foreground text-center mb-2">Composite Index Score</h3>
          <div className="flex justify-center">
            <ScoreGauge score={score25.composite} grade={grade25.grade} label={grade25.label} year={2025} color={grade25.color} />
          </div>
          <div className="mt-4 space-y-0">
            <BucketRow label="Participation" score={score25.participation} weight="30%" color={PURPLE} />
            <BucketRow label="Aftermarket" score={score25.aftermarket} weight="30%" color={PURPLE} />
            <BucketRow label="Sentiment" score={score25.sentiment} weight="20%" color={PURPLE} />
            <BucketRow label="Engagement" score={score25.engagement} weight="20%" color={PURPLE} />
          </div>
        </div>
      </div>

      {/* Bucket Comparison Chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Bucket Score Comparison: 2024 vs 2025</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bucketComparison}>
            <XAxis dataKey="bucket" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} domain={[0, 100]} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, name: string) => [`${v}/100`, name]} />
            <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
            <Bar dataKey="2024" fill={BLUE} radius={[4, 4, 0, 0]} />
            <Bar dataKey="2025" fill={PURPLE} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quarterly Trend */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Quarterly Index Trend</h3>
        <p className="text-[10px] text-muted-foreground mb-4">Illustrative — shows how the composite index would be tracked over time</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={quarterlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
            <XAxis dataKey="quarter" tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 9 }} />
            <YAxis tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 11 }} domain={[0, 100]} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ color: "hsl(220, 10%, 45%)" }} />
            <ReferenceLine y={60} stroke={GREEN} strokeDasharray="4 4" label={{ value: "Confident", fill: GREEN, fontSize: 9 }} />
            <ReferenceLine y={40} stroke={AMBER} strokeDasharray="4 4" label={{ value: "Cautious", fill: AMBER, fontSize: 9 }} />
            <Line type="monotone" dataKey="index" stroke="hsl(220, 20%, 12%)" strokeWidth={3} name="Composite" dot={{ fill: "hsl(220, 20%, 12%)", r: 4 }} />
            <Line type="monotone" dataKey="participation" stroke={GREEN} strokeWidth={1.5} strokeDasharray="4 4" name="Participation" dot={false} />
            <Line type="monotone" dataKey="aftermarket" stroke={RED} strokeWidth={1.5} strokeDasharray="4 4" name="Aftermarket" dot={false} />
            <Line type="monotone" dataKey="sentiment" stroke={BLUE} strokeWidth={1.5} strokeDasharray="4 4" name="Sentiment" dot={false} />
            <Line type="monotone" dataKey="engagement" stroke={AMBER} strokeWidth={1.5} strokeDasharray="4 4" name="Engagement" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Methodology + Use Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Methodology</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-1">Participation (30%)</p>
              <p className="text-[11px] text-muted-foreground">
                Retail oversubscription ratios, % of allocated shares taken up, subscriber volumes. 
                Source: CMA filings, STG data (some non-public).
              </p>
            </div>
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-1">Aftermarket (30%)</p>
              <p className="text-[11px] text-muted-foreground">
                % trading above offer price, average returns at 30/90 day horizons, volatility vs TASI. 
                Source: Saudi Exchange, Bloomberg.
              </p>
            </div>
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-1">Sentiment (20%)</p>
              <p className="text-[11px] text-muted-foreground">
                Social media sentiment (X, Argaam), discussion volume, key theme tracking, influencer tone. 
                Source: Brunswick Digital, social listening tools.
              </p>
            </div>
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-1">Engagement (20%)</p>
              <p className="text-[11px] text-muted-foreground">
                Microsite traffic, document downloads, time-on-site, channel performance. 
                Source: Google Analytics, CMS data (client IPOs only).
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Use Cases</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-1">🏢 IPO Client Diagnostic</p>
              <p className="text-[11px] text-muted-foreground">
                Present the index during pitch and planning phases to set expectations around retail appetite. 
                Use bucket scores to identify specific areas where comms strategy can make a difference.
              </p>
            </div>
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-1">📊 Regulator / Media Barometer</p>
              <p className="text-[11px] text-muted-foreground">
                Publish quarterly as a Brunswick thought-leadership piece. Position Brunswick as the authority 
                on Saudi retail investor sentiment and IPO market health.
              </p>
            </div>
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-1">📝 Comms Strategy Input</p>
              <p className="text-[11px] text-muted-foreground">
                Tailor IPO communications based on current index level. Low sentiment = more educational content; 
                low participation = targeted influencer engagement; low aftermarket = pricing narrative focus.
              </p>
            </div>
            <div className="p-3 rounded-md bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-1">🔮 Predictive Value</p>
              <p className="text-[11px] text-muted-foreground">
                Over time, correlate index readings with actual IPO subscription rates to build predictive 
                capability — enabling proactive strategy adjustments before subscription periods open.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="rounded-lg border-2 border-primary/30 bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">📋 Next Steps for Workshop</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">Data & Methodology</p>
            <ul className="space-y-1.5 text-[11px] text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">□</span> Confirm data access with STG (non-public retail trading data)</li>
              <li className="flex gap-2"><span className="text-primary">□</span> Align with digital team on sentiment data pipeline</li>
              <li className="flex gap-2"><span className="text-primary">□</span> Validate weighting methodology with team</li>
              <li className="flex gap-2"><span className="text-primary">□</span> Define influencer list for tone analysis</li>
              <li className="flex gap-2"><span className="text-primary">□</span> Backtest index against historical subscription rates</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">Commercialization</p>
            <ul className="space-y-1.5 text-[11px] text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">□</span> Draft thought-leadership publication format</li>
              <li className="flex gap-2"><span className="text-primary">□</span> Design client-facing one-pager template</li>
              <li className="flex gap-2"><span className="text-primary">□</span> Identify first client engagement opportunity</li>
              <li className="flex gap-2"><span className="text-primary">□</span> Discuss with Meghna re: digital team support</li>
              <li className="flex gap-2"><span className="text-primary">□</span> Secure budget for social listening tools</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailConfidenceIndexTab;
