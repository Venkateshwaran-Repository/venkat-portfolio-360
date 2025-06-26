
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StockDashboard } from "./StockDashboard";
import { StockScreener } from "./StockScreener";
import { TechnicalAnalysis } from "./TechnicalAnalysis";
import { FundamentalAnalysis } from "./FundamentalAnalysis";
import { AIInsights } from "./AIInsights";

interface StockAnalysisPlatformProps {
  onBack: () => void;
}

export const StockAnalysisPlatform = ({ onBack }: StockAnalysisPlatformProps) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          <h1 className="text-3xl font-bold">Stock Analysis & Prediction Platform</h1>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="screener">Stock Screener</TabsTrigger>
            <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
            <TabsTrigger value="fundamental">Fundamental Analysis</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <StockDashboard />
          </TabsContent>

          <TabsContent value="screener">
            <StockScreener />
          </TabsContent>

          <TabsContent value="technical">
            <TechnicalAnalysis />
          </TabsContent>

          <TabsContent value="fundamental">
            <FundamentalAnalysis />
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
