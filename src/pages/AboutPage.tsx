import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

export function AboutPage() {
  const stats = [
    { icon: Users, value: '1,200+', label: 'Active Traders' },
    { icon: TrendingUp, value: '$2.5B+', label: 'Assets Monitored' },
    { icon: Award, value: '5 Years', label: 'Experience' },
    { icon: Target, value: '98%', label: 'Accuracy Rate' },
  ];

  const team = [
    {
      name: 'David Chen',
      role: 'CEO & Founder',
      bio: 'Former Goldman Sachs quantitative analyst with 15 years in institutional trading.',
      avatar: 'DC',
    },
    {
      name: 'Sarah Williams',
      role: 'Head of Research',
      bio: 'Ex-JPMorgan macro strategist specializing in FX and commodities markets.',
      avatar: 'SW',
    },
    {
      name: 'Michael Torres',
      role: 'CTO',
      bio: 'Built trading systems at Citadel and Two Sigma before founding TradePro.',
      avatar: 'MT',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Democratizing
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {' '}Institutional Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              TradePro Terminal was founded with a simple mission: give every trader 
              access to the same research tools used by Wall Street's best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-gray-400">
              <p>
                After spending over a decade on Wall Street trading desks, our founders noticed 
                a critical gap in the market. Individual traders and small funds were making 
                decisions based on fragmented data while institutions had access to comprehensive 
                research terminals costing hundreds of thousands per year.
              </p>
              <p>
                TradePro Terminal was built to bridge this gap. We've taken the exact methodologies 
                and data analysis frameworks used by institutional research desks and packaged them 
                into an accessible, powerful platform.
              </p>
              <p>
                Our AI-powered analysis engine processes the same FRED data, COT reports, and market 
                flows that hedge funds rely on, but delivers insights in plain language that any 
                trader can understand and act upon.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-gray-400">Built by traders, for traders</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gray-800/50 border border-white/10"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Transparency', desc: 'Every data point is sourced and verifiable' },
                { title: 'Accuracy', desc: 'Institutional-grade analysis you can trust' },
                { title: 'Accessibility', desc: 'Professional tools at accessible prices' },
              ].map((value, i) => (
                <div key={i} className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
