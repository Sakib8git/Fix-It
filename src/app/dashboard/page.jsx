"use client";

import { useState } from "react";
import { Clock, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Button import করা হলো
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Card এর সব পার্ট ইম্পোর্ট করা হলো

// Custom Components
import {
  DashboardSidebar,
  DashboardSidebarMobile,
} from "@/components/DashboardSidebar";
// Props নামটা সাধারণত ফাইলে থাকে না, তাই শুধু Header দিলাম
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { DashboardHeader } from "@/components/DashboardHeaderProps";

// Interface এবং Type বাদ দেওয়া হয়েছে (JS এ লাগে না)

const mockRepairs = [
  {
    id: 1,
    ticketId: "FIX-2401",
    customerName: "Sarah Johnson",
    device: "iPhone 14 Pro",
    status: "completed",
    date: "2024-01-25",
    cost: 180,
  },
  {
    id: 2,
    ticketId: "FIX-2402",
    customerName: "Michael Chen",
    device: "MacBook Air",
    status: "in-progress",
    date: "2024-01-28",
    cost: 220,
  },
  {
    id: 3,
    ticketId: "FIX-2403",
    customerName: "Emma Wilson",
    device: "iPad Pro",
    status: "pending",
    date: "2024-01-30",
    cost: 350,
  },
  {
    id: 4,
    ticketId: "FIX-2404",
    customerName: "David Brown",
    device: "Samsung Galaxy S23",
    status: "completed",
    date: "2024-01-22",
    cost: 150,
  },
  {
    id: 5,
    ticketId: "FIX-2405",
    customerName: "Jessica Martinez",
    device: "Dell XPS 13",
    status: "in-progress",
    date: "2024-01-29",
    cost: 280,
  },
];

function getStatusBadge(status) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case "in-progress":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    default:
      return null;
  }
}

export default function DashboardPage() {
  const [selectedRepair, setSelectedRepair] = useState(null);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Hamburger Menu */}
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          <DashboardSidebarMobile />
        </div>

        {/* Header */}
        <DashboardHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your repairs today.
              </p>
            </div>

            {/* Metrics */}
            <DashboardMetrics />

            {/* Recent Repair Requests Table */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Repair Requests</CardTitle>
                    <CardDescription>
                      Latest repairs submitted by customers
                    </CardDescription>
                  </div>
                  <Link href="/dashboard/new-request">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      New Request
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Ticket ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Customer Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Device
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRepairs.map((repair) => (
                        <tr
                          key={repair.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-4 px-4 font-medium text-foreground">
                            {repair.ticketId}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {repair.customerName}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {repair.device}
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(repair.status)}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {new Date(repair.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedRepair(repair)}
                              className="text-primary hover:bg-primary/5 gap-1 p-0 h-auto"
                            >
                              View
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="border-border bg-card w-full max-w-md">
            <CardHeader>
              <CardTitle>Repair Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Ticket ID</p>
                <p className="font-semibold text-foreground">
                  {selectedRepair.ticketId}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customer Name</p>
                <p className="font-semibold text-foreground">
                  {selectedRepair.customerName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Device</p>
                <p className="font-semibold text-foreground">
                  {selectedRepair.device}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="mt-1">
                  {getStatusBadge(selectedRepair.status)}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-foreground">
                  {new Date(selectedRepair.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost</p>
                <p className="font-semibold text-foreground">
                  ${selectedRepair.cost}
                </p>
              </div>
              <Button
                onClick={() => setSelectedRepair(null)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
