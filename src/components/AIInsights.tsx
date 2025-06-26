
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, TrendingUp, TrendingDown, Target, AlertTriangle, Clock } from "lucide-react";

const aiPredictions = [
  {
    stock: "RELIANCE",
    prediction: "Bullish",
    confidence: 78,
    targetPrice: 2650,
    currentPrice: 2456,
    timeframe: "3 months",
    reasoning: "Strong quarterly results, positive sector outlook, technical breakout pattern"
  },
  {
    stock: "TCS",
    prediction: "Hold",
    confidence: 65,
    targetPrice: 3850,
    currentPrice: 3789,
    timeframe: "6 months",
    reasoning: "Stable fundamentals, but increased competition in IT services sector"
  },
  {
    stock: "HDFCBANK",
    prediction: "Bullish",
    confidence: 82,
    targetPrice: 1750,
    currentPrice: 1634,
    timeframe: "4 months",
    reasoning: "Banking sector recovery, improved NII margins, credit growth acceleration"
  },
];

const tradingSignals = [
  {
    stock: "WIPRO",
    signal: "Buy",
    type: "Intraday",
    entry: 445,
    target: 465,
    stopLoss: 435,
    risk: "Medium",
    time: "2 hours ago"
  },
  {
    stock: "MARUTI",
    signal: "Sell",
    type: "Swing",
    entry: 9245,
    target: 8950,
    stopLoss: 9350,
    risk: "Low",
    time: "4 hours ago"
  },
  {
    stock: "BAJFINANCE",
    signal: "Hold",
    type: "Investment",
    entry: 6789,
    target: 7200,
    stopLoss: 6500,
    risk: "High",
    time: "1 day ago"
  },
];

const sentimentAnalysis = {
  overall: "Positive",
  score: 72,
  factors: [
    { factor: "News Sentiment", score: 68, trend: "positive" },
    { factor: "Social Media", score: 75, trend: "positive" },
    { factor: "Analyst Reports", score: 78, trend: "positive" },
    { factor: "Market Momentum", score: 71, trend: "positive" },
  ]
};

export const AIInsights = () => {
  return (
    <div className="space-y-6">
      {/* AI Dashboard Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Insights & Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Advanced machine learning models analyze market data, news sentiment, and technical patterns to generate intelligent predictions and trading signals.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              AI Stock Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiPredictions.map((pred) => (
                <div key={pred.stock} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{pred.stock}</div>
                    <Badge 
                      variant={pred.prediction === 'Bullish' ? 'default' : pred.prediction === 'Hold' ? 'secondary' : 'destructive'}
                      className={
                        pred.prediction === 'Bullish' ? 'bg-green-100 text-green-800' :
                        pred.prediction === 'Hold' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }
                    >
                      {pred.prediction}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Target Price</div>
                      <div className="font-medium">₹{pred.targetPrice}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Confidence</div>
                      <div className="font-medium">{pred.confidence}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Current Price</div>
                      <div className="font-medium">₹{pred.currentPrice}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Timeframe</div>
                      <div className="font-medium">{pred.timeframe}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>AI Reasoning:</strong> {pred.reasoning}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Signals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Live Trading Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tradingSignals.map((signal, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{signal.stock}</div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={signal.signal === 'Buy' ? 'default' : signal.signal === 'Sell' ? 'destructive' : 'secondary'}
                        className={
                          signal.signal === 'Buy' ? 'bg-green-100 text-green-800' :
                          signal.signal === 'Sell' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {signal.signal}
                      </Badge>
                      <Badge variant="outline">{signal.type}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Entry</div>
                      <div className="font-medium">₹{signal.entry}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Target</div>
                      <div className="font-medium">₹{signal.target}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Stop Loss</div>
                      <div className="font-medium">₹{signal.stopLoss}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {signal.time}
                    </div>
                    <Badge variant="outline" className={
                      signal.risk === 'Low' ? 'text-green-600' :
                      signal.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }>
                      {signal.risk} Risk
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle>Market Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-600">{sentimentAnalysis.score}%</div>
                <div className="text-muted-foreground">Overall Market Sentiment</div>
                <Badge className="mt-2 bg-green-100 text-green-800">{sentimentAnalysis.overall}</Badge>
              </div>
            </div>
            <div className="space-y-3">
              {sentimentAnalysis.factors.map((factor) => (
                <div key={factor.factor} className="flex items-center justify-between p-2 border rounded">
                  <div className="text-sm font-medium">{factor.factor}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">{factor.score}%</div>
                    {factor.trend === 'positive' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> AI predictions and trading signals are based on algorithmic analysis and historical patterns. 
              They do not guarantee future performance. All investments carry risk, and you should consult with a qualified financial advisor 
              before making investment decisions. Past performance is not indicative of future results.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
