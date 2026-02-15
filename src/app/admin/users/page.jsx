import {
  DashboardSidebar,
  DashboardSidebarMobile,
} from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";

import { getCollection } from "@/lib/dbConnect"; // ডাটাবেস কানেকশন
import UserManagementClient from "@/components/UserManagementClient";

// সার্ভার সাইড ডাটা ফেচিং
async function getUsers() {
  try {
    const usersCollection = await getCollection("users");
    // নতুন ইউজার আগে দেখাবে
    const result = await usersCollection.find().sort({ createdAt: -1 }).toArray();
    
    // JSON Serializable করার জন্য (MongoDB _id ইস্যু ফিক্স)
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Failed to fetch users:", error);
    // ডাটাবেস কানেকশন না থাকলে বা এরর হলে মক ডাটা রিটার্ন করতে পারেন অথবা এম্পটি অ্যারে
    return [];
  }
}

export default async function UserManagementPage() {
  const users = await getUsers();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Hamburger Menu */}
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">
            User Management
          </h1>
          <DashboardSidebarMobile />
        </div>

        {/* Header */}
        <DashboardHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* ডাটাগুলো প্রপস হিসেবে ক্লায়েন্ট কম্পোনেন্টে পাঠানো হচ্ছে */}
          <UserManagementClient initialUsers={users} />
        </div>
      </div>
    </div>
  );
}