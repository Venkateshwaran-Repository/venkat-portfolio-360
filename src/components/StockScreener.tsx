
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const mockScreenedStocks = [
  { symbol: "WIPRO", sector: "IT", marketCap: "Large", pe: 18.5, roe: 15.2, price: 445.80, change: +2.3 },
  { symbol: "MARUTI", sector: "Auto", marketCap: "Large", pe: 22.1, roe: 18.7, price: 9245.60, change: +1.8 },
  { symbol: "BAJFINANCE", sector: "NBFC", marketCap: "Large", pe: 28.4, roe: 22.1, price: 6789.30, change: -0.5 },
  { symbol: "ASIANPAINT", sector: "Paints", marketCap: "Large", pe: 45.2, roe: 28.9, price: 3456.75, change: +0.8 },
  { symbol: "ZOMATO", sector: "Consumer", marketCap: "Mid", pe: 65.8, roe: -5.2, price: 89.45, change: +3.2 },
];

export const StockScreener = () => {
  const [filters, setFilters] = useState({
    marketCap: "",
    sector: "",
    minPE: "",
    maxPE: "",
    minROE: "",
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Stock Screener Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Market Cap</label>
              <Select value={filters.marketCap} onValueChange={(value) => setFilters({...filters, marketCap: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="large">Large Cap</SelectItem>
                  <SelectItem value="mid">Mid Cap</SelectItem>
                  <SelectItem value="small">Small Cap</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Sector</label>
              <Select value={filters.sector} onValueChange={(value) => setFilters({...filters, sector: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="pharma">Pharma</SelectItem>
                  <SelectItem value="fmcg">FMCG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Min P/E</label>
              <Input 
                type="number" 
                placeholder="0" 
                value={filters.minPE}
                onChange={(e) => setFilters({...filters, minPE: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Max P/E</label>
              <Input 
                type="number" 
                placeholder="100" 
                value={filters.maxPE}
                onChange={(e) => setFilters({...filters, maxPE: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Min ROE %</label>
              <Input 
                type="number" 
                placeholder="0" 
                value={filters.minROE}
                onChange={(e) => setFilters({...filters, minROE: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={() => setFilters({marketCap: "", sector: "", minPE: "", maxPE: "", minROE: ""})}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Screened Stocks ({mockScreenedStocks.length} results)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Symbol</th>
                  <th className="text-left py-2">Sector</th>
                  <th className="text-left py-2">Market Cap</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Change %</th>
                  <th className="text-right py-2">P/E</th>
                  <th className="text-right py-2">ROE %</th>
                </tr>
              </thead>
              <tbody>
                {mockScreenedStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-b hover:bg-muted/50">
                    <td className="py-3 font-semibold">{stock.symbol}</td>
                    <td className="py-3">
                      <Badge variant="outline">{stock.sector}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant={stock.marketCap === 'Large' ? 'default' : stock.marketCap === 'Mid' ? 'secondary' : 'outline'}>
                        {stock.marketCap} Cap
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-medium">₹{stock.price.toLocaleString()}</td>
                    <td className={`py-3 text-right ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change > 0 ? '+' : ''}{stock.change}%
                    </td>
                    <td className="py-3 text-right">{stock.pe}</td>
                    <td className={`py-3 text-right ${stock.roe > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.roe}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
