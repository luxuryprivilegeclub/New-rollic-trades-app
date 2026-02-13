import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Activity, Calendar, RefreshCw,
  Brain, AlertCircle, Clock, ChevronDown, Gauge, ArrowUpRight,
  ArrowDownRight, Minus, Zap, Shield, DollarSign, BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockMacroIndicators } from '@/data/mockData';
import type { MacroIndicator } from '@/types';

/* ─── Gauge Meter Component ─── */
function GaugeMeter({
  value,
  min,
  max,
  label,
  unit,
  trend,
  size = 180,
}: {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  size?: number;
}) {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  const radius = size * 0.38;
  const cx = size / 2;
  const cy = size * 0.52;

  // Arc path for the gauge background
  const startAngle = -180;
  const endAngle = 0;
  const arcRadius = radius;

  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const startPt = polarToCartesian(cx, cy, arcRadius, startAngle);
  const endPt = polarToCartesian(cx, cy, arcRadius, endAngle);
  const fillAngle = startAngle + (percentage / 100) * (endAngle - startAngle);
  const fillPt = polarToCartesian(cx, cy, arcRadius, fillAngle);

  const bgArc = `M ${startPt.x} ${startPt.y} A ${arcRadius} ${arcRadius} 0 0 1 ${endPt.x} ${endPt.y}`;
  const fillArc = `M ${startPt.x} ${startPt.y} A ${arcRadius} ${arcRadius} 0 ${percentage > 50 ? 1 : 0} 1 ${fillPt.x} ${fillPt.y}`;

  // Needle endpoint
  const needleLen = arcRadius * 0.85;
  const needleAngle = -180 + (percentage / 100) * 180;
  const needlePt = polarToCartesian(cx, cy, needleLen, needleAngle);

  // Color based on zone
  const getColor = () => {
    if (percentage < 30) return { stroke: '#22c55e', glow: 'rgba(34,197,94,0.4)', text: 'text-emerald-400' };
    if (percentage < 60) return { stroke: '#f59e0b', glow: 'rgba(245,158,11,0.4)', text: 'text-amber-400' };
    return { stroke: '#ef4444', glow: 'rgba(239,68,68,0.4)', text: 'text-red-400' };
  };

  const color = getColor();

  const trendColor =
    trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.62} viewBox={`0 0 ${size} ${size * 0.62}`}>
        <defs>
          <filter id={`glow-${label.replace(/\s/g, '')}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`grad-${label.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path d={bgArc} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={size * 0.065} strokeLinecap="round" />

        {/* Filled arc */}
        <motion.path
          d={fillArc}
          fill="none"
          stroke={color.stroke}
          strokeWidth={size * 0.065}
          strokeLinecap="round"
          filter={`url(#glow-${label.replace(/\s/g, '')})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const tickAngle = -180 + (tick / 100) * 180;
          const innerPt = polarToCartesian(cx, cy, arcRadius + size * 0.045, tickAngle);
          const outerPt = polarToCartesian(cx, cy, arcRadius + size * 0.075, tickAngle);
          return (
            <line
              key={tick}
              x1={innerPt.x}
              y1={innerPt.y}
              x2={outerPt.x}
              y2={outerPt.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={needlePt.x}
          y2={needlePt.y}
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ x2: cx - needleLen, y2: cy }}
          animate={{ x2: needlePt.x, y2: needlePt.y }}
          transition={{ duration: 1.5, ease: 'easeOut', type: 'spring', damping: 15 }}
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={size * 0.028} fill="white" />
        <circle cx={cx} cy={cy} r={size * 0.015} fill={color.stroke} />

        {/* Value text */}
        <text x={cx} y={cy + size * 0.12} textAnchor="middle" fill="white" fontSize={size * 0.12} fontWeight="bold" fontFamily="monospace">
          {typeof value === 'number' && value > 1000 ? value.toLocaleString() : value}
          <tspan fontSize={size * 0.06} fill="rgba(255,255,255,0.5)">{unit}</tspan>
        </text>
      </svg>

      <div className="text-center mt-1">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        <div className={`flex items-center justify-center gap-1 mt-0.5 ${trendColor}`}>
          {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
          {trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
          {trend === 'neutral' && <Minus className="w-3 h-3" />}
          <span className="text-[10px] font-semibold uppercase">
            {trend === 'up' ? 'Rising' : trend === 'down' ? 'Falling' : 'Stable'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Mini Stat Card ─── */
function MiniStatCard({
  icon: Icon,
  label,
  value,
  color,
  subtext,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  subtext?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/10 rounded-2xl p-4 backdrop-blur-xl overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-3xl opacity-20 ${color}`} />
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.replace('bg-', 'bg-')}/20`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
          <p className={`text-lg font-bold ${color.replace('bg-', 'text-')}`}>{value}</p>
          {subtext && <p className="text-[10px] text-gray-600">{subtext}</p>}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Gauge Range Calculator ─── */
function getGaugeRange(code: string): { min: number; max: number } {
  switch (code) {
    case 'CPI': return { min: 0, max: 10 };
    case 'PCEPILFE': return { min: 0, max: 8 };
    case 'DGS10': return { min: 0, max: 8 };
    case 'DXY': return { min: 90, max: 115 };
    case 'COT_GOLD': return { min: 50000, max: 350000 };
    case 'FEDFUNDS': return { min: 0, max: 8 };
    default: return { min: 0, max: 100 };
  }
}

/* ─── Detail Sections Data ─── */
function getDetailAnalysis(indicator: MacroIndicator): {
  whatItIs: string;
  currentReading: string;
  marketImpact: string;
  goldImpact: string;
  usdImpact: string;
  tradingBias: string;
} {
  const change = indicator.current_value - indicator.previous_value;
  const changePercent = ((change / indicator.previous_value) * 100).toFixed(2);
  const direction = change > 0 ? 'increased' : change < 0 ? 'decreased' : 'remained unchanged';

  switch (indicator.code) {
    case 'CPI':
      return {
        whatItIs: 'The Consumer Price Index (CPI) measures the average change in prices paid by urban consumers for a basket of goods and services. It is the most widely followed inflation indicator and directly influences Federal Reserve monetary policy decisions.',
        currentReading: `CPI has ${direction} from ${indicator.previous_value}% to ${indicator.current_value}% (${change > 0 ? '+' : ''}${changePercent}% change). ${indicator.current_value > 3 ? 'This reading remains significantly above the Fed\'s 2% target, indicating persistent inflationary pressures in the economy.' : 'Inflation is moving closer to the Fed\'s 2% target, suggesting monetary policy may be having its intended effect.'}`,
        marketImpact: `${indicator.current_value > 3 ? 'Elevated CPI readings keep the Fed in a hawkish posture. Markets are repricing rate cut expectations further out. Bond yields may continue to rise as inflation expectations adjust upward.' : 'Lower CPI gives the Fed room to consider rate cuts. Risk assets may rally on expectation of easier monetary policy.'}`,
        goldImpact: `${indicator.gold_impact === 'bearish' ? '🔴 Bearish for Gold: Higher inflation paradoxically hurts gold in the short term because it leads to higher real yields and a stronger USD, both of which increase the opportunity cost of holding gold.' : indicator.gold_impact === 'bullish' ? '🟢 Bullish for Gold: If CPI falls sharply, expectations of rate cuts increase, which weakens the USD and reduces real yields — both supportive for gold prices.' : '🟡 Neutral for Gold: CPI inline with expectations means no significant shift in Fed policy expectations.'}`,
        usdImpact: `${indicator.usd_impact === 'bullish' ? '🟢 Bullish for USD: Higher CPI reinforces the "higher for longer" rate narrative, supporting the dollar through yield differentials against other currencies.' : indicator.usd_impact === 'bearish' ? '🔴 Bearish for USD: Lower CPI accelerates rate cut pricing, narrowing yield differentials and weakening dollar demand.' : '🟡 Neutral for USD: No policy shift expected from this reading.'}`,
        tradingBias: `${indicator.trend === 'up' ? 'With CPI rising, institutional bias is SHORT gold and LONG USD in the near term. Key levels to watch: Gold support at $2,020, DXY resistance at 105.00. Wait for next CPI release for potential trend change.' : 'Falling CPI creates opportunity for gold longs above $2,050 support with targets at $2,100. USD shorts may be premature until Fed officially pivots.'}`,
      };
    case 'PCEPILFE':
      return {
        whatItIs: 'Core Personal Consumption Expenditures (PCE) Price Index excludes volatile food and energy prices. This is the Federal Reserve\'s PREFERRED inflation gauge — it carries more weight than CPI in policy decisions.',
        currentReading: `Core PCE has ${direction} from ${indicator.previous_value}% to ${indicator.current_value}% (${change > 0 ? '+' : ''}${changePercent}% change). ${indicator.current_value > 2.5 ? 'Still above the Fed\'s 2% target. The Fed will likely maintain restrictive policy until this metric shows sustained decline toward 2%.' : 'Moving toward the 2% target. This gives the Fed confidence that their policy is working.'}`,
        marketImpact: `Core PCE is watched more closely by Fed officials than headline CPI. ${indicator.current_value > 2.5 ? 'Current reading suggests the "last mile" of inflation is proving sticky. Markets should expect rates to stay elevated through at least mid-2025.' : 'Progress toward target gives Fed cover to begin discussing rate cuts. Equity markets typically rally on this expectation.'}`,
        goldImpact: `${indicator.gold_impact === 'bearish' ? '🔴 Bearish for Gold: Sticky core inflation means higher real rates for longer. Gold struggles in high real yield environments. Institutional funds continue reducing gold allocations.' : '🟢 Bullish for Gold: Falling core PCE is the clearest signal for upcoming rate cuts. Gold historically rallies 15-20% in the 6 months leading up to rate cut cycles.'}`,
        usdImpact: `${indicator.usd_impact === 'bullish' ? '🟢 Bullish for USD: Persistent core inflation keeps US rates higher than peers (ECB, BOJ), driving capital flows into USD-denominated assets.' : '🔴 Bearish for USD: If core PCE declines, the rate differential advantage narrows, reducing USD demand.'}`,
        tradingBias: `${indicator.trend === 'up' ? 'Institutional positioning: Favor USD longs vs EUR and JPY. Gold shorts with tight stops above $2,080. Core PCE trend is the single most important metric to watch.' : 'Watch for potential gold breakout above $2,075 resistance. If core PCE drops below 2.5%, it could trigger a significant gold rally.'}`,
      };
    case 'DGS10':
      return {
        whatItIs: 'The 10-Year US Treasury Yield is the benchmark interest rate for the global financial system. It reflects market expectations for economic growth, inflation, and Fed policy over the next decade. It directly impacts mortgage rates, corporate borrowing, and asset valuations.',
        currentReading: `The 10Y yield has ${direction} from ${indicator.previous_value}% to ${indicator.current_value}%. ${indicator.current_value > 4.5 ? 'Yields above 4.5% represent the highest levels since 2007, reflecting expectations of sustained economic strength and persistent inflation.' : 'Yields are moderating, suggesting markets are pricing in slower growth or potential rate cuts.'}`,
        marketImpact: `${indicator.current_value > 4.5 ? 'High yields create significant headwinds for risk assets. Every 50bps rise in 10Y yields historically correlates with a 5-8% decline in equity valuations. Housing market feels pressure through higher mortgage rates (now above 7%).' : 'Lower yields provide tailwinds for equities, especially growth/tech stocks. Housing market may see relief.'}`,
        goldImpact: `${indicator.gold_impact === 'bearish' ? '🔴 Bearish for Gold: Rising yields are the #1 headwind for gold. The opportunity cost of holding non-yielding gold increases. Real yields (10Y minus inflation) are now positive, which historically correlates with gold weakness.' : '🟢 Bullish for Gold: Falling yields reduce the opportunity cost of holding gold. Watch for 10Y below 4.0% as a trigger for gold rally.'}`,
        usdImpact: `${indicator.usd_impact === 'bullish' ? '🟢 Bullish for USD: Higher Treasury yields attract foreign capital seeking better returns, increasing demand for USD. The US-German yield spread widening further supports EUR/USD downside.' : '🔴 Bearish for USD: Falling yields narrow the interest rate advantage, reducing foreign demand for US assets and dollars.'}`,
        tradingBias: `${indicator.trend === 'up' ? 'With 10Y yields rising, maintain bearish gold bias. Watch 4.75% as key resistance — a break above could push gold below $2,000. Short-term Treasury trades: sell rallies in TLT.' : 'If yields reverse from current levels, gold could see a quick $30-50 rally. Monitor the 2Y-10Y spread for recession signals.'}`,
      };
    case 'DXY':
      return {
        whatItIs: 'The US Dollar Index (DXY) measures the value of the US dollar against a basket of 6 major currencies (EUR 57.6%, JPY 13.6%, GBP 11.9%, CAD 9.1%, SEK 4.2%, CHF 3.6%). It is the primary gauge of overall USD strength in global markets.',
        currentReading: `DXY has ${direction} from ${indicator.previous_value} to ${indicator.current_value}. ${indicator.current_value > 104 ? 'The dollar is showing significant strength, driven by yield differentials and safe-haven flows. Key technical resistance at 105.00.' : 'Dollar is showing weakness, potentially signaling a shift in global capital flows.'}`,
        marketImpact: `${indicator.current_value > 104 ? 'Strong dollar creates headwinds for multinational corporate earnings (estimated 1-2% EPS drag per 1% DXY rise). Emerging market currencies and debt under pressure. Commodity prices face downward pressure.' : 'Weaker dollar supports commodity prices, EM assets, and US multinational earnings.'}`,
        goldImpact: `${indicator.gold_impact === 'bearish' ? '🔴 Bearish for Gold: Gold and USD have strong inverse correlation (-0.82 on 60-day basis). Strong DXY makes gold more expensive for non-USD buyers, reducing demand. Watch DXY 105 — break above likely pushes gold to test $2,000.' : '🟢 Bullish for Gold: Weak dollar makes gold cheaper globally, increasing demand. A break below DXY 100 could catalyze a major gold rally.'}`,
        usdImpact: `${indicator.usd_impact === 'bullish' ? '🟢 DXY IS the USD measure: Strength driven by Fed policy divergence vs ECB/BOJ. Carry trades favoring long USD. Technical momentum is bullish above 103.50 support.' : '🔴 DXY weakness indicates broad USD selling. Watch for central bank intervention rhetoric from Japan/China.'}`,
        tradingBias: `${indicator.trend === 'up' ? 'Institutional flow: Long USD vs EUR and JPY. Gold traders should maintain bearish bias while DXY stays above 103.50. Key risk: unexpected dovish Fed rhetoric could reverse DXY sharply.' : 'Potential dollar top forming. Watch for divergence between DXY and yields as early reversal signal.'}`,
      };
    case 'COT_GOLD':
      return {
        whatItIs: 'The Commitment of Traders (COT) Report shows positioning of major market participants in gold futures. "Managed Money" = hedge funds, "Commercials" = producers & banks. This data reveals what institutional "smart money" is actually doing, not just saying.',
        currentReading: `Net managed money positions have ${direction} from ${indicator.previous_value.toLocaleString()} to ${indicator.current_value.toLocaleString()} contracts. ${indicator.current_value < indicator.previous_value ? 'Hedge funds are REDUCING long positions, indicating declining bullish conviction among institutional speculators.' : 'Hedge funds are ADDING long positions, showing growing institutional demand for gold exposure.'}`,
        marketImpact: `COT positioning is a leading indicator — extreme readings often precede major reversals. ${indicator.current_value < 150000 ? 'Current positioning is relatively LOW, which historically means most selling is done. Contrarian bullish signal.' : indicator.current_value > 250000 ? 'Positioning is EXTREMELY long. Risk of sharp unwind if sentiment shifts. Historically, readings above 250K precede corrections.' : 'Positioning is in neutral territory. Follow trend until extremes develop.'}`,
        goldImpact: `${indicator.gold_impact === 'bearish' ? '🔴 Current Signal — Bearish: Managed money reducing longs while commercials (producers) increase hedging. This pattern typically precedes 3-5% gold declines over 2-4 weeks.' : '🟢 Current Signal — Bullish: Institutional accumulation underway. Smart money building positions ahead of expected catalyst (rate cuts, geopolitical risk).'}`,
        usdImpact: `${indicator.usd_impact === 'neutral' ? '🟡 Indirect Impact: COT gold positioning doesn\'t directly impact USD, but extreme positioning changes can signal broader risk sentiment shifts that affect currency markets.' : 'COT data showing alignment with USD trends — monitor for divergence signals.'}`,
        tradingBias: `${indicator.trend === 'down' ? 'Institutional de-risking in progress. Avoid catching falling knife. Wait for COT stabilization (2 consecutive weeks of position increases) before initiating gold longs. Current target: $2,020 support.' : 'Follow institutional flow. Position additions support gold upside. Trail stops below $2,030.'}`,
      };
    case 'FEDFUNDS':
      return {
        whatItIs: 'The Federal Funds Rate is the target interest rate set by the FOMC (Federal Open Market Committee) at which banks lend to each other overnight. This is THE most important rate in global finance — it directly influences ALL other interest rates, from mortgages to corporate bonds.',
        currentReading: `The Fed Funds Rate ${indicator.trend === 'neutral' ? 'remains unchanged' : direction} at ${indicator.current_value}%. ${indicator.current_value >= 5.25 ? 'This is the highest level since 2001. The Fed is maintaining maximum restrictive policy to combat inflation. Market is pricing approximately 2-3 rate cuts for 2025.' : 'Rates are below recent peaks, suggesting the Fed has begun its easing cycle.'}`,
        marketImpact: `${indicator.current_value >= 5.25 ? 'Restrictive policy is working through the economy with typical 12-18 month lag. Effects: higher borrowing costs, slower credit growth, housing market cooling, bank earnings compression. Every meeting where Fed holds is another month of tightening financial conditions.' : 'Lower rates stimulate borrowing, support asset prices, and ease financial conditions.'}`,
        goldImpact: `${indicator.gold_impact === 'bearish' ? '🔴 Bearish while rates hold high: Elevated rates mean high real yields, which are gold\'s kryptonite. However, gold often rallies 3-6 months BEFORE the first rate cut as markets price in the pivot.' : indicator.gold_impact === 'neutral' ? '🟡 Neutral — Pivoting: Stable rates mean the next move is likely DOWN. This transition period historically sees gold consolidation before a major rally.' : '🟢 Bullish: Rate cuts in progress. Gold typically rallies 15-25% during rate cut cycles.'}`,
        usdImpact: `${indicator.usd_impact === 'bullish' ? '🟢 Bullish for USD: High rates attract global capital. The US offers significantly higher yields than Europe (ECB ~4.0%) and Japan (BOJ ~0.25%), making USD the preferred carry trade currency.' : '🔴 Bearish: Rate cuts narrow yield advantage, reducing USD appeal.'}`,
        tradingBias: `${indicator.trend === 'neutral' ? 'Key question: When does the first cut come? Monitor Fed dot plot, inflation data, and employment. Position for gold longs 3-4 months before expected first cut. Currently: maintain neutral gold, long USD until clear pivot signal.' : indicator.trend === 'down' ? 'Cutting cycle has begun. Aggressively position for gold longs. Historical average gold return during cutting cycles: +18%.' : 'Rate hike cycle. Stay short gold, long USD until peak rate is confirmed.'}`,
      };
    default:
      return {
        whatItIs: `${indicator.name} (${indicator.code}) is an economic indicator sourced from ${indicator.source}.`,
        currentReading: `Current reading: ${indicator.current_value}${indicator.unit}. Previous: ${indicator.previous_value}${indicator.unit}.`,
        marketImpact: indicator.ai_impact_analysis,
        goldImpact: `Gold Impact: ${indicator.gold_impact}`,
        usdImpact: `USD Impact: ${indicator.usd_impact}`,
        tradingBias: `Follow trend direction for positioning.`,
      };
  }
}

/* ─── Main Macro Page Component ─── */
export function MacroPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lastRefresh] = useState(new Date());

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ━━━ Header ━━━ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-blue-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Macro Analysis Dashboard
              </h1>
            </div>
            <p className="text-gray-400 text-sm">
              Real-time economic indicators with institutional-grade AI analysis • Updated: {lastRefresh.toLocaleString()}
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all text-sm font-medium">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
        </div>

        {/* ━━━ Top Summary Strip ━━━ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <MiniStatCard icon={DollarSign} label="Overall Bias" value="USD Bullish" color="bg-emerald-500" subtext="Based on 6 indicators" />
          <MiniStatCard icon={Shield} label="Gold Outlook" value="Cautiously Bearish" color="bg-amber-500" subtext="Yields + DXY headwinds" />
          <MiniStatCard icon={Zap} label="Risk Sentiment" value="Risk-Off" color="bg-red-500" subtext="Defensive positioning" />
          <MiniStatCard icon={Calendar} label="Next High-Impact" value="CPI — 2 Days" color="bg-blue-500" subtext="Jan 25, 2025 • 08:30 ET" />
        </div>

        {/* ━━━ GAUGE METERS SECTION ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-bold text-white">Economic Indicator Gauges</h2>
                </div>
                <Badge variant="info" size="md">Live Data</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-4">
                {mockMacroIndicators.map((indicator, i) => {
                  const range = getGaugeRange(indicator.code);
                  return (
                    <motion.div
                      key={indicator.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      className="flex flex-col items-center cursor-pointer hover:bg-white/5 rounded-2xl p-3 transition-colors"
                      onClick={() => setExpandedId(expandedId === indicator.id ? null : indicator.id)}
                    >
                      <GaugeMeter
                        value={indicator.current_value}
                        min={range.min}
                        max={range.max}
                        label={indicator.code}
                        unit={indicator.unit}
                        trend={indicator.trend}
                        size={160}
                      />
                      <div className="flex gap-1.5 mt-2">
                        <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${indicator.gold_impact === 'bullish' ? 'bg-emerald-500/20 text-emerald-400' : indicator.gold_impact === 'bearish' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          Au {indicator.gold_impact === 'bullish' ? '↑' : indicator.gold_impact === 'bearish' ? '↓' : '—'}
                        </span>
                        <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${indicator.usd_impact === 'bullish' ? 'bg-emerald-500/20 text-emerald-400' : indicator.usd_impact === 'bearish' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          $ {indicator.usd_impact === 'bullish' ? '↑' : indicator.usd_impact === 'bearish' ? '↓' : '—'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ━━━ MAIN CONTENT: Detailed Cards + Side Panel ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Indicator Detail Cards ── */}
          <div className="lg:col-span-2 space-y-4">
            {mockMacroIndicators.map((indicator, i) => {
              const isExpanded = expandedId === indicator.id;
              const detail = getDetailAnalysis(indicator);
              const change = indicator.current_value - indicator.previous_value;
              const changeStr = change > 0 ? `+${indicator.code === 'COT_GOLD' ? change.toLocaleString() : change.toFixed(2)}` : `${indicator.code === 'COT_GOLD' ? change.toLocaleString() : change.toFixed(2)}`;

              return (
                <motion.div
                  key={indicator.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card
                    className={`transition-all duration-300 ${isExpanded ? 'ring-1 ring-blue-500/50 shadow-lg shadow-blue-500/10' : 'hover:border-white/20'}`}
                  >
                    <CardContent className="p-0">
                      {/* Clickable Header */}
                      <div
                        className="flex items-center justify-between p-5 cursor-pointer"
                        onClick={() => setExpandedId(isExpanded ? null : indicator.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                            indicator.trend === 'up' ? 'bg-emerald-500/15 ring-1 ring-emerald-500/20' :
                            indicator.trend === 'down' ? 'bg-red-500/15 ring-1 ring-red-500/20' :
                            'bg-gray-500/15 ring-1 ring-gray-500/20'
                          }`}>
                            {indicator.trend === 'up' && <TrendingUp className="w-6 h-6 text-emerald-400" />}
                            {indicator.trend === 'down' && <TrendingDown className="w-6 h-6 text-red-400" />}
                            {indicator.trend === 'neutral' && <Activity className="w-6 h-6 text-gray-400" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base">{indicator.name}</h3>
                            <p className="text-sm text-gray-500">{indicator.code} • {indicator.source}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="text-right hidden sm:block">
                            <div className="text-2xl font-bold text-white font-mono">
                              {indicator.code === 'COT_GOLD' ? indicator.current_value.toLocaleString() : indicator.current_value}
                              <span className="text-sm text-gray-500 ml-1">{indicator.unit}</span>
                            </div>
                            <div className={`text-sm font-semibold ${change > 0 ? 'text-emerald-400' : change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                              {changeStr}{indicator.unit} vs prev
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5 hidden md:flex">
                            <Badge
                              className={`text-[10px] ${indicator.gold_impact === 'bullish' ? 'bg-emerald-500/20 text-emerald-400' : indicator.gold_impact === 'bearish' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}
                              size="sm"
                            >
                              Gold: {indicator.gold_impact.toUpperCase()}
                            </Badge>
                            <Badge
                              className={`text-[10px] ${indicator.usd_impact === 'bullish' ? 'bg-emerald-500/20 text-emerald-400' : indicator.usd_impact === 'bearish' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}
                              size="sm"
                            >
                              USD: {indicator.usd_impact.toUpperCase()}
                            </Badge>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* Mobile Values */}
                      <div className="sm:hidden px-5 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-white font-mono">
                            {indicator.code === 'COT_GOLD' ? indicator.current_value.toLocaleString() : indicator.current_value}{indicator.unit}
                          </div>
                          <div className={`text-sm font-semibold ${change > 0 ? 'text-emerald-400' : change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                            {changeStr}{indicator.unit}
                          </div>
                        </div>
                      </div>

                      {/* ━━━ EXPANDED DETAIL SECTION ━━━ */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 p-5 space-y-4">

                              {/* What It Is */}
                              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                                  </div>
                                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">What Is {indicator.code}?</h4>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">{detail.whatItIs}</p>
                              </div>

                              {/* Current Reading */}
                              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                                  </div>
                                  <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Current Reading Analysis</h4>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">{detail.currentReading}</p>
                              </div>

                              {/* Market Impact */}
                              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                                  </div>
                                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Broader Market Impact</h4>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">{detail.marketImpact}</p>
                              </div>

                              {/* Gold + USD Impact Side by Side */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                                    </div>
                                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Gold Impact</h4>
                                  </div>
                                  <p className="text-sm text-gray-300 leading-relaxed">{detail.goldImpact}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">USD Impact</h4>
                                  </div>
                                  <p className="text-sm text-gray-300 leading-relaxed">{detail.usdImpact}</p>
                                </div>
                              </div>

                              {/* AI Trading Bias */}
                              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <Brain className="w-3.5 h-3.5 text-blue-400" />
                                  </div>
                                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">AI Trading Bias & Institutional View</h4>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">{detail.tradingBias}</p>
                              </div>

                              {/* Next Release */}
                              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-400">
                                  <span className="text-gray-500">Next Release:</span>{' '}
                                  <span className="text-white font-medium">
                                    {typeof indicator.next_release === 'string' && indicator.next_release.includes('T')
                                      ? new Date(indicator.next_release).toLocaleString('en-US', {
                                          weekday: 'long',
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          timeZoneName: 'short',
                                        })
                                      : indicator.next_release}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-6">

            {/* AI Market Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-400" />
                    AI Market Summary
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                    <div>
                      <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Current Environment</p>
                      <p>The macro backdrop remains challenging for gold with rising real yields and persistent USD strength. CPI and Core PCE both trending above Fed targets.</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Key Drivers</p>
                      <p>CPI at {mockMacroIndicators[0]?.current_value}% and Core PCE at {mockMacroIndicators[1]?.current_value}% keep the Fed hawkish. 10Y yields at {mockMacroIndicators[2]?.current_value}% increase opportunity cost for gold. DXY at {mockMacroIndicators[3]?.current_value} reflects broad USD strength.</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Institutional Bias</p>
                      <p>Short-term: <span className="text-red-400 font-semibold">Bearish Gold</span>, <span className="text-emerald-400 font-semibold">Bullish USD</span>. Medium-term: Watch for CPI inflection as potential catalyst for gold reversal.</p>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-[10px] text-gray-600">Analysis generated from 6 macro indicators • Last updated: {new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    Economic Calendar
                  </h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { event: 'FOMC Minutes', date: 'Jan 22', impact: 'high', time: '14:00 ET' },
                    { event: 'US CPI (YoY)', date: 'Jan 25', impact: 'high', time: '08:30 ET' },
                    { event: 'PCE Price Index', date: 'Jan 31', impact: 'high', time: '08:30 ET' },
                    { event: 'FOMC Rate Decision', date: 'Jan 29', impact: 'high', time: '14:00 ET' },
                    { event: 'NFP Report', date: 'Feb 7', impact: 'high', time: '08:30 ET' },
                  ].map((event, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${event.impact === 'high' ? 'bg-red-400 shadow-lg shadow-red-500/50' : 'bg-amber-400'}`} />
                        <div>
                          <span className="text-white text-sm font-medium">{event.event}</span>
                          <p className="text-[10px] text-gray-600">{event.time}</p>
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs font-medium">{event.date}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Risk Alert */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-400 mb-1">⚠️ Volatility Alert</p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        High-impact CPI release in <span className="text-white font-bold">2 days</span>. Historical volatility: Gold moves ±$25-40 on CPI surprises. Reduce position sizes and widen stops before release.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <span className="text-[10px] px-2 py-1 rounded-full bg-red-500/20 text-red-400 font-semibold">HIGH RISK</span>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 font-semibold">REDUCE SIZE</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Correlation Matrix */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    Key Correlations
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { pair: 'Gold vs DXY', corr: -0.82, label: 'Strong Inverse' },
                    { pair: 'Gold vs 10Y Yield', corr: -0.71, label: 'Inverse' },
                    { pair: 'Gold vs CPI', corr: 0.45, label: 'Moderate Positive' },
                    { pair: 'DXY vs Fed Rate', corr: 0.88, label: 'Strong Positive' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{item.pair}</span>
                        <span className={`text-xs font-bold ${item.corr > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.corr > 0 ? '+' : ''}{item.corr}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${item.corr > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.abs(item.corr) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
