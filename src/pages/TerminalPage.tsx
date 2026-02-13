import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, 
  Newspaper, Calculator, Brain, Zap, LineChart, Bitcoin,
  Globe, BookOpen, PieChart, Coins
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockMacroIndicators, mockNews } from '@/data/mockData';

interface TerminalPageProps {
  onNavigate: (page: string) => void;
}

export function TerminalPage({ onNavigate }: TerminalPageProps) {
  const toolkitModules = [
    { id: 'macro', name: 'Macro Analysis', icon: Activity, description: 'FRED Data & AI Analysis', color: 'from-blue-500 to-cyan-500' },
    { id: 'money_flow', name: 'Money Flow Track', icon: DollarSign, description: 'Institutional Flow Analysis', color: 'from-green-500 to-emerald-500' },
    { id: 'oi_analyzer', name: 'OI Analyzer', icon: BarChart3, description: 'Open Interest Analytics', color: 'from-purple-500 to-pink-500' },
    { id: 'gold_intelligence', name: 'Gold Intelligence', icon: Coins, description: 'Gold Market Reports', color: 'from-yellow-500 to-orange-500' },
    { id: 'forex_intelligence', name: 'Forex Intelligence', icon: Globe, description: 'Currency Market Analysis', color: 'from-indigo-500 to-purple-500' },
    { id: 'btc_intelligence', name: 'BTC Intelligence', icon: Bitcoin, description: 'Crypto Market Reports', color: 'from-orange-500 to-red-500' },
    { id: 'sp500_report', name: 'S&P 500 Report', icon: LineChart, description: 'Equity Index Analysis', color: 'from-red-500 to-pink-500' },
    { id: 'expert_learning', name: 'Expert Learning', icon: BookOpen, description: 'Trading Education', color: 'from-teal-500 to-cyan-500' },
    { id: 'news', name: 'Market News', icon: Newspaper, description: 'AI-Processed News Feed', color: 'from-sky-500 to-blue-500' },
    { id: 'risk_calculator', name: 'Risk Calculator', icon: Calculator, description: 'Position Sizing Tool', color: 'from-gray-500 to-slate-500' },
  ];

  const miniCharts = [
    { name: 'XAUUSD', value: '2,045.30', change: '+0.42%', positive: true },
    { name: 'DXY', value: '104.25', change: '-0.18%', positive: false },
    { name: 'US10Y', value: '4.65%', change: '+0.08%', positive: true },
    { name: 'EURUSD', value: '1.0842', change: '+0.25%', positive: true },
    { name: 'BTC/USD', value: '43,250', change: '-1.24%', positive: false },
    { name: 'SPX', value: '4,892', change: '+0.35%', positive: true },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      {/* Ticker Widget */}
      <div className="bg-gray-900/80 border-b border-white/10 py-2 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {[...miniCharts, ...miniCharts].map((chart, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">{chart.name}</span>
              <span className="text-white font-medium">{chart.value}</span>
              <span className={chart.positive ? 'text-emerald-400' : 'text-red-400'}>
                {chart.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mini Charts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {miniCharts.map((chart, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{chart.name}</span>
                  {chart.positive ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div className="text-lg font-semibold text-white">{chart.value}</div>
                <div className={`text-sm ${chart.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {chart.change}
                </div>
                {/* Mini chart visualization */}
                <div className="mt-2 h-8 flex items-end gap-0.5">
                  {Array.from({ length: 12 }).map((_, j) => (
                    <div
                      key={j}
                      className={`flex-1 rounded-sm ${chart.positive ? 'bg-emerald-500/30' : 'bg-red-500/30'}`}
                      style={{ height: `${20 + Math.random() * 80}%` }}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Trader Toolkit</h2>
            <p className="text-sm text-gray-400">Access all research modules and tools</p>
          </div>
        </div>

        {/* Toolkit Modules Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {toolkitModules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => onNavigate(module.id)}
              className="cursor-pointer group"
            >
              <Card className="relative overflow-hidden h-full" glow>
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    <module.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1 text-sm">{module.name}</h3>
                  <p className="text-xs text-gray-400">{module.description}</p>
                </CardContent>
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats & Latest News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Macro Indicators Summary */}
          <Card className="lg:col-span-2">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-400" />
                  Key Macro Indicators
                </h3>
                <button 
                  onClick={() => onNavigate('macro')}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  View All →
                </button>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {mockMacroIndicators.slice(0, 4).map((indicator, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        indicator.trend === 'up' ? 'bg-emerald-500/20' : 
                        indicator.trend === 'down' ? 'bg-red-500/20' : 'bg-gray-500/20'
                      }`}>
                        {indicator.trend === 'up' ? (
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                        ) : indicator.trend === 'down' ? (
                          <TrendingDown className="w-5 h-5 text-red-400" />
                        ) : (
                          <Activity className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">{indicator.name}</div>
                        <div className="text-xs text-gray-500">{indicator.code}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        {indicator.current_value}{indicator.unit}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={indicator.gold_impact === 'bullish' ? 'success' : indicator.gold_impact === 'bearish' ? 'danger' : 'default'}
                          size="sm"
                        >
                          Gold: {indicator.gold_impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Latest News */}
          <Card>
            <div className="p-6 border-b border-white/10">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-400" />
                Latest News
              </h3>
            </div>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {mockNews.slice(0, 4).map((news, i) => (
                  <div key={i} className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Badge 
                        variant={news.impact === 'high' ? 'danger' : news.impact === 'medium' ? 'warning' : 'info'}
                        size="sm"
                      >
                        {news.impact}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white line-clamp-2">{news.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(news.published_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">AI Trading Assistant</h3>
                  <p className="text-gray-400 text-sm">
                    Get instant analysis of macro conditions, report summaries, and trading bias reasoning. 
                    Your personal institutional research desk.
                  </p>
                </div>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all whitespace-nowrap">
                  Ask AI
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
