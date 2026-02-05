"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Wrench,
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { DashboardSidebar, DashboardSidebarMobile } from "@/Components/DashboardSidebar";
import { DashboardHeader } from "@/Components/DashboardHeaderProps";

const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "Oct 15, 2023",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Marcus Diaz",
    email: "marcus.diaz@example.com",
    role: "User",
    status: "Active",
    joinDate: "Jan 20, 2024",
    avatar: "MD",
  },
  {
    id: 3,
    name: "Joshua Helm",
    email: "joshua.helm@example.com",
    role: "Manager",
    status: "Inactive",
    joinDate: "Aug 08, 2023",
    avatar: "JH",
  },
  {
    id: 4,
    name: "Roselyn Fox",
    email: "roselyn.fox@example.com",
    role: "Moderator",
    status: "Active",
    joinDate: "Oct 14, 2023",
    avatar: "RF",
  },
  {
    id: 5,
    name: "John Mitchell",
    email: "john.mitchell@example.com",
    role: "User",
    status: "Active",
    joinDate: "Mar 12, 2024",
    avatar: "JM",
  },
];

function getRoleColor(role) {
  const colors = {
    Admin: "bg-purple-100 text-purple-800",
    User: "bg-blue-100 text-blue-800",
    Manager: "bg-green-100 text-green-800",
    Moderator: "bg-orange-100 text-orange-800",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
}

function getStatusColor(status) {
  return status === "Active"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
}

export default function UserManagementPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Hamburger Menu */}
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">User Management</h1>
          <DashboardSidebarMobile />
        </div>

        {/* Header */}
        <DashboardHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <CardTitle className="text-2xl">User Management</CardTitle>
                    <CardDescription>Manage and monitor all registered customers</CardDescription>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <Plus className="h-4 w-4" />
                    Add New User
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>
              </CardHeader>

              <CardContent>
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-6 font-semibold text-foreground">USER</th>
                        <th className="text-left py-4 px-6 font-semibold text-foreground">ROLE</th>
                        <th className="text-left py-4 px-6 font-semibold text-foreground">STATUS</th>
                        <th className="text-left py-4 px-6 font-semibold text-foreground">JOIN DATE</th>
                        <th className="text-left py-4 px-6 font-semibold text-foreground">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                  {user.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-6 text-muted-foreground">
                            {user.joinDate}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:bg-primary/5 p-1 h-auto"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:bg-red-50 p-1 h-auto"
                                onClick={() => handleDelete(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Showing 1-{Math.min(itemsPerPage, paginatedUsers.length)} of {filteredUsers.length} users
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="gap-1"
                    >
                      Previous
                    </Button>
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page ? 'bg-primary text-primary-foreground' : ''}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="gap-1"
                    >
                      Next
                    </Button>
                  </div>
            </div>
          </CardContent>
        </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
