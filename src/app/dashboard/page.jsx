import {
  DashboardSidebar,
  DashboardSidebarMobile,
} from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";

import { getCollection } from "@/lib/dbConnect";
import DashboardClient from "@/components/DashboardClient";

// ২.  ডাটা ফেচিং
async function getRecentRepairs() {
  try {
    const repairsCollection = await getCollection("repair_requests");

    // ৩.  ডাটা আনা  ৫টি
    const result = await repairsCollection
      .find()
      .sort({ createdAt: -1 }) //  Descending
      .limit(5)
      .toArray();

    const formattedData = result.map((repair) => ({
      id: repair._id.toString(), // MongoDB _id কে string
      ticketId: repair.ticketId,

      customerName: repair.contact || "Unknown Customer",

      device: repair.deviceType || repair.device,
      status: repair.status || "pending",
      date: repair.createdAt || new Date().toISOString(),

      cost: repair.price || 0,
    }));

    return formattedData;
  } catch (error) {
    console.error("Failed to fetch repairs:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const recentRepairs = await getRecentRepairs();

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
          <DashboardClient recentRepairs={recentRepairs} />
        </div>
      </div>
    </div>
  );
}
