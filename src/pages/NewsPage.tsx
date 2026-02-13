import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, Clock, TrendingUp, Filter, Search, RefreshCw, Brain
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockNews } from '@/data/mockData';

export function NewsPage() {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = mockNews.filter(news => {
    if (filter !== 'all' && news.impact !== filter) return false;
    if (searchQuery && !news.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <Newspaper className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Market News</h1>
              <p className="text-gray-400">AI-processed market news and analysis</p>
            </div>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            {(['all', 'high', 'medium', 'low'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* News Feed */}
        <div className="space-y-4">
          {filteredNews.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-400">No news found matching your criteria.</p>
            </Card>
          ) : (
            filteredNews.map((news, i) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="hover:border-white/20 transition-colors cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        news.impact === 'high' ? 'bg-red-500/20' :
                        news.impact === 'medium' ? 'bg-amber-500/20' : 'bg-blue-500/20'
                      }`}>
                        <TrendingUp className={`w-6 h-6 ${
                          news.impact === 'high' ? 'text-red-400' :
                          news.impact === 'medium' ? 'text-amber-400' : 'text-blue-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-white">{news.title}</h3>
                          <Badge variant={getImpactColor(news.impact)} size="sm">
                            {news.impact}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-3">{news.summary}</p>
                        
                        {news.ai_analysis && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-3">
                            <Brain className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-300">{news.ai_analysis}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {news.assets.map((asset, j) => (
                              <Badge key={j} size="sm">{asset}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            {new Date(news.published_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">
            Load More News
          </button>
        </div>
      </div>
    </div>
  );
}
