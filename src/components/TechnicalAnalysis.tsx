
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const technicalIndicators = [
  { name: "RSI (14)", value: 65.4, signal: "Overbought", status: "warning" },
  { name: "MACD", value: 12.5, signal: "Bullish Crossover", status: "bullish" },
  { name: "Moving Average (50)", value: 2420.80, signal: "Above Price", status: "bullish" },
  { name: "Bollinger Bands", value: "Upper Band", signal: "Near Resistance", status: "warning" },
  { name: "Stochastic", value: 78.2, signal: "Overbought", status: "warning" },
];

const supportResistance = [
  { type: "Strong Resistance", level: 2500, distance: "2.1%" },
  { type: "Resistance", level: 2480, distance: "0.9%" },
  { type: "Current Price", level: 2456, distance: "0%" },
  { type: "Support", level: 2420, distance: "-1.5%" },
  { type: "Strong Support", level: 2380, distance: "-3.1%" },
];

export const TechnicalAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Stock Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Technical Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Stock</label>
              <Select defaultValue="reliance">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reliance">RELIANCE</SelectItem>
                  <SelectItem value="tcs">TCS</SelectItem>
                  <SelectItem value="hdfcbank">HDFCBANK</SelectItem>
                  <SelectItem value="infy">INFY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Timeframe</label>
              <Select defaultValue="1d">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5m">5min</SelectItem>
                  <SelectItem value="15m">15min</SelectItem>
                  <SelectItem value="1h">1hour</SelectItem>
                  <SelectItem value="1d">1day</SelectItem>
                  <SelectItem value="1w">1week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical Indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicalIndicators.map((indicator) => (
                <div key={indicator.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{indicator.name}</div>
                    <div className="text-sm text-muted-foreground">Value: {indicator.value}</div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={
                        indicator.status === 'bullish' ? 'default' : 
                        indicator.status === 'warning' ? 'secondary' : 'outline'
                      }
                      className={
                        indicator.status === 'bullish' ? 'bg-green-100 text-green-800' :
                        indicator.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : ''
                      }
                    >
                      {indicator.signal}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support & Resistance */}
        <Card>
          <CardHeader>
            <CardTitle>Support & Resistance Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportResistance.map((level, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {level.type.includes('Resistance') ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : level.type === 'Current Price' ? (
                      <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                    <div>
                      <div className="font-medium">{level.type}</div>
                      <div className="text-sm text-muted-foreground">₹{level.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      level.distance.includes('-') ? 'text-green-600' : 
                      level.distance === '0%' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {level.distance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive chart would appear here</p>
              <p className="text-sm text-muted-foreground">Real implementation would include TradingView or similar charting library</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
