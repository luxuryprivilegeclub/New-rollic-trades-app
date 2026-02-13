import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Shield, Zap, Globe, TrendingUp, Brain, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: BarChart3,
      title: 'Macro Analysis',
      description: 'Real-time FRED data with AI-powered market impact analysis',
    },
    {
      icon: Brain,
      title: 'AI Trading Assistant',
      description: 'Context-aware AI that understands your dashboard and reports',
    },
    {
      icon: TrendingUp,
      title: 'Money Flow Tracking',
      description: 'Track institutional flows and positioning in real-time',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with RLS and session fingerprinting',
    },
    {
      icon: Zap,
      title: 'Real-time Alerts',
      description: 'Instant notifications for report updates and market events',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Gold, Forex, Crypto, and Indices intelligence reports',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
              Institutional-Grade Trading Intelligence
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Trade Like
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {' '}Wall Street
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Professional trading research terminal with real-time macro analysis, 
              AI-powered insights, and institutional-grade market intelligence. 
              Everything you need to make informed trading decisions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => onNavigate('terminal')}>
                Access Data Terminal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => onNavigate('about')}>
                Learn More
              </Button>
            </div>

            {/* Admin Panel Quick Access */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <button
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300 hover:text-white hover:border-indigo-400/50 transition-all text-sm font-medium"
              >
                <Settings className="w-4 h-4" />
                Open Admin Panel (Content Management)
              </button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '50+', label: 'Macro Indicators' },
              { value: '1,200+', label: 'Active Traders' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'AI Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Trade Professionally
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools and intelligence used by institutional traders worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Elevate Your Trading?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join thousands of professional traders using TradePro Terminal
            </p>
            <Button size="lg" onClick={() => onNavigate('terminal')}>
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
