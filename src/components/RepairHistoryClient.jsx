"use client";

import { useState } from "react";
import { CheckCircle2, DownloadCloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RepairHistoryClient({ initialRepairs }) {
  const [selectedRepair, setSelectedRepair] = useState(null);

  // টোটাল খরচ হিসাব করা
  const totalSpent = initialRepairs.reduce((sum, r) => {
    // যদি প্রাইস না থাকে বা 'Charge Free' হয় তবে ০ ধরবে
    const price =
      r.price && !isNaN(parseFloat(r.price)) ? parseFloat(r.price) : 0;
    return sum + price;
  }, 0);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          My Repair History
        </h1>
        <p className="text-muted-foreground">
          View all your completed repairs and invoices
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Repairs
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {initialRepairs.length}
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
              <Badge className="bg-yellow-100 text-yellow-800">Excellent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Repair Records Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Repair Records</CardTitle>
          <CardDescription>All your completed repair requests</CardDescription>
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
                    Price
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
                {initialRepairs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-4 text-muted-foreground"
                    >
                      No repair history found.
                    </td>
                  </tr>
                ) : (
                  initialRepairs.map((repair) => (
                    <tr
                      key={repair._id || repair.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-foreground">
                        {repair.ticketId}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {repair.device || repair.deviceType}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {repair.issue}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {repair.technician || "Assigned"}
                      </td>
                      <td className="py-4 px-4 font-medium text-foreground">
                        {repair.price ? `$${repair.price}` : "TBD"}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {new Date(
                          repair.date || repair.createdAt,
                        ).toLocaleDateString()}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200">
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
                  {selectedRepair.device || selectedRepair.deviceType}
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
                  {selectedRepair.technician || "Assigned Team"}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Total Price
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {selectedRepair.price
                    ? `$${selectedRepair.price}`
                    : "Pending"}
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
