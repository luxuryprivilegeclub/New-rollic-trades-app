import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Target, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function RiskCalculatorPage() {
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(2040);
  const [stopLoss, setStopLoss] = useState(2020);
  const [takeProfit, setTakeProfit] = useState(2080);

  const riskAmount = accountSize * (riskPercent / 100);
  const pipsAtRisk = Math.abs(entryPrice - stopLoss);
  const pipsToTarget = Math.abs(takeProfit - entryPrice);
  const positionSize = pipsAtRisk > 0 ? riskAmount / pipsAtRisk : 0;
  const riskRewardRatio = pipsAtRisk > 0 ? (pipsToTarget / pipsAtRisk).toFixed(2) : '0';
  const potentialProfit = positionSize * pipsToTarget;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Risk Calculator</h1>
              <p className="text-gray-400">Position sizing and risk management tool</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-white">Trade Parameters</h3>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account Size ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={accountSize}
                      onChange={(e) => setAccountSize(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Risk Per Trade (%)
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">0.5%</span>
                    <span className="text-blue-400 font-medium">{riskPercent}%</span>
                    <span className="text-gray-500">5%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Entry Price
                    </label>
                    <input
                      type="number"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Stop Loss
                    </label>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Take Profit
                    </label>
                    <input
                      type="number"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>

                <Button className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Main Results */}
            <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/20">
              <CardHeader>
                <h3 className="font-semibold text-white">Calculation Results</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Risk Amount</span>
                    </div>
                    <p className="text-2xl font-bold text-white">${riskAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Position Size</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{positionSize.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">lots/units</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-gray-400">R:R Ratio</span>
                    </div>
                    <p className="text-2xl font-bold text-white">1:{riskRewardRatio}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-gray-400">Potential Profit</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-400">${potentialProfit.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Warning */}
            <Card className={`${Number(riskRewardRatio) < 1.5 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${Number(riskRewardRatio) < 1.5 ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <div>
                    <p className={`font-medium ${Number(riskRewardRatio) < 1.5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {Number(riskRewardRatio) < 1.5 ? 'Risk Warning' : 'Good Setup'}
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      {Number(riskRewardRatio) < 1.5 
                        ? 'Your Risk:Reward ratio is below 1.5. Consider adjusting your take profit or stop loss for a better setup.'
                        : 'Your trade setup has a favorable risk:reward ratio. Remember to stick to your plan.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <h4 className="text-white font-medium mb-3">Trade Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pips at Risk:</span>
                    <span className="text-white">{pipsAtRisk.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pips to Target:</span>
                    <span className="text-white">{pipsToTarget.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Loss:</span>
                    <span className="text-red-400">-${riskAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Gain:</span>
                    <span className="text-emerald-400">+${potentialProfit.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Educational Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-white/5">
            <CardContent className="p-6">
              <h4 className="text-white font-semibold mb-3">Risk Management Best Practices</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-blue-400 font-medium mb-1">The 2% Rule</p>
                  <p className="text-gray-400">Never risk more than 2% of your account on a single trade.</p>
                </div>
                <div>
                  <p className="text-purple-400 font-medium mb-1">Minimum R:R of 1.5</p>
                  <p className="text-gray-400">Aim for at least 1.5:1 reward-to-risk ratio on all trades.</p>
                </div>
                <div>
                  <p className="text-emerald-400 font-medium mb-1">Consistent Sizing</p>
                  <p className="text-gray-400">Use consistent position sizing to manage equity curve smoothly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
