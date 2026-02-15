import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IPODataTab from "@/components/dashboard/IPODataTab";
import PerformanceTab from "@/components/dashboard/PerformanceTab";
import TASITab from "@/components/dashboard/TASITab";
import SummaryTab from "@/components/dashboard/SummaryTab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              <span className="text-primary">◆</span> Saudi Main Market IPO Data Room
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">2024–2025 IPO Performance & TASI Analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground">Last updated: Feb 15, 2026</span>
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-6">
        <Tabs defaultValue="ipo-data" className="w-full">
          <TabsList className="bg-muted/50 border border-border mb-6">
            <TabsTrigger value="ipo-data" className="data-[state=active]:bg-card data-[state=active]:text-primary font-medium text-xs">
              IPO Data
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-card data-[state=active]:text-primary font-medium text-xs">
              Performance
            </TabsTrigger>
            <TabsTrigger value="tasi" className="data-[state=active]:bg-card data-[state=active]:text-primary font-medium text-xs">
              TASI Index
            </TabsTrigger>
            <TabsTrigger value="summary" className="data-[state=active]:bg-card data-[state=active]:text-primary font-medium text-xs">
              Summary Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ipo-data">
            <IPODataTab />
          </TabsContent>
          <TabsContent value="performance">
            <PerformanceTab />
          </TabsContent>
          <TabsContent value="tasi">
            <TASITab />
          </TabsContent>
          <TabsContent value="summary">
            <SummaryTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
