import {
  DashboardSidebar,
  DashboardSidebarMobile,
} from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";
import DashboardClient from "@/components/DashboardClient";

// import { getCollection } from "@/lib/dbConnect"; // ডাটাবেস কানেকশন (ভবিষ্যতের জন্য)

// মক ডাটা (ডাটাবেস কানেক্ট হওয়ার আগ পর্যন্ত)
const mockRepairs = [
  {
    id: 1,
    ticketId: "FIX-2401",
    customerName: "Sarah Johnson",
    device: "iPhone 14 Pro",
    status: "completed",
    date: "2024-01-25",
    cost: 180,
  },
  {
    id: 2,
    ticketId: "FIX-2402",
    customerName: "Michael Chen",
    device: "MacBook Air",
    status: "in-progress",
    date: "2024-01-28",
    cost: 220,
  },
  {
    id: 3,
    ticketId: "FIX-2403",
    customerName: "Emma Wilson",
    device: "iPad Pro",
    status: "pending",
    date: "2024-01-30",
    cost: 350,
  },
  {
    id: 4,
    ticketId: "FIX-2404",
    customerName: "David Brown",
    device: "Samsung Galaxy S23",
    status: "completed",
    date: "2024-01-22",
    cost: 150,
  },
  {
    id: 5,
    ticketId: "FIX-2405",
    customerName: "Jessica Martinez",
    device: "Dell XPS 13",
    status: "in-progress",
    date: "2024-01-29",
    cost: 280,
  },
];

// সার্ভার সাইড ডাটা ফেচিং ফাংশন
async function getRecentRepairs() {
  // এখানে ডাটাবেস কল হবে
  // const repairsCollection = await getCollection('repairs');
  // const result = await repairsCollection.find().sort({date: -1}).limit(5).toArray();
  // return JSON.parse(JSON.stringify(result));

  return mockRepairs;
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
          {/* ক্লায়েন্ট কম্পোনেন্টকে ডাটা পাস করা হচ্ছে */}
          <DashboardClient recentRepairs={recentRepairs} />
        </div>
      </div>
    </div>
  );
}
