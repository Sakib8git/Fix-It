"use client";

import { useEffect, useState } from "react";
import { Search, ChevronRight, Filter } from "lucide-react";
import { DashboardSidebar } from "@/Components/DashboardSidebar";
import { DashboardHeader } from "@/Components/DashboardHeaderProps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";

// স্ট্যাটাস ব্যাজ কালার লজিক (Case Insensitive করা হয়েছে)
function getStatusBadge(status) {
  const normalizedStatus = status?.toLowerCase() || "";
  const statusMap = {
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    pending: "bg-orange-100 text-orange-800",
  };
  return statusMap[normalizedStatus] || "bg-gray-100 text-gray-800";
}

// প্রায়োরিটি ব্যাজ লজিক
function getPriorityBadge(priority) {
  const normalizedPriority = priority?.toLowerCase() || "";
  const priorityMap = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };
  return priorityMap[normalizedPriority] || "bg-gray-100 text-gray-800";
}

export default function AllTicketsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ডাটা ফেচিং ঠিক করা হয়েছে
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const res = await fetch("/api/repair-requests");
        const data = await res.json();
        setRepairs(data);
      } catch (error) { 
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepairs();
  }, []);

  // ২. ফিল্টারিং লজিক (নিরাপদ করা হয়েছে)
  const filtered = repairs.filter((ticket) => {
    
    const customerMatch = ticket.contact?.toLowerCase().includes(search.toLowerCase()) || false;
    const idMatch = ticket.ticketId?.toLowerCase().includes(search.toLowerCase()) || false;
    
    const matchesSearch = customerMatch || idMatch;
    
    const matchesStatus = filterStatus === "all" || ticket.status?.toLowerCase() === filterStatus;
    
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
              <h1 className="text-3xl font-bold text-foreground">All Repair Tickets</h1>
              <p className="text-muted-foreground">Manage and track all customer repair requests</p>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle>Tickets</CardTitle>
                    <CardDescription>
                      Showing {filtered.length} of {repairs.length} tickets
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="bg-background border-border gap-2">
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
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Ticket ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Contact</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Device</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Issue</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* লোডিং স্টেট হ্যান্ডেল করা */}
                      {loading ? (
                        <tr><td colSpan="7" className="text-center py-4">Loading...</td></tr>
                      ) : filtered.length === 0 ? (
                        <tr><td colSpan="7" className="text-center py-4">No tickets found</td></tr>
                      ) : (
                        filtered.map((ticket) => (
                          <tr
                            key={ticket._id} // 👈 id এর বদলে _id হবে (MongoDB)
                            className="border-b border-border hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-4 px-4 font-medium text-foreground">
                              {ticket.ticketId}
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">
                              {/* customer ফিল্ড না থাকলে contact দেখাবে */}
                              {ticket.customer || ticket.contact} 
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">
                              {/* device না থাকলে deviceType দেখাবে */}
                              {ticket.device || ticket.deviceType}
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">
                              {ticket.issue}
                            </td>
                            <td className="py-4 px-4">
                              <Badge className={getStatusBadge(ticket.status || 'Pending')}>
                                {ticket.status || 'Pending'}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">
                              {/* date না থাকলে createdAt দেখাবে */}
                              {new Date(ticket.date || ticket.createdAt).toLocaleDateString()}
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
        </div>
      </div>
    </div>
  );
}