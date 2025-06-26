
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

const mockStocks = [
  { symbol: "RELIANCE", price: 2456.80, change: +23.45, changePercent: +0.96, volume: "12,45,678" },
  { symbol: "TCS", price: 3789.50, change: -45.20, changePercent: -1.18, volume: "8,76,543" },
  { symbol: "HDFCBANK", price: 1634.75, change: +12.35, changePercent: +0.76, volume: "15,23,456" },
  { symbol: "INFY", price: 1445.20, change: +8.90, changePercent: +0.62, volume: "9,87,654" },
  { symbol: "ICICIBANK", price: 1078.45, change: -15.30, changePercent: -1.40, volume: "11,34,567" },
];

const marketIndices = [
  { name: "NIFTY 50", value: 19847.55, change: +145.30, changePercent: +0.74 },
  { name: "SENSEX", value: 66473.05, change: +389.75, changePercent: +0.59 },
  { name: "BANK NIFTY", value: 44235.80, change: -123.45, changePercent: -0.28 },
];

export const StockDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketIndices.map((index) => (
          <Card key={index.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{index.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
              <div className={`flex items-center text-sm ${index.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {index.change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {index.change > 0 ? '+' : ''}{index.change} ({index.changePercent > 0 ? '+' : ''}{index.changePercent}%)
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Movers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Top Active Stocks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStocks.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">NSE</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{stock.price.toLocaleString()}</div>
                  <div className={`text-sm flex items-center ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {stock.change > 0 ? '+' : ''}{stock.change} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent}%)
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Volume</div>
                  <div className="text-sm font-medium">{stock.volume}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <div className="text-sm text-muted-foreground">Gainers</div>
            </div>
            <div className="text-2xl font-bold text-green-600">1,247</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <div className="text-sm text-muted-foreground">Losers</div>
            </div>
            <div className="text-2xl font-bold text-red-600">892</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <div className="text-sm text-muted-foreground">Unchanged</div>
            </div>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <div className="text-sm text-muted-foreground">Total Turnover</div>
            </div>
            <div className="text-lg font-bold">₹45,678 Cr</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
