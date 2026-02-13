import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Brain, Sparkles, Minimize2, Maximize2
} from 'lucide-react';
import { useChatStore, useAuthStore, useUIStore } from '@/store';
import { mockMacroIndicators } from '@/data/mockData';

export function AIChat() {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isOpen, isLoading, addMessage, setIsOpen, setIsLoading } = useChatStore();
  const { user } = useAuthStore();
  const { currentPage } = useUIStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const userName = user?.full_name?.split(' ')[0] || 'Trader';

    // Context-aware responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello ${userName}! 👋 I'm your AI trading assistant. I can help you understand the current macro environment, analyze reports, and provide trading insights based on the platform data. What would you like to know?`;
    }

    if (lowerMessage.includes('macro') || lowerMessage.includes('cpi') || lowerMessage.includes('inflation')) {
      const cpi = mockMacroIndicators.find(i => i.code === 'CPI');
      const yields = mockMacroIndicators.find(i => i.code === 'DGS10');
      return `Based on current macro data:\n\n📊 **CPI** is at ${cpi?.current_value}% (prev: ${cpi?.previous_value}%), trending ${cpi?.trend}.\n\n📈 **10Y Yields** at ${yields?.current_value}% showing ${yields?.trend} momentum.\n\n**Analysis:** ${cpi?.ai_impact_analysis}\n\nThis environment is ${cpi?.gold_impact} for Gold and ${cpi?.usd_impact} for USD.`;
    }

    if (lowerMessage.includes('gold') || lowerMessage.includes('xau')) {
      return `**Gold Analysis Summary:**\n\n🪙 Current macro conditions present headwinds for gold:\n\n• Rising real yields increase opportunity cost\n• Strong USD creates resistance at $2,075\n• However, geopolitical risks provide floor support\n\n**Trading Bias:** Cautiously bearish near-term. Wait for CPI data before positioning. Key support at $2,020, resistance at $2,075.`;
    }

    if (lowerMessage.includes('report') || lowerMessage.includes('update')) {
      return `📋 **Today's Report Updates:**\n\n✅ Money Flow Track - Updated 2 hours ago\n✅ Gold Intelligence - Updated 4 hours ago\n✅ Macro Dashboard - Live data\n\n**Key Insight:** Institutional gold ETF flows showing accumulation despite bearish macro. This divergence suggests smart money may be positioning for a reversal. I recommend reviewing the Money Flow report for details.`;
    }

    if (lowerMessage.includes('trade') || lowerMessage.includes('position') || lowerMessage.includes('entry')) {
      return `Based on current conditions, here's my analysis:\n\n**Gold (XAUUSD):**\n• Bias: Neutral to Bearish\n• Key levels: Support $2,020, Resistance $2,075\n• Wait for CPI catalyst\n\n**DXY:**\n• Bias: Bullish\n• Support at 103.80\n• Target: 105.00\n\n⚠️ Remember to use proper risk management. Consider the Risk Calculator tool for position sizing.`;
    }

    if (lowerMessage.includes('risk') || lowerMessage.includes('position size')) {
      return `For risk management, I recommend:\n\n1. **Position Sizing:** Risk max 1-2% per trade\n2. **Stop Loss:** Always define your exit before entry\n3. **Use the Risk Calculator** tool in the Trader Toolkit\n\nBased on current volatility, consider tighter stops on gold positions until CPI data release.`;
    }

    if (currentPage === 'macro') {
      return `I see you're on the Macro Analysis page. The key indicators to watch right now are:\n\n1. **CPI** - Next release in 2 days (high impact)\n2. **10Y Yields** - Breaking above 4.60% resistance\n3. **DXY** - Testing 105 level\n\nWould you like me to explain how any of these impact your trading?`;
    }

    // Default response
    return `I'm here to help you analyze the platform data and provide trading insights. You can ask me about:\n\n• Current macro conditions\n• Report summaries\n• Gold/Forex/Crypto analysis\n• Trading bias and rationale\n• Risk management\n\nWhat would you like to explore?`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addMessage({
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });

    setIsLoading(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Generate and add AI response
    const aiResponse = generateAIResponse(userMessage);
    addMessage({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    });

    setIsLoading(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center z-50"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-50 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden ${
              isExpanded 
                ? 'inset-4 md:inset-8' 
                : 'bottom-6 right-6 w-96 h-[500px]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-xs text-gray-400">Institutional Research Desk</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: isExpanded ? 'calc(100% - 130px)' : '380px' }}>
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-blue-400/50 mx-auto mb-4" />
                  <h4 className="text-white font-medium mb-2">Hello, {user?.full_name?.split(' ')[0] || 'Trader'}!</h4>
                  <p className="text-gray-400 text-sm">
                    I'm your AI trading assistant. Ask me about macro conditions, 
                    reports, or trading insights.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['What\'s the macro outlook?', 'Gold analysis', 'Latest reports'].map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(q)}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-gray-200'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ 
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }} />
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about macro, reports, or trading..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
