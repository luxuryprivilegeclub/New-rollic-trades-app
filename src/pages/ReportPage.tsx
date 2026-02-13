import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Calendar, ChevronDown, Clock, Bell, Download, Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockReports } from '@/data/mockData';
import type { ReportModule } from '@/types';

interface ReportPageProps {
  module: ReportModule;
}

const moduleInfo: Record<ReportModule, { title: string; description: string; color: string }> = {
  money_flow: { title: 'Money Flow Track', description: 'Institutional flow analysis and fund movements', color: 'from-green-500 to-emerald-500' },
  oi_analyzer: { title: 'OI Analyzer', description: 'Open interest and positioning analytics', color: 'from-purple-500 to-pink-500' },
  gold_intelligence: { title: 'Gold Intelligence', description: 'Comprehensive gold market reports', color: 'from-yellow-500 to-orange-500' },
  forex_intelligence: { title: 'Forex Intelligence', description: 'Currency market analysis and forecasts', color: 'from-indigo-500 to-purple-500' },
  btc_intelligence: { title: 'BTC Intelligence', description: 'Cryptocurrency market insights', color: 'from-orange-500 to-red-500' },
  sp500_report: { title: 'S&P 500 Report', description: 'Equity index analysis and outlook', color: 'from-red-500 to-pink-500' },
  expert_learning: { title: 'Expert Learning', description: 'Trading education and strategies', color: 'from-teal-500 to-cyan-500' },
};

export function ReportPage({ module }: ReportPageProps) {
  const [selectedDate, setSelectedDate] = useState('today');
  const info = moduleInfo[module];
  const reports = mockReports[module] || [];

  const dates = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '2days', label: '2 Days Ago' },
    { value: '3days', label: '3 Days Ago' },
    { value: '4days', label: '4 Days Ago' },
  ];

  // Sample report content
  const sampleReport = reports[0] || {
    title: `${info.title} Report`,
    content: `
      <div class="space-y-6">
        <h2 class="text-xl font-bold text-white">Executive Summary</h2>
        <p class="text-gray-300">
          Today's analysis reveals significant institutional activity with notable shifts in positioning.
          Key findings indicate a developing trend that warrants close attention from traders.
        </p>
        
        <h3 class="text-lg font-semibold text-white mt-6">Key Observations</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-300">
          <li>Institutional flows showing accumulation patterns</li>
          <li>Technical levels aligning with fundamental drivers</li>
          <li>Sentiment indicators suggesting potential reversal</li>
          <li>Correlation analysis highlights divergence opportunities</li>
        </ul>
        
        <h3 class="text-lg font-semibold text-white mt-6">Market Metrics</h3>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="p-4 rounded-lg bg-white/5">
            <p class="text-sm text-gray-500">Weekly Change</p>
            <p class="text-xl font-bold text-emerald-400">+2.34%</p>
          </div>
          <div class="p-4 rounded-lg bg-white/5">
            <p class="text-sm text-gray-500">Volume</p>
            <p class="text-xl font-bold text-blue-400">$1.2B</p>
          </div>
          <div class="p-4 rounded-lg bg-white/5">
            <p class="text-sm text-gray-500">Net Flow</p>
            <p class="text-xl font-bold text-emerald-400">+$420M</p>
          </div>
          <div class="p-4 rounded-lg bg-white/5">
            <p class="text-sm text-gray-500">Sentiment</p>
            <p class="text-xl font-bold text-amber-400">Neutral</p>
          </div>
        </div>
        
        <h3 class="text-lg font-semibold text-white mt-6">Trading Implications</h3>
        <p class="text-gray-300">
          Based on current analysis, we maintain a cautiously bullish stance with defined risk parameters.
          Key support levels should be monitored for potential entry opportunities.
        </p>
        
        <div class="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p class="text-sm font-medium text-blue-400 mb-2">AI Insight</p>
          <p class="text-gray-300">
            Current positioning suggests smart money is gradually accumulating. Historical patterns
            indicate similar setups have led to significant moves within 2-3 weeks.
          </p>
        </div>
      </div>
    `,
    published_at: new Date().toISOString(),
    version: 1,
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center`}>
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{info.title}</h1>
              <p className="text-gray-400">{info.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Date Selector */}
            <div className="relative">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {dates.map((date) => (
                  <option key={date.value} value={date.value} className="bg-gray-900">
                    {date.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            
            <Badge variant="success" size="md">
              <Clock className="w-3 h-3 mr-1" />
              Updated {new Date().toLocaleTimeString()}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Report Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-white font-medium">{sampleReport.title}</span>
              </div>
              <Badge size="sm">Version {sampleReport.version}</Badge>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: sampleReport.content }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Version History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <h3 className="text-white font-medium">Version History</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3].map((v) => (
                  <div 
                    key={v}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      v === 1 ? 'bg-blue-500/10 border border-blue-500/20' : 'hover:bg-white/5'
                    } cursor-pointer transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-white">Version {4 - v}</span>
                      {v === 1 && <Badge variant="info" size="sm">Current</Badge>}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(Date.now() - v * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Custom Footer */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-sm text-gray-500">
            This report is for informational purposes only and does not constitute financial advice.
            Always conduct your own research before making trading decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
