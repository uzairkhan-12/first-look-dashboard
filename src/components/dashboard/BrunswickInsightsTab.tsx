import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const insights = [
  {
    id: "timing",
    title: "1. IPO Timing & Market Window",
    icon: "📅",
    keyFinding: "2024–25 data shows significant clustering of IPOs in Q4 and Q2, with aftermarket performance varying sharply by market conditions at listing.",
    recommendations: [
      "Monitor TASI momentum in the 60 days pre-launch — IPOs listed during upward TASI trends show stronger 3M aftermarket performance.",
      "Avoid launching immediately after a large-cap IPO; investor fatigue and capital reallocation can suppress retail demand.",
      "Build a 6–9 month pre-IPO communications runway to ensure brand awareness peaks at the right window.",
      "Prepare a 'launch-ready' posture so you can accelerate or delay based on market conditions without losing narrative momentum.",
    ],
  },
  {
    id: "retail",
    title: "2. Retail Investor Engagement",
    icon: "👥",
    keyFinding: "Retail coverage multiples range from 0.6x to 67x — the gap between under-subscribed and over-subscribed IPOs is driven largely by brand familiarity and perceived growth story.",
    recommendations: [
      "Start consumer-facing communications 6+ months before IPO to build brand recognition among retail investors.",
      "Leverage Arabic-language social media (X/Twitter, financial forums like Argaam) as primary channels — retail sentiment forms here before institutional roadshows.",
      "Simplify the equity story into 2–3 clear themes that resonate with non-professional investors (e.g., 'Saudi champion', 'dividend growth', 'sector leader').",
      "Consider retail investor education content (infographics, short videos) explaining sector dynamics and company positioning.",
      "Track social media sentiment weekly in the pre-IPO period and prepare rapid-response messaging for negative narratives.",
    ],
  },
  {
    id: "institutional",
    title: "3. Institutional Positioning",
    icon: "🏛️",
    keyFinding: "Institutional demand (SAR Mn) varies by 50x+ across IPOs. High institutional coverage correlates with stronger aftermarket performance and lower probability of trading below issue price.",
    recommendations: [
      "Engage top-tier institutional investors 9–12 months pre-IPO through private briefings and relationship-building.",
      "Develop a detailed, data-rich institutional presentation that addresses sector-specific risks and competitive positioning.",
      "Secure 2–3 cornerstone investors early to signal quality and anchor the book — this has a multiplier effect on broader institutional demand.",
      "Tailor messaging by investor type: sovereign wealth funds prioritise alignment with Vision 2030; international funds focus on governance and growth metrics.",
      "Prepare detailed ESG and governance narratives — these are increasingly table-stakes for institutional allocation decisions.",
    ],
  },
  {
    id: "pricing",
    title: "4. Pricing & Valuation Narrative",
    icon: "💰",
    keyFinding: "IPOs priced at a perceived discount to fair value show 2–3x higher retail coverage multiples. Several 2024–25 IPOs that priced aggressively saw negative 3M abnormal returns.",
    recommendations: [
      "Frame pricing as 'attractive entry point' rather than 'discount' — protect the company's valuation narrative for post-listing IR.",
      "Provide clear peer comparisons in investor materials to anchor valuation expectations.",
      "If pricing at the upper end of the range, ensure the growth narrative is exceptionally well-supported with data points.",
      "Prepare post-pricing communications that reinforce value — the 48 hours after price announcement are critical for retail sentiment.",
    ],
  },
  {
    id: "aftermarket",
    title: "5. Aftermarket Communications",
    icon: "📈",
    keyFinding: "Several IPOs with strong first-day pops experienced significant reversals by 3M and 6M. Companies that maintained active IR communications showed more resilient aftermarket performance.",
    recommendations: [
      "Launch a structured IR programme on Day 1 — don't wait for the first earnings cycle.",
      "Issue a 'first 30 days' update to maintain momentum and signal management accessibility.",
      "Prepare defensive messaging for potential price declines — having a plan prevents reactive, damaging communications.",
      "Schedule management visibility (conferences, media interviews, analyst meetings) in the first 90 days post-listing.",
      "Monitor and engage with retail investor communities actively in the first quarter post-IPO.",
    ],
  },
  {
    id: "sector",
    title: "6. Sector-Specific Considerations",
    icon: "🏗️",
    keyFinding: "Sector dynamics significantly influence investor appetite. Food & Beverages and Financial Services IPOs attracted strong demand; niche industrial names required more investor education.",
    recommendations: [
      "For consumer-facing sectors: leverage brand equity and customer base as a natural retail investor pipeline.",
      "For B2B/industrial sectors: invest more heavily in institutional education and thought leadership to build the investment case.",
      "For real estate: emphasise Vision 2030 alignment, giga-project exposure, and recurring revenue models.",
      "For healthcare & services: highlight demographic tailwinds and regulatory moats specific to Saudi Arabia.",
      "For financial services: address regulatory landscape clearly and position within the broader fintech/digitalisation narrative.",
    ],
  },
  {
    id: "media",
    title: "7. Media & Stakeholder Strategy",
    icon: "📰",
    keyFinding: "IPOs with coordinated media strategies across Arabic and English channels showed stronger institutional and retail engagement metrics.",
    recommendations: [
      "Develop a dual-language media strategy — Arabic for retail reach, English for international institutional audiences.",
      "Brief key financial journalists and analysts 4–6 weeks before the public announcement.",
      "Prepare the CEO and CFO for media appearances with clear, consistent messaging and rehearsed Q&A.",
      "Create a digital newsroom with all IPO materials, fact sheets, and high-quality visuals available for media use.",
      "Plan a post-listing media tour to sustain coverage beyond the initial IPO news cycle.",
    ],
  },
  {
    id: "risk",
    title: "8. Risk & Crisis Preparedness",
    icon: "🛡️",
    keyFinding: "Market volatility, negative social media sentiment, and competitor actions have disrupted IPO timelines and aftermarket performance for several 2024–25 listings.",
    recommendations: [
      "Develop a comprehensive issues and crisis playbook specific to the IPO process.",
      "Map potential risk scenarios (market downturn, regulatory delays, negative media, social media attacks) with pre-approved response protocols.",
      "Establish a war room structure for the IPO period with clear escalation paths and decision-making authority.",
      "Monitor competitor activity and be prepared to differentiate if a peer announces an IPO in a similar timeframe.",
      "Stress-test all public disclosures and marketing materials for legal and reputational risk before publication.",
    ],
  },
];

const BrunswickInsightsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="text-primary text-xl">◆</span> Brunswick Insights: IPO Communications Playbook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Practical communications recommendations for companies considering a Main Market IPO in Saudi Arabia, 
            derived from analysis of 25 IPOs across 2024–2025 including demand dynamics, aftermarket performance, 
            retail participation patterns, and market sentiment indicators.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
              Based on 25 IPOs
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
              2024–2025 Data
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
              8 Strategic Themes
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Insights Accordion */}
      <Accordion type="multiple" defaultValue={["timing", "retail"]} className="space-y-3">
        {insights.map((insight) => (
          <AccordionItem key={insight.id} value={insight.id} className="border border-border rounded-lg px-4 bg-card">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3 text-left">
                <span className="text-lg">{insight.icon}</span>
                <span className="text-sm font-semibold text-foreground">{insight.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pb-2">
                {/* Key Finding */}
                <div className="rounded-md bg-muted/50 border border-border p-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Key Data Finding</p>
                  <p className="text-sm text-foreground leading-relaxed">{insight.keyFinding}</p>
                </div>

                {/* Recommendations */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Recommendations</p>
                  <ul className="space-y-2">
                    {insight.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
                        <span className="text-primary mt-0.5 shrink-0">▸</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Disclaimer */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold">Disclaimer:</span> These insights are based on publicly available market data from 2024–2025 Saudi Main Market IPOs and are intended for general informational purposes only. 
          They do not constitute financial, legal, or investment advice. Companies should consult with their professional advisers before making IPO-related decisions.
        </p>
      </div>
    </div>
  );
};

export default BrunswickInsightsTab;
