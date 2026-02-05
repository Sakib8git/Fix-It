"use client";

import { useState } from "react";

import { Search, ChevronRight, Filter } from "lucide-react";
import { DashboardSidebar } from "@/Components/DashboardSidebar";
import { DashboardHeader } from "@/Components/DashboardHeaderProps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";


const mockTickets = [
  {
    id: 1,
    ticketId: "FIX-2401",
    customer: "Sarah Johnson",
    device: "iPhone 14 Pro",
    issue: "Screen Replacement",
    status: "completed",
    priority: "high",
    date: "2024-01-25",
  },
  {
    id: 2,
    ticketId: "FIX-2402",
    customer: "Michael Chen",
    device: "MacBook Air",
    issue: "Battery Replacement",
    status: "in-progress",
    priority: "medium",
    date: "2024-01-28",
  },
  {
    id: 3,
    ticketId: "FIX-2403",
    customer: "Emma Wilson",
    device: "iPad Pro",
    issue: "Display Repair",
    status: "pending",
    priority: "high",
    date: "2024-01-30",
  },
  {
    id: 4,
    ticketId: "FIX-2404",
    customer: "David Brown",
    device: "Samsung Galaxy",
    issue: "Battery Issue",
    status: "completed",
    priority: "low",
    date: "2024-01-22",
  },
  {
    id: 5,
    ticketId: "FIX-2405",
    customer: "Jessica Martinez",
    device: "Dell XPS 13",
    issue: "Keyboard Problem",
    status: "in-progress",
    priority: "medium",
    date: "2024-01-29",
  },
];

function getStatusBadge(status) {
  const statusMap = {
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    pending: "bg-orange-100 text-orange-800",
  };
  return statusMap[status] || "bg-gray-100 text-gray-800";
}

function getPriorityBadge(priority) {
  const priorityMap = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };
  return priorityMap[priority] || "bg-gray-100 text-gray-800";
}

export default function AllTicketsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.customer.toLowerCase().includes(search.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">All Tickets</h1>
        </div>
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                All Repair Tickets
              </h1>
              <p className="text-muted-foreground">
                Manage and track all customer repair requests
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle>Tickets</CardTitle>
                    <CardDescription>
                      Showing {filtered.length} of {mockTickets.length} tickets
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-background border-border gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by ticket ID or customer name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Ticket ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Customer
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Device
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Issue
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Priority
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
                      {filtered.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-4 px-4 font-medium text-foreground">
                            {ticket.ticketId}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {ticket.customer}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {ticket.device}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {ticket.issue}
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getStatusBadge(ticket.status)}>
                              {ticket.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              className={getPriorityBadge(ticket.priority)}
                            >
                              {ticket.priority}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {new Date(ticket.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:bg-primary/5 gap-1 p-0 h-auto"
                            >
                              View <ChevronRight className="h-4 w-4" />
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
    </div>
  );
}
