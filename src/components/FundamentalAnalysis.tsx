
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, TrendingUp, DollarSign } from "lucide-react";

const fundamentalData = {
  companyInfo: {
    name: "Reliance Industries Limited",
    sector: "Oil & Gas",
    industry: "Integrated Oil & Gas",
    marketCap: "17,45,678 Cr",
    employees: "195,000+",
  },
  keyRatios: [
    { metric: "P/E Ratio", value: 18.45, benchmark: 22.1, status: "good" },
    { metric: "P/B Ratio", value: 2.1, benchmark: 2.8, status: "good" },
    { metric: "ROE %", value: 15.2, benchmark: 12.5, status: "excellent" },
    { metric: "ROCE %", value: 13.8, benchmark: 11.2, status: "good" },
    { metric: "Debt/Equity", value: 0.45, benchmark: 0.65, status: "good" },
    { metric: "Current Ratio", value: 1.8, benchmark: 1.5, status: "good" },
  ],
  financialHighlights: [
    { metric: "Revenue (TTM)", value: "7,92,756 Cr", growth: "+15.2%" },
    { metric: "Net Profit (TTM)", value: "72,344 Cr", growth: "+12.8%" },
    { metric: "EPS (TTM)", value: "107.5", growth: "+18.3%" },
    { metric: "Book Value", value: "1,456", growth: "+8.7%" },
  ],
};

const peerComparison = [
  { company: "RELIANCE", pe: 18.45, pb: 2.1, roe: 15.2, revenue: "7,92,756" },
  { company: "ONGC", pe: 8.9, pb: 0.85, roe: 9.8, revenue: "1,35,456" },
  { company: "BPCL", pe: 12.3, pb: 1.2, roe: 11.5, revenue: "4,25,678" },
  { company: "IOC", pe: 7.8, pb: 0.92, roe: 8.9, revenue: "6,78,234" },
];

export const FundamentalAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Stock Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Fundamental Analysis
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
          </div>
        </CardContent>
      </Card>

      {/* Company Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Company Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Company</div>
              <div className="font-semibold">{fundamentalData.companyInfo.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Sector</div>
              <div className="font-semibold">{fundamentalData.companyInfo.sector}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Market Cap</div>
              <div className="font-semibold">₹{fundamentalData.companyInfo.marketCap}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Employees</div>
              <div className="font-semibold">{fundamentalData.companyInfo.employees}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Ratios */}
        <Card>
          <CardHeader>
            <CardTitle>Key Financial Ratios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fundamentalData.keyRatios.map((ratio) => (
                <div key={ratio.metric} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{ratio.metric}</div>
                    <div className="text-sm text-muted-foreground">Industry Avg: {ratio.benchmark}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{ratio.value}</div>
                    <Badge 
                      variant={ratio.status === 'excellent' ? 'default' : 'secondary'}
                      className={
                        ratio.status === 'excellent' ? 'bg-green-100 text-green-800' :
                        ratio.status === 'good' ? 'bg-blue-100 text-blue-800' : ''
                      }
                    >
                      {ratio.status === 'excellent' ? 'Excellent' : 'Good'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Highlights */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Highlights (TTM)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fundamentalData.financialHighlights.map((item) => (
                <div key={item.metric} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.metric}</div>
                    <div className="text-sm text-muted-foreground">Year over Year</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{item.value}</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {item.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peer Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Peer Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Company</th>
                  <th className="text-right py-2">P/E Ratio</th>
                  <th className="text-right py-2">P/B Ratio</th>
                  <th className="text-right py-2">ROE %</th>
                  <th className="text-right py-2">Revenue (Cr)</th>
                </tr>
              </thead>
              <tbody>
                {peerComparison.map((company) => (
                  <tr key={company.company} className="border-b hover:bg-muted/50">
                    <td className="py-3 font-semibold">{company.company}</td>
                    <td className="py-3 text-right">{company.pe}</td>
                    <td className="py-3 text-right">{company.pb}</td>
                    <td className="py-3 text-right">{company.roe}%</td>
                    <td className="py-3 text-right">₹{company.revenue}</td>
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
