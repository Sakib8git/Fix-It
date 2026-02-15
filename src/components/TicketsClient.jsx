"use client";

import { useState } from "react";
import { Search, ChevronRight, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// স্ট্যাটাস ব্যাজ কালার লজিক
function getStatusBadge(status) {
  const normalizedStatus = status?.toLowerCase() || "";
  const statusMap = {
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    pending: "bg-orange-100 text-orange-800",
  };
  return statusMap[normalizedStatus] || "bg-gray-100 text-gray-800";
}

export default function TicketsClient({ initialTickets }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // ফিল্টারিং লজিক (ক্লায়েন্ট সাইড)
  const filtered = initialTickets.filter((ticket) => {
    const customerMatch =
      ticket.contact?.toLowerCase().includes(search.toLowerCase()) || false;
    const idMatch =
      ticket.ticketId?.toLowerCase().includes(search.toLowerCase()) || false;
    const matchesSearch = customerMatch || idMatch;

    const matchesStatus =
      filterStatus === "all" || ticket.status?.toLowerCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
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
                Showing {filtered.length} of {initialTickets.length} tickets
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-background border-border gap-2"
            >
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by Ticket ID or Contact..."
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
                    Contact
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
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No tickets found
                    </td>
                  </tr>
                ) : (
                  filtered.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-foreground">
                        {ticket.ticketId}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {ticket.customer || ticket.contact}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {ticket.device || ticket.deviceType}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {ticket.issue}
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={getStatusBadge(ticket.status || "Pending")}
                        >
                          {ticket.status || "Pending"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {new Date(
                          ticket.date || ticket.createdAt,
                        ).toLocaleDateString()}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
