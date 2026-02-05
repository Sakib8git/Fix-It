"use client";

import { useState } from "react";

import { CheckCircle2, DownloadCloud, MessageSquare } from "lucide-react";
import { DashboardSidebar } from "@/Components/DashboardSidebar";
import { DashboardHeader } from "@/Components/DashboardHeaderProps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";


const mockRepairHistory = [
  {
    id: 1,
    ticketId: "FIX-2401",
    device: "iPhone 14 Pro",
    issue: "Screen Replacement",
    status: "completed",
    date: "2024-01-25",
    cost: 180,
    technician: "John Smith",
  },
  {
    id: 2,
    ticketId: "FIX-2398",
    device: "MacBook Air",
    issue: "Battery Replacement",
    status: "completed",
    date: "2024-01-18",
    cost: 220,
    technician: "Sarah Davis",
  },
  {
    id: 3,
    ticketId: "FIX-2395",
    device: "iPad Pro",
    issue: "Software Update",
    status: "completed",
    date: "2024-01-10",
    cost: 50,
    technician: "Mike Johnson",
  },
  {
    id: 4,
    ticketId: "FIX-2392",
    device: "Samsung Galaxy S23",
    issue: "Charging Port Fix",
    status: "completed",
    date: "2024-01-05",
    cost: 120,
    technician: "Emma Wilson",
  },
];

export default function MyRepairHistoryPage() {
  const [selectedRepair, setSelectedRepair] = useState(null);
  const totalSpent = mockRepairHistory.reduce((sum, r) => sum + r.cost, 0);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">
            Repair History
          </h1>
        </div>
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                My Repair History
              </h1>
              <p className="text-muted-foreground">
                View all your completed repairs and invoices
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Repairs
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {mockRepairHistory.length}
                      </p>
                    </div>
                    <CheckCircle2 className="h-10 w-10 text-green-500/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Spent
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        ${totalSpent}
                      </p>
                    </div>
                    <Badge className="bg-primary/10 text-primary">
                      Premium Member
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Avg. Rating
                      </p>
                      <p className="text-3xl font-bold text-foreground">4.8★</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Excellent
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Repair Records</CardTitle>
                <CardDescription>
                  All your completed repair requests
                </CardDescription>
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
                          Device
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Issue
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Technician
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Cost
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
                      {mockRepairHistory.map((repair) => (
                        <tr
                          key={repair.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-4 px-4 font-medium text-foreground">
                            {repair.ticketId}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {repair.device}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {repair.issue}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {repair.technician}
                          </td>
                          <td className="py-4 px-4 font-medium text-foreground">
                            ${repair.cost}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {new Date(repair.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:bg-primary/5 gap-2 p-0 h-auto"
                              onClick={() => setSelectedRepair(repair)}
                            >
                              <DownloadCloud className="h-4 w-4" />
                              Invoice
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

      {selectedRepair && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="border-border bg-card w-full max-w-md">
            <CardHeader>
              <CardTitle>Repair Invoice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Ticket ID</p>
                <p className="font-semibold text-foreground">
                  {selectedRepair.ticketId}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Device</p>
                <p className="font-semibold text-foreground">
                  {selectedRepair.device}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issue</p>
                <p className="font-semibold text-foreground">
                  {selectedRepair.issue}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Technician</p>
                <p className="font-semibold text-foreground">
                  {selectedRepair.technician}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-foreground">
                  ${selectedRepair.cost}
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <DownloadCloud className="h-4 w-4" />
                  Download Invoice
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedRepair(null)}
                  className="bg-background border-border"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
