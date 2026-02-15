import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";

import { getCollection } from "@/lib/dbConnect"; // ডাটাবেস কানেকশন
import RepairHistoryClient from "@/components/RepairHistoryClient";

// সার্ভার সাইড ডাটা ফেচিং ফাংশন
async function getRepairHistory() {
  try {
    const requestCollection = await getCollection("repair_requests");
    // শুধুমাত্র completed স্ট্যাটাসের ডাটাগুলো আনা হচ্ছে (বা সব ডাটা চাইলে ফিল্টার বাদ দিন)
    // const query = { status: "completed" }; 
    // আপাতত সব ডাটাই দেখাচ্ছি
    const result = await requestCollection.find().sort({ createdAt: -1 }).toArray();
    
    // JSON এ কনভার্ট করা (Next.js Server Component এর জন্য)
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Failed to fetch repair history:", error);
    return [];
  }
}

export default async function MyRepairHistoryPage() {
  // ডাটা ফেচ করা হচ্ছে
  const repairs = await getRepairHistory();

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">
            Repair History
          </h1>
        </div>
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          {/* ডাটাগুলো প্রপস হিসেবে পাঠানো হচ্ছে */}
          <RepairHistoryClient initialRepairs={repairs} />
        </div>
      </div>
    </div>
  );
}