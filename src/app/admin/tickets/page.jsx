import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";

import { getCollection } from "@/lib/dbConnect"; // ডাটাবেস কানেকশন
import TicketsClient from "@/components/TicketsClient";

// সার্ভার সাইডে ডাটা ফেচ করার ফাংশন
async function getRepairs() {
  try {
    const requestCollection = await getCollection("repair_requests");
    // নতুন রিকোয়েস্ট সবার উপরে দেখানোর জন্য sort করা হলো
    const result = await requestCollection.find().sort({ createdAt: -1 }).toArray();
    
    // MongoDB অবজেক্টগুলোকে প্লেইন JSON এ কনভার্ট করতে হবে (Serializable করার জন্য)
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}

export default async function AllTicketsPage() {
  // ডাটা ফেচ করা হচ্ছে (Server Side)
  const repairs = await getRepairs();

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">All Tickets</h1>
        </div>
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          {/* ডাটাগুলো প্রপস হিসেবে পাঠানো হচ্ছে */}
          <TicketsClient initialTickets={repairs} />
        </div>
      </div>
    </div>
  );
}