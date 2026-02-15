import {
  DashboardSidebar,
  DashboardSidebarMobile,
} from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";

import { getCollection } from "@/lib/dbConnect"; // ১. ডাটাবেস কানেকশন ইম্পোর্ট
import DashboardClient from "@/components/DashboardClient";

// ২. সার্ভার সাইড ডাটা ফেচিং ফাংশন (আপডেট করা হয়েছে)
async function getRecentRepairs() {
  try {
    const repairsCollection = await getCollection("repair_requests");

    // ৩. ডাটাবেস থেকে ডাটা আনা (নতুনগুলো আগে, এবং মাত্র ৫টি)
    const result = await repairsCollection
      .find()
      .sort({ createdAt: -1 }) // -1 মানে Descending (Newest first)
      .limit(5) // ড্যাশবোর্ডে সাধারণত ৫-১০টা ডাটা দেখায়
      .toArray();

    // ৪. ডাটা ফরম্যাটিং এবং ম্যাপিং
    // (Next.js এ _id অবজেক্ট পাস করা যায় না, তাই স্ট্রিং করতে হয়)
    const formattedData = result.map((repair) => ({
      id: repair._id.toString(), // MongoDB _id কে স্ট্রিং বানানো
      ticketId: repair.ticketId,
      // আপনার DB তে নাম 'contact' কিন্তু UI তে 'customerName' চাচ্ছে
      customerName: repair.contact || "Unknown Customer", 
      // আপনার DB তে 'deviceType' কিন্তু UI তে 'device' চাচ্ছে
      device: repair.deviceType || repair.device, 
      status: repair.status || "pending",
      date: repair.createdAt || new Date().toISOString(),
      // আপনার DB তে 'price' কিন্তু UI তে 'cost' চাচ্ছে
      cost: repair.price || 0, 
    }));

    return formattedData;

  } catch (error) {
    console.error("Failed to fetch repairs:", error);
    return []; // এরর হলে খালি অ্যারে রিটার্ন করবে যাতে পেজ ক্রাশ না করে
  }
}

export default async function DashboardPage() {
  // ডাটা ফেচ করা হচ্ছে
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
          {/* ক্লায়েন্ট কম্পোনেন্টকে রিয়েল ডাটা পাস করা হচ্ছে */}
          <DashboardClient recentRepairs={recentRepairs} />
        </div>
      </div>
    </div>
  );
}