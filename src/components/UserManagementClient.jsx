"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// রোল কালার হেল্পার
function getRoleColor(role) {
  const colors = {
    Admin: "bg-purple-100 text-purple-800",
    User: "bg-blue-100 text-blue-800",
    Manager: "bg-green-100 text-green-800",
    Moderator: "bg-orange-100 text-orange-800",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
}

// স্ট্যাটাস কালার হেল্পার
function getStatusColor(status) {
  return status === "Active"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
}

export default function UserManagementClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // সার্চ ফিল্টারিং
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // পেজিনেশন লজিক
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      // এখানে ভবিষ্যতে API কল হবে
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between mb-6">
            <div>
              <CardTitle className="text-2xl">User Management</CardTitle>
              <CardDescription>
                Manage and monitor all registered customers
              </CardDescription>
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
                setSearchTerm(e.target.value);
                setCurrentPage(1);
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
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    USER
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    ROLE
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    STATUS
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    JOIN DATE
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-muted-foreground"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                              {user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {user.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={getRoleColor(user.role || "User")}>
                          {user.role || "User"}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          className={getStatusColor(user.status || "Active")}
                        >
                          {user.status || "Active"}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {/* যদি ডেট অবজেক্ট হয় তবে কনভার্ট করে নিচ্ছি */}
                        {user.joinDate ||
                          new Date(user.createdAt).toLocaleDateString()}
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
                            onClick={() => handleDelete(user._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredUsers.length,
              )}
              -{Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
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
                {/* পেজিনেশন নম্বর জেনারেটর (সিম্পল লজিক) */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(0, 5)
                  .map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="gap-1"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
