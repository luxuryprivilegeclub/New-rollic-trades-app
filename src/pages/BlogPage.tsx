import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { mockBlogPosts } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      {/* Hero */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Research & Insights
            </h1>
            <p className="text-xl text-gray-400">
              Market analysis, trading strategies, and platform updates from our research team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden" hover>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-600/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/20">Featured</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="info">Featured</Badge>
                    <Badge>Research</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {mockBlogPosts[0]?.title || 'Understanding Market Cycles in 2025'}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    {mockBlogPosts[0]?.excerpt || 'A comprehensive guide to navigating market cycles in the current economic environment.'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Research Team
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Jan 15, 2025
                      </span>
                    </div>
                    <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Gold vs Bitcoin: The Safe Haven Debate',
                excerpt: 'Analyzing the role of gold and bitcoin as safe haven assets.',
                tags: ['Gold', 'Bitcoin'],
                date: 'Jan 10, 2025',
              },
              {
                title: 'Reading COT Reports Like a Pro',
                excerpt: 'How to interpret Commitment of Traders data for trading edge.',
                tags: ['Education', 'COT'],
                date: 'Jan 8, 2025',
              },
              {
                title: 'Fed Policy Impact on Commodities',
                excerpt: 'Understanding how monetary policy affects commodity markets.',
                tags: ['Macro', 'Fed'],
                date: 'Jan 5, 2025',
              },
              {
                title: 'Technical Analysis: Support & Resistance',
                excerpt: 'Mastering key levels for better trade entries and exits.',
                tags: ['Technical', 'Education'],
                date: 'Jan 3, 2025',
              },
              {
                title: 'DXY Correlation Trading Strategies',
                excerpt: 'Trading gold and forex using dollar index correlations.',
                tags: ['Strategy', 'DXY'],
                date: 'Dec 28, 2024',
              },
              {
                title: 'Risk Management Fundamentals',
                excerpt: 'Position sizing and risk control for consistent returns.',
                tags: ['Risk', 'Education'],
                date: 'Dec 22, 2024',
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full flex flex-col" hover>
                  <div className="h-40 bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/10">{i + 1}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex gap-2 mb-3">
                      {post.tags.map((tag, j) => (
                        <Badge key={j} size="sm">{tag}</Badge>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{post.date}</span>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-400 mb-6">
              Get weekly market insights and trading ideas delivered to your inbox
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
