"use client";

import React from "react";
import { TrendingUp, AlertCircle, Wrench, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";


function MetricCard({ label, value, icon, trend }) {
  return (
    <Card className="border-border bg-card hover:shadow-lg transition-shadow">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p
                className={`text-xs mt-2 flex items-center gap-1 ${trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                <TrendingUp className="h-3 w-3" />
                {trend === "up" ? "Up" : "Down"} from last month
              </p>
            )}
          </div>
          <div className="flex-shrink-0">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <MetricCard
        label="Total Revenue"
        value="$12,500"
        icon={<TrendingUp className="h-10 w-10 text-green-500/20" />}
        trend="up"
      />
      <MetricCard
        label="Active Tickets"
        value="45"
        icon={<AlertCircle className="h-10 w-10 text-orange-500/20" />}
        trend="up"
      />
      <MetricCard
        label="Devices Fixed This Month"
        value="120"
        icon={<Wrench className="h-10 w-10 text-primary/20" />}
        trend="up"
      />
      <MetricCard
        label="Total Customers"
        value="350"
        icon={<Users className="h-10 w-10 text-blue-500/20" />}
      />
    </div>
  );
}
