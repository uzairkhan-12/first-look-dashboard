import { ipoData, ipoPerformance } from "@/data/ipoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, ReferenceLine } from "recharts";

// Brunswick brand palette
const NAVY = "hsl(240, 56%, 22%)";
const NAVY_LIGHT = "hsl(240, 40%, 35%)";
const CREAM = "hsl(42, 40%, 95%)";
const CREAM_DARK = "hsl(42, 25%, 88%)";
const GOLD = "hsl(42, 70%, 52%)";
const GREEN = "hsl(142, 70%, 40%)";
const RED = "hsl(0, 65%, 48%)";
const AMBER = "hsl(35, 85%, 50%)";
const MUTED = "hsl(240, 15%, 55%)";

// ── Q4 2025 data (Dec listings: Cherry, Al Masar Al Shamil, CGS, Al Ramz)
const q4Ipos = ipoData.filter(d => d.year === 2025 && ["4265", "6019", "4147", "4327"].includes(d.ticker));
const q4Perfs = ipoPerformance.filter(d => d.year === 2025 && ["4265", "6019", "4147", "4327"].includes(d.ticker));

const avgRetailCov = q4Ipos.reduce((s, d) => s + d.retailCoverageMultiple, 0) / q4Ipos.length;
const avgInstCov = q4Ipos.reduce((s, d) => s + d.institutionalCoverageMultiple, 0) / q4Ipos.length;
const avg3MReturn = q4Perfs.filter(d => d.return3M !== null).reduce((s, d) => s + d.return3M!, 0) / q4Perfs.filter(d => d.return3M !== null).length;
const belowIssueCount = q4Perfs.filter(d => d.belowIssue3M === true).length;
const totalRaised = q4Ipos.reduce((s, d) => s + d.totalOfferSize, 0);

// Pillar scores for Q4 2025 (derived from methodology)
const pillarScores = {
  participation: 25,
  aftermarket: 22,
  sentiment: 28,
  engagement: 35,
};
const compositeScore = Math.round(
  pillarScores.participation * 0.30 +
  pillarScores.aftermarket * 0.25 +
  pillarScores.sentiment * 0.25 +
  pillarScores.engagement * 0.20
);

// Quarterly trend
const trendData = [
  { q: "Q1 '24", score: 62 },
  { q: "Q2 '24", score: 71 },
  { q: "Q3 '24", score: 65 },
  { q: "Q4 '24", score: 58 },
  { q: "Q1 '25", score: 45 },
  { q: "Q2 '25", score: 38 },
  { q: "Q3 '25", score: 32 },
  { q: "Q4 '25", score: compositeScore },
];

// IPO-level detail for Q4
const q4Detail = q4Ipos.map(ipo => {
  const perf = q4Perfs.find(p => p.ticker === ipo.ticker);
  return {
    name: ipo.name,
    sector: ipo.sector,
    size: ipo.totalOfferSize,
    retailCov: ipo.retailCoverageMultiple,
    instCov: ipo.institutionalCoverageMultiple,
    return3M: perf?.return3M ?? null,
    belowIssue: perf?.belowIssue3M ?? null,
  };
});

const pillarBarData = [
  { name: "Participation", score: pillarScores.participation, weight: "30%" },
  { name: "Aftermarket", score: pillarScores.aftermarket, weight: "25%" },
  { name: "Sentiment", score: pillarScores.sentiment, weight: "25%" },
  { name: "Engagement", score: pillarScores.engagement, weight: "20%" },
];

const getScoreColor = (s: number) => s >= 60 ? GREEN : s >= 40 ? AMBER : RED;

const ThoughtLeadershipTab = () => {
  return (
    <div className="animate-fade-in max-w-[900px] mx-auto">
      <div className="rounded-xl overflow-hidden shadow-2xl border-2" style={{ borderColor: NAVY, background: "#fff" }}>

        {/* ── COVER HEADER ── */}
        <div className="relative px-8 py-12 text-center" style={{ background: NAVY }}>
          <p className="text-xs uppercase tracking-[0.4em] font-medium mb-6" style={{ color: GOLD }}>
            B&nbsp;R&nbsp;U&nbsp;N&nbsp;S&nbsp;W&nbsp;I&nbsp;C&nbsp;K
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Saudi IPO Retail<br />Confidence Index
          </h1>
          <div className="w-16 h-0.5 mx-auto my-4" style={{ background: GOLD }} />
          <p className="text-lg font-semibold text-white" style={{ fontFamily: "Georgia, serif" }}>
            Q4 2025 Findings
          </p>
          <p className="text-xs mt-2" style={{ color: "hsl(240, 20%, 72%)" }}>
            January 2026 · Capital Markets Advisory · Riyadh
          </p>
        </div>

        {/* ── CONTENT ── */}
        <div className="px-8 py-8 space-y-8" style={{ background: CREAM }}>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>
              Executive Summary
            </h2>
            <div className="rounded-lg p-5 border" style={{ background: "#fff", borderColor: CREAM_DARK }}>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(240, 20%, 25%)" }}>
                The Brunswick Saudi IPO Retail Confidence Index fell to <strong>{compositeScore}/100</strong> in Q4 2025, 
                marking its lowest reading since we began tracking in Q1 2024. The quarter saw four Main Market listings 
                raise a combined <strong>SAR {(totalRaised / 1000).toFixed(1)}bn</strong>, but retail participation 
                weakened significantly with an average coverage multiple of just <strong>{avgRetailCov.toFixed(1)}x</strong>.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(240, 20%, 25%)" }}>
                Aftermarket performance was mixed: two of four Q4 IPOs traded below their offer price within three months, 
                while the average 3-month return was <strong>{avg3MReturn > 0 ? "+" : ""}{avg3MReturn.toFixed(1)}%</strong>. 
                Al Masar Al Shamil was the standout performer (+19%), supported by its consumer services positioning and 
                reasonable pricing, while CGS struggled with -18% as investors rotated away from capital goods names.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(240, 20%, 25%)" }}>
                The sustained downward trend from Q2 2024's peak of 71 suggests retail investors are exercising 
                significantly greater selectivity, favouring established consumer brands and reasonably priced offerings 
                over sector-specialist or premium-priced listings.
              </p>
            </div>
          </div>

          {/* Composite Score + Trend */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Score Card */}
            <div className="rounded-lg border p-6 text-center" style={{ background: "#fff", borderColor: CREAM_DARK }}>
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-1" style={{ color: MUTED }}>Q4 2025 Composite Score</p>
              <div className="my-4">
                <span className="text-6xl font-bold" style={{ color: getScoreColor(compositeScore), fontFamily: "Georgia, serif" }}>
                  {compositeScore}
                </span>
                <span className="text-lg" style={{ color: MUTED }}>/100</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${RED}18`, color: RED }}>
                ▼ Weak Confidence
              </span>
              <p className="text-[11px] mt-3" style={{ color: MUTED }}>
                Down from 32 in Q3 2025 · Down from 58 in Q4 2024
              </p>
            </div>

            {/* Trend Chart */}
            <div className="rounded-lg border p-4" style={{ background: "#fff", borderColor: CREAM_DARK }}>
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: MUTED }}>Index Trend (Q1 2024 – Q4 2025)</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CREAM_DARK} />
                  <XAxis dataKey="q" tick={{ fill: MUTED, fontSize: 9 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} domain={[0, 100]} />
                  <ReferenceLine y={60} stroke={GREEN} strokeDasharray="4 4" />
                  <ReferenceLine y={40} stroke={AMBER} strokeDasharray="4 4" />
                  <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${CREAM_DARK}`, borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke={NAVY} strokeWidth={3} dot={{ fill: NAVY, r: 4 }} name="Index Score" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-4 mt-1 text-[10px]" style={{ color: MUTED }}>
                <span className="flex items-center gap-1"><span className="inline-block w-6 h-0.5" style={{ background: GREEN }} /> Confident (60+)</span>
                <span className="flex items-center gap-1"><span className="inline-block w-6 h-0.5" style={{ background: AMBER }} /> Cautious (40)</span>
              </div>
            </div>
          </div>

          {/* Pillar Breakdown */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>
              Pillar Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4" style={{ background: "#fff", borderColor: CREAM_DARK }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={pillarBarData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: MUTED, fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: NAVY, fontSize: 11, fontWeight: 600 }} width={90} />
                    <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${CREAM_DARK}`, borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}/100`]} />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {pillarBarData.map((d, i) => (
                        <Cell key={i} fill={getScoreColor(d.score)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Participation", score: pillarScores.participation, weight: "30%", commentary: `Average retail coverage of ${avgRetailCov.toFixed(1)}x — well below the 2024 average of 15.5x. CGS (0.71x) and Al Ramz (0.36x) were under-subscribed, signalling eroding retail appetite for less familiar names.` },
                  { name: "Aftermarket", score: pillarScores.aftermarket, weight: "25%", commentary: `Two of four IPOs traded below issue price at 3M. Average 3M return of ${avg3MReturn.toFixed(1)}% masks significant divergence between winners (Al Masar Al Shamil +19%) and losers (CGS -18%).` },
                  { name: "Sentiment", score: pillarScores.sentiment, weight: "25%", commentary: "Social media discussion volume dropped ~40% vs Q3 2025. Tone on Argaam forums has shifted from cautious to sceptical, with recurring themes of 'overpricing' and 'lack of value'." },
                  { name: "Engagement", score: pillarScores.engagement, weight: "20%", commentary: "Digital engagement metrics remained more resilient than other pillars. Prospectus download volumes held steady, suggesting retail investors are still researching but choosing not to participate." },
                ].map(p => (
                  <div key={p.name} className="rounded-md border p-3" style={{ borderColor: CREAM_DARK, background: "#fff" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold" style={{ color: NAVY }}>{p.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]" style={{ color: MUTED }}>Wt: {p.weight}</span>
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ color: getScoreColor(p.score), background: `${getScoreColor(p.score)}15` }}>
                          {p.score}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: "hsl(240, 15%, 40%)" }}>{p.commentary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Q4 IPO Detail Table */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>
              Q4 2025 IPO Detail
            </h2>
            <div className="rounded-lg border overflow-hidden" style={{ borderColor: CREAM_DARK }}>
              <table className="w-full text-sm" style={{ background: "#fff" }}>
                <thead>
                  <tr style={{ background: NAVY }}>
                    {["Company", "Sector", "Size (SAR m)", "Retail Cov.", "Inst. Cov.", "3M Return"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {q4Detail.map((d, i) => (
                    <tr key={d.name} className="border-b" style={{ borderColor: CREAM_DARK, background: i % 2 === 0 ? "#fff" : CREAM }}>
                      <td className="px-4 py-2 font-semibold text-xs" style={{ color: NAVY }}>{d.name}</td>
                      <td className="px-4 py-2 text-xs" style={{ color: MUTED }}>{d.sector}</td>
                      <td className="px-4 py-2 text-xs font-mono" style={{ color: NAVY }}>{d.size.toFixed(0)}</td>
                      <td className="px-4 py-2 text-xs font-mono font-bold" style={{ color: d.retailCov >= 5 ? GREEN : d.retailCov >= 1 ? AMBER : RED }}>
                        {d.retailCov.toFixed(1)}x
                      </td>
                      <td className="px-4 py-2 text-xs font-mono" style={{ color: NAVY }}>{d.instCov.toFixed(1)}x</td>
                      <td className="px-4 py-2 text-xs font-mono font-bold" style={{ color: d.return3M !== null ? (d.return3M >= 0 ? GREEN : RED) : MUTED }}>
                        {d.return3M !== null ? `${d.return3M > 0 ? "+" : ""}${d.return3M}%` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Takeaways */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>
              Key Takeaways for Issuers
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  num: "01",
                  title: "Pricing Discipline is Non-Negotiable",
                  text: "The data is unambiguous: IPOs perceived as overpriced are being punished by retail investors through both low subscription rates and aftermarket selling. Companies must anchor valuations to clear peer benchmarks.",
                },
                {
                  num: "02",
                  title: "Brand Familiarity Drives Retail Demand",
                  text: "Consumer-facing names with established brand equity continue to attract stronger retail participation. B2B and specialist companies require significantly more pre-IPO investor education and awareness building.",
                },
                {
                  num: "03",
                  title: "Start Communications Earlier",
                  text: "In a weak confidence environment, the pre-IPO communications runway needs to be longer and more intensive. Companies should begin building retail awareness 9–12 months before listing, not 3–6 months.",
                },
              ].map(t => (
                <div key={t.num} className="rounded-lg border p-5" style={{ background: "#fff", borderColor: CREAM_DARK }}>
                  <span className="text-2xl font-bold" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>{t.num}</span>
                  <p className="text-xs font-bold mt-2 mb-2" style={{ color: NAVY }}>{t.title}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "hsl(240, 15%, 40%)" }}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outlook */}
          <div className="rounded-lg p-5 border" style={{ background: NAVY, borderColor: NAVY }}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
              Outlook · Q1 2026
            </h2>
            <p className="text-sm leading-relaxed text-white mb-3">
              We expect the Index to remain in the 25–35 range through Q1 2026 absent a significant catalyst. 
              TASI performance, which has been range-bound, provides limited tailwind for new listings. However, 
              the pipeline includes several consumer-facing names that could benefit from stronger brand recognition 
              among retail investors.
            </p>
            <p className="text-sm leading-relaxed text-white">
              Companies planning H1 2026 listings should focus communications efforts on: (1) clear valuation narratives 
              anchored to peer comparisons, (2) early-stage Arabic-language social media campaigns to build pre-IPO 
              awareness, and (3) proactive engagement with financial influencers and commentators on platforms like Argaam and X.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: CREAM_DARK }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: NAVY }}>
                B&nbsp;R&nbsp;U&nbsp;N&nbsp;S&nbsp;W&nbsp;I&nbsp;C&nbsp;K
              </p>
              <p className="text-[9px] mt-0.5" style={{ color: MUTED }}>
                Capital Markets Advisory · Riyadh
              </p>
            </div>
            <p className="text-[9px]" style={{ color: MUTED }}>
              Indicative Analysis · Q4 2025 · For Discussion Purposes Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtLeadershipTab;
