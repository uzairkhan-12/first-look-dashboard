import { ipoData, ipoPerformance } from "@/data/ipoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, ReferenceLine } from "recharts";
import kafdImage from "@/assets/kafd-riyadh.jpg";

// Brunswick brand palette
const NAVY = "hsl(240, 56%, 22%)";
const NAVY_LIGHT = "hsl(240, 40%, 35%)";
const NAVY_DEEP = "hsl(240, 60%, 14%)";
const CREAM = "hsl(42, 40%, 95%)";
const CREAM_DARK = "hsl(42, 25%, 88%)";
const GOLD = "hsl(42, 70%, 52%)";
const GOLD_LIGHT = "hsl(42, 60%, 70%)";
const GREEN = "hsl(142, 70%, 40%)";
const RED = "hsl(0, 65%, 48%)";
const AMBER = "hsl(35, 85%, 50%)";
const MUTED = "hsl(240, 15%, 55%)";
const TEXT = "hsl(240, 20%, 22%)";
const TEXT_LIGHT = "hsl(240, 12%, 42%)";

// ── Q4 2025 data
const q4Ipos = ipoData.filter(d => d.year === 2025 && ["4265", "6019", "4147", "4327"].includes(d.ticker));
const q4Perfs = ipoPerformance.filter(d => d.year === 2025 && ["4265", "6019", "4147", "4327"].includes(d.ticker));

const avgRetailCov = q4Ipos.reduce((s, d) => s + d.retailCoverageMultiple, 0) / q4Ipos.length;
const avg3MReturn = q4Perfs.filter(d => d.return3M !== null).reduce((s, d) => s + d.return3M!, 0) / q4Perfs.filter(d => d.return3M !== null).length;
const totalRaised = q4Ipos.reduce((s, d) => s + d.totalOfferSize, 0);

const pillarScores = { participation: 25, aftermarket: 22, sentiment: 28, engagement: 35 };
const compositeScore = Math.round(
  pillarScores.participation * 0.30 + pillarScores.aftermarket * 0.25 +
  pillarScores.sentiment * 0.25 + pillarScores.engagement * 0.20
);

const trendData = [
  { q: "Q1 '24", score: 62 }, { q: "Q2 '24", score: 71 }, { q: "Q3 '24", score: 65 }, { q: "Q4 '24", score: 58 },
  { q: "Q1 '25", score: 45 }, { q: "Q2 '25", score: 38 }, { q: "Q3 '25", score: 32 }, { q: "Q4 '25", score: compositeScore },
];

const q4Detail = q4Ipos.map(ipo => {
  const perf = q4Perfs.find(p => p.ticker === ipo.ticker);
  return { name: ipo.name, sector: ipo.sector, size: ipo.totalOfferSize, retailCov: ipo.retailCoverageMultiple, instCov: ipo.institutionalCoverageMultiple, return3M: perf?.return3M ?? null };
});

const pillarBarData = [
  { name: "Participation", score: pillarScores.participation, weight: "30%" },
  { name: "Aftermarket", score: pillarScores.aftermarket, weight: "25%" },
  { name: "Sentiment", score: pillarScores.sentiment, weight: "25%" },
  { name: "Engagement", score: pillarScores.engagement, weight: "20%" },
];

const getScoreColor = (s: number) => s >= 60 ? GREEN : s >= 40 ? AMBER : RED;

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="w-1 h-6 rounded-full" style={{ background: GOLD }} />
    <h2 className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>
      {children}
    </h2>
  </div>
);

const ThoughtLeadershipTab = () => {
  return (
    <div className="animate-fade-in max-w-[920px] mx-auto pb-4">
      <div className="rounded-xl overflow-hidden shadow-2xl" style={{ border: `2px solid ${NAVY}`, background: "#fff" }}>

        {/* ── HEADER ── */}
        <div className="px-10 py-14 text-center" style={{ background: `linear-gradient(160deg, ${NAVY_DEEP} 0%, ${NAVY} 50%, ${NAVY_LIGHT} 100%)` }}>
          <p className="text-[10px] uppercase tracking-[0.5em] font-semibold mb-8" style={{ color: GOLD }}>
            B&nbsp;R&nbsp;U&nbsp;N&nbsp;S&nbsp;W&nbsp;I&nbsp;C&nbsp;K
          </p>
          <h1 className="text-3xl md:text-[2.6rem] font-bold text-white tracking-tight leading-[1.15] mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Saudi IPO Retail<br />Confidence Index
          </h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="w-8 h-px" style={{ background: GOLD_LIGHT }} />
            <div className="w-2 h-2 rotate-45" style={{ background: GOLD }} />
            <div className="w-8 h-px" style={{ background: GOLD_LIGHT }} />
          </div>
          <p className="text-xl font-semibold text-white tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
            Q4 2025 Findings
          </p>
          <p className="text-[11px] mt-4 tracking-widest uppercase" style={{ color: GOLD_LIGHT }}>
            January 2026 · Capital Markets Advisory · Riyadh
          </p>
        </div>

        {/* ── KEY METRICS STRIP ── */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ background: NAVY_LIGHT }}>
          {[
            { label: "Composite Score", value: `${compositeScore}/100`, color: getScoreColor(compositeScore) },
            { label: "IPOs in Quarter", value: "4", color: "#fff" },
            { label: "Total Raised", value: `SAR ${(totalRaised / 1000).toFixed(1)}bn`, color: "#fff" },
            { label: "Avg 3M Return", value: `${avg3MReturn > 0 ? "+" : ""}${avg3MReturn.toFixed(1)}%`, color: avg3MReturn >= 0 ? GREEN : RED },
          ].map(m => (
            <div key={m.label} className="px-5 py-4 text-center border-r last:border-r-0" style={{ borderColor: "hsl(240, 30%, 28%)" }}>
              <p className="text-[9px] uppercase tracking-[0.15em] mb-1" style={{ color: "hsl(240, 20%, 65%)" }}>{m.label}</p>
              <p className="text-lg font-bold font-mono" style={{ color: m.color }}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div className="px-10 py-10 space-y-10" style={{ background: CREAM }}>

          {/* Executive Summary */}
          <div>
            <SectionTitle>Executive Summary</SectionTitle>
            <div className="rounded-lg p-6 border-l-4" style={{ background: "#fff", borderColor: GOLD, boxShadow: "0 2px 12px hsl(42, 20%, 85%)" }}>
              <p className="text-[13px] leading-[1.8] mb-3" style={{ color: TEXT }}>
                The Brunswick Saudi IPO Retail Confidence Index fell to <strong style={{ color: RED }}>{compositeScore}/100</strong> in Q4 2025,
                marking its lowest reading since we began tracking in Q1 2024. The quarter saw four Main Market listings
                raise a combined <strong>SAR {(totalRaised / 1000).toFixed(1)}bn</strong>, but retail participation
                weakened significantly with an average coverage multiple of just <strong>{avgRetailCov.toFixed(1)}x</strong>.
              </p>
              <p className="text-[13px] leading-[1.8] mb-3" style={{ color: TEXT }}>
                Aftermarket performance was mixed: two of four Q4 IPOs traded below their offer price within three months,
                while the average 3-month return was <strong>{avg3MReturn > 0 ? "+" : ""}{avg3MReturn.toFixed(1)}%</strong>.
                Al Masar Al Shamil was the standout performer (+19%), supported by its consumer services positioning and
                reasonable pricing, while CGS struggled with -18% as investors rotated away from capital goods names.
              </p>
              <p className="text-[13px] leading-[1.8]" style={{ color: TEXT }}>
                The sustained downward trend from Q2 2024's peak of 71 suggests retail investors are exercising
                significantly greater selectivity, favouring established consumer brands and reasonably priced offerings
                over sector-specialist or premium-priced listings.
              </p>
            </div>
          </div>

          {/* Composite Score + Trend */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border p-6 text-center" style={{ background: "#fff", borderColor: CREAM_DARK, boxShadow: "0 2px 12px hsl(42, 20%, 88%)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: MUTED }}>Q4 2025 Composite Score</p>
              <div className="my-5">
                <span className="text-7xl font-bold" style={{ color: getScoreColor(compositeScore), fontFamily: "Georgia, serif" }}>
                  {compositeScore}
                </span>
                <span className="text-xl ml-1" style={{ color: MUTED }}>/100</span>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: `${RED}15`, color: RED, border: `1px solid ${RED}30` }}>
                ▼ Weak Confidence
              </span>
              <p className="text-[11px] mt-4" style={{ color: MUTED }}>
                Down from 32 in Q3 2025 · Down from 58 in Q4 2024
              </p>
            </div>

            <div className="rounded-lg border p-5" style={{ background: "#fff", borderColor: CREAM_DARK, boxShadow: "0 2px 12px hsl(42, 20%, 88%)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: MUTED }}>Index Trend (Q1 2024 – Q4 2025)</p>
              <ResponsiveContainer width="100%" height={185}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CREAM_DARK} />
                  <XAxis dataKey="q" tick={{ fill: MUTED, fontSize: 9 }} />
                  <YAxis tick={{ fill: MUTED, fontSize: 10 }} domain={[0, 100]} />
                  <ReferenceLine y={60} stroke={GREEN} strokeDasharray="4 4" />
                  <ReferenceLine y={40} stroke={AMBER} strokeDasharray="4 4" />
                  <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${CREAM_DARK}`, borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke={NAVY} strokeWidth={3} dot={{ fill: NAVY, r: 5, strokeWidth: 2, stroke: "#fff" }} name="Index Score" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-5 mt-2 text-[10px]" style={{ color: MUTED }}>
                <span className="flex items-center gap-1.5"><span className="inline-block w-6 h-0.5" style={{ background: GREEN }} /> Confident (60+)</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-6 h-0.5" style={{ background: AMBER }} /> Cautious (40)</span>
              </div>
            </div>
          </div>

          {/* ── KAFD IMAGE BREAK ── */}
          <div className="relative rounded-lg overflow-hidden" style={{ height: 200 }}>
            <img src={kafdImage} alt="King Abdullah Financial District, Riyadh" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${NAVY}dd 0%, ${NAVY}88 40%, transparent 70%)` }} />
            <div className="relative z-10 h-full flex items-center px-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: GOLD }}>Market Landscape</p>
                <p className="text-white text-lg font-semibold leading-snug" style={{ fontFamily: "Georgia, serif" }}>
                  Riyadh's evolving capital<br />markets ecosystem
                </p>
              </div>
            </div>
          </div>

          {/* Pillar Breakdown */}
          <div>
            <SectionTitle>Pillar Breakdown</SectionTitle>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-lg border p-5" style={{ background: "#fff", borderColor: CREAM_DARK, boxShadow: "0 2px 12px hsl(42, 20%, 88%)" }}>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={pillarBarData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: MUTED, fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: NAVY, fontSize: 11, fontWeight: 700 }} width={95} />
                    <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${CREAM_DARK}`, borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}/100`]} />
                    <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={20}>
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
                  <div key={p.name} className="rounded-lg border p-3.5 transition-shadow hover:shadow-md" style={{ borderColor: CREAM_DARK, background: "#fff" }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold" style={{ color: NAVY }}>{p.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]" style={{ color: MUTED }}>Wt: {p.weight}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: getScoreColor(p.score), background: `${getScoreColor(p.score)}12`, border: `1px solid ${getScoreColor(p.score)}25` }}>
                          {p.score}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] leading-[1.7]" style={{ color: TEXT_LIGHT }}>{p.commentary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Q4 IPO Detail Table */}
          <div>
            <SectionTitle>Q4 2025 IPO Detail</SectionTitle>
            <div className="rounded-lg overflow-hidden" style={{ boxShadow: "0 2px 12px hsl(42, 20%, 85%)" }}>
              <table className="w-full text-sm" style={{ background: "#fff" }}>
                <thead>
                  <tr style={{ background: NAVY }}>
                    {["Company", "Sector", "Size (SAR m)", "Retail Cov.", "Inst. Cov.", "3M Return"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {q4Detail.map((d, i) => (
                    <tr key={d.name} className="border-b transition-colors hover:bg-[hsl(42,30%,93%)]" style={{ borderColor: CREAM_DARK, background: i % 2 === 0 ? "#fff" : CREAM }}>
                      <td className="px-4 py-2.5 font-semibold text-xs" style={{ color: NAVY }}>{d.name}</td>
                      <td className="px-4 py-2.5 text-xs" style={{ color: MUTED }}>{d.sector}</td>
                      <td className="px-4 py-2.5 text-xs font-mono" style={{ color: NAVY }}>{d.size.toFixed(0)}</td>
                      <td className="px-4 py-2.5 text-xs font-mono font-bold" style={{ color: d.retailCov >= 5 ? GREEN : d.retailCov >= 1 ? AMBER : RED }}>
                        {d.retailCov.toFixed(1)}x
                      </td>
                      <td className="px-4 py-2.5 text-xs font-mono" style={{ color: NAVY }}>{d.instCov.toFixed(1)}x</td>
                      <td className="px-4 py-2.5 text-xs font-mono font-bold" style={{ color: d.return3M !== null ? (d.return3M >= 0 ? GREEN : RED) : MUTED }}>
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
            <SectionTitle>Key Takeaways for Issuers</SectionTitle>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { num: "01", title: "Pricing Discipline is Non-Negotiable", text: "The data is unambiguous: IPOs perceived as overpriced are being punished by retail investors through both low subscription rates and aftermarket selling. Companies must anchor valuations to clear peer benchmarks." },
                { num: "02", title: "Brand Familiarity Drives Retail Demand", text: "Consumer-facing names with established brand equity continue to attract stronger retail participation. B2B and specialist companies require significantly more pre-IPO investor education and awareness building." },
                { num: "03", title: "Start Communications Earlier", text: "In a weak confidence environment, the pre-IPO communications runway needs to be longer and more intensive. Companies should begin building retail awareness 9–12 months before listing, not 3–6 months." },
              ].map(t => (
                <div key={t.num} className="rounded-lg border p-6 relative overflow-hidden" style={{ background: "#fff", borderColor: CREAM_DARK, boxShadow: "0 2px 12px hsl(42, 20%, 88%)" }}>
                  <span className="absolute top-3 right-4 text-5xl font-bold opacity-[0.06]" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>{t.num}</span>
                  <span className="text-xl font-bold" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>{t.num}</span>
                  <p className="text-xs font-bold mt-3 mb-2" style={{ color: NAVY }}>{t.title}</p>
                  <p className="text-[11px] leading-[1.7]" style={{ color: TEXT_LIGHT }}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outlook */}
          <div className="rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 20px hsl(240, 30%, 15%, 0.15)" }}>
            <div className="px-7 py-6" style={{ background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 60%, ${NAVY_LIGHT} 100%)` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: GOLD }} />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>
                  Outlook · Q1 2026
                </h2>
              </div>
              <p className="text-[13px] leading-[1.8] text-white/90 mb-3">
                We expect the Index to remain in the 25–35 range through Q1 2026 absent a significant catalyst.
                TASI performance, which has been range-bound, provides limited tailwind for new listings. However,
                the pipeline includes several consumer-facing names that could benefit from stronger brand recognition
                among retail investors.
              </p>
              <p className="text-[13px] leading-[1.8] text-white/90">
                Companies planning H1 2026 listings should focus communications efforts on: (1) clear valuation narratives
                anchored to peer comparisons, (2) early-stage Arabic-language social media campaigns to build pre-IPO
                awareness, and (3) proactive engagement with financial influencers and commentators on platforms like Argaam and X.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-5 border-t-2 flex items-center justify-between" style={{ borderColor: NAVY }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: NAVY }}>
                B&nbsp;R&nbsp;U&nbsp;N&nbsp;S&nbsp;W&nbsp;I&nbsp;C&nbsp;K
              </p>
              <p className="text-[9px] mt-1" style={{ color: MUTED }}>
                Capital Markets Advisory · Riyadh
              </p>
            </div>
            <p className="text-[9px] text-right" style={{ color: MUTED }}>
              Indicative Analysis · Q4 2025<br />For Discussion Purposes Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtLeadershipTab;
