import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";
import TasksClient from "@/components/TasksClient";


// মক ডাটা (ভবিষ্যতে এটি ডাটাবেস থেকে আসবে)
const mockTasks = [
  {
    id: 1,
    ticketId: "FIX-2402",
    customer: "Michael Chen",
    device: "MacBook Air",
    issue: "Battery Replacement",
    status: "in-progress",
    priority: "medium",
    startDate: "2024-01-28",
    estimatedEnd: "2024-01-30",
  },
  {
    id: 2,
    ticketId: "FIX-2405",
    customer: "Jessica Martinez",
    device: "Dell XPS 13",
    issue: "Keyboard Problem",
    status: "in-progress",
    priority: "medium",
    startDate: "2024-01-29",
    estimatedEnd: "2024-01-31",
  },
  {
    id: 3,
    ticketId: "FIX-2406",
    customer: "Robert Taylor",
    device: "HP Pavilion",
    issue: "Screen Replacement",
    status: "pending",
    priority: "high",
    startDate: "2024-02-01",
    estimatedEnd: "2024-02-02",
  },
];

// সার্ভার সাইড ডাটা ফেচিং ফাংশন
async function getAssignedTasks() {
  // এখানে await db.collection('tasks').find()... হবে
  return mockTasks;
}

export default async function MyAssignedTasksPage() {
  const tasks = await getAssignedTasks();

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">My Tasks</h1>
        </div>
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          {/* ডাটাগুলো প্রপস হিসেবে পাঠানো হচ্ছে */}
          <TasksClient initialTasks={tasks} />
        </div>
      </div>
    </div>
  );
}
