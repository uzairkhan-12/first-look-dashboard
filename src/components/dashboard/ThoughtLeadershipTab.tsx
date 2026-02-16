const SectionDivider = () => (
  <div className="flex items-center gap-4 my-8">
    <div className="h-px flex-1 bg-[hsl(220,30%,80%)]" />
    <span className="text-[hsl(220,30%,25%)]">◆</span>
    <div className="h-px flex-1 bg-[hsl(220,30%,80%)]" />
  </div>
);

const ThoughtLeadershipTab = () => {
  return (
    <div className="animate-fade-in">
      {/* Brunswick-branded infographic container */}
      <div className="rounded-xl border-2 border-[hsl(220,30%,25%)] bg-white shadow-xl overflow-hidden max-w-[900px] mx-auto">

        {/* Header Band */}
        <div className="bg-[hsl(220,30%,15%)] px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(220,40%,40%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(220,40%,40%) 0%, transparent 50%)" }} />
          <div className="relative z-10">
            <p className="text-[hsl(220,20%,70%)] text-xs uppercase tracking-[0.3em] mb-3 font-medium">Brunswick Group · Capital Markets Advisory</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              Saudi IPO Retail<br />Confidence Index
            </h1>
            <div className="w-12 h-0.5 bg-[hsl(45,80%,55%)] mx-auto mt-4 mb-3" />
            <p className="text-[hsl(220,15%,75%)] text-sm max-w-md mx-auto leading-relaxed">
              A proprietary quarterly benchmark tracking retail investor sentiment and participation in Saudi Main Market IPOs
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8">

          {/* What Is It */}
          <div className="text-center mb-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(220,30%,25%)] mb-3">What Is the Index?</h2>
            <p className="text-sm text-[hsl(220,15%,40%)] max-w-lg mx-auto leading-relaxed">
              A composite 0–100 score measuring the health of retail investor appetite for Saudi IPOs, 
              built from four data-driven pillars analysed across every Main Market listing.
            </p>
          </div>

          <SectionDivider />

          {/* Four Pillars */}
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(220,30%,25%)] mb-5 text-center">The Four Pillars</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            {[
              { icon: "📊", name: "Participation", weight: "30%", desc: "Retail subscription rates, coverage multiples & allocation patterns" },
              { icon: "📈", name: "Aftermarket", weight: "25%", desc: "Post-listing returns, abnormal performance & price stability" },
              { icon: "💬", name: "Sentiment", weight: "25%", desc: "Social media buzz, media coverage tone & search interest trends" },
              { icon: "🔍", name: "Engagement", weight: "20%", desc: "Prospectus downloads, roadshow attendance & digital engagement" },
            ].map((p) => (
              <div key={p.name} className="rounded-lg border border-[hsl(220,20%,85%)] bg-[hsl(220,20%,97%)] p-4 text-center">
                <span className="text-2xl block mb-2">{p.icon}</span>
                <p className="text-xs font-bold uppercase tracking-wider text-[hsl(220,30%,25%)] mb-0.5">{p.name}</p>
                <p className="text-lg font-bold text-[hsl(220,50%,45%)]">{p.weight}</p>
                <p className="text-[10px] text-[hsl(220,15%,50%)] mt-1 leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>

          <SectionDivider />

          {/* Publication Concept */}
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(220,30%,25%)] mb-5 text-center">Publication Concept</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-2">
            <div className="rounded-lg bg-[hsl(220,30%,15%)] p-5 text-center">
              <p className="text-[hsl(45,80%,55%)] text-xs font-bold uppercase tracking-wider mb-2">Format</p>
              <p className="text-white text-sm font-semibold mb-1">Quarterly PDF Report</p>
              <p className="text-[hsl(220,15%,65%)] text-[11px] leading-relaxed">
                8–12 page branded document with executive summary, pillar breakdowns, IPO-by-IPO analysis & forward outlook
              </p>
            </div>
            <div className="rounded-lg bg-[hsl(220,30%,15%)] p-5 text-center">
              <p className="text-[hsl(45,80%,55%)] text-xs font-bold uppercase tracking-wider mb-2">Distribution</p>
              <p className="text-white text-sm font-semibold mb-1">Multi-Channel Launch</p>
              <p className="text-[hsl(220,15%,65%)] text-[11px] leading-relaxed">
                Brunswick.com, LinkedIn article series, targeted media outreach & direct distribution to key capital markets stakeholders
              </p>
            </div>
            <div className="rounded-lg bg-[hsl(220,30%,15%)] p-5 text-center">
              <p className="text-[hsl(45,80%,55%)] text-xs font-bold uppercase tracking-wider mb-2">Cadence</p>
              <p className="text-white text-sm font-semibold mb-1">Quarterly + Special Editions</p>
              <p className="text-[hsl(220,15%,65%)] text-[11px] leading-relaxed">
                Regular quarterly releases aligned to IPO cycles, with special editions for landmark listings or market events
              </p>
            </div>
          </div>

          <SectionDivider />

          {/* Timeline */}
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(220,30%,25%)] mb-5 text-center">Indicative Roadmap</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[hsl(220,20%,82%)] hidden md:block" />
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-6">
              {[
                { phase: "Phase 1", time: "Q1 2026", title: "Data Foundation", items: ["Finalise methodology & weightings", "Backtest against 2024–25 IPO data", "Internal peer review & validation"] },
                { phase: "Phase 2", time: "Q2 2026", title: "Pilot Publication", items: ["Design branded report template", "Publish inaugural edition internally", "Gather feedback from KSA team"] },
                { phase: "Phase 3", time: "Q3 2026", title: "Soft Launch", items: ["Share with select clients & media", "LinkedIn thought leadership series", "Refine based on market feedback"] },
                { phase: "Phase 4", time: "Q4 2026", title: "Public Launch", items: ["Full public release on Brunswick.com", "Media briefing & PR campaign", "Establish as recurring benchmark"] },
              ].map((p, i) => (
                <div key={p.phase} className={`relative ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                  <div className={`inline-block rounded-lg border border-[hsl(220,20%,85%)] bg-[hsl(220,20%,97%)] p-4 text-left w-full`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(220,50%,45%)] bg-[hsl(220,50%,93%)] rounded px-2 py-0.5">{p.phase}</span>
                      <span className="text-[10px] font-medium text-[hsl(220,15%,55%)]">{p.time}</span>
                    </div>
                    <p className="text-sm font-bold text-[hsl(220,30%,25%)] mb-1.5">{p.title}</p>
                    <ul className="space-y-0.5">
                      {p.items.map((item, j) => (
                        <li key={j} className="text-[11px] text-[hsl(220,15%,45%)] flex items-start gap-1.5">
                          <span className="text-[hsl(45,80%,50%)] mt-px shrink-0">▸</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionDivider />

          {/* Strategic Value */}
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(220,30%,25%)] mb-5 text-center">Strategic Value for Brunswick</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Credential Building", desc: "Positions Brunswick as the definitive voice on Saudi IPO retail dynamics — a unique, data-led differentiator in the market." },
              { title: "Client Development", desc: "Creates a natural conversation-starter with pre-IPO companies and their advisers, demonstrating deep market understanding." },
              { title: "Media Platform", desc: "Generates recurring, newsworthy content that drives earned media coverage and builds brand visibility in the KSA capital markets ecosystem." },
              { title: "Talent & Culture", desc: "Showcases Brunswick's analytical capabilities and commitment to the Saudi market, supporting recruitment and team positioning." },
            ].map((v) => (
              <div key={v.title} className="flex items-start gap-3 p-3 rounded-lg border border-[hsl(220,20%,88%)]">
                <span className="text-[hsl(220,50%,45%)] mt-0.5 shrink-0 font-bold">◆</span>
                <div>
                  <p className="text-xs font-bold text-[hsl(220,30%,25%)] mb-0.5">{v.title}</p>
                  <p className="text-[11px] text-[hsl(220,15%,45%)] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-[hsl(220,20%,85%)] pt-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,60%)] font-medium">
              Brunswick Group · Riyadh · Indicative Concept · Confidential
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtLeadershipTab;
