import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";
import CreateRequestForm from "@/components/CreateRequestForm";


// স্ট্যাটিক ডাটা (ভবিষ্যতে ডাটাবেস থেকে আনতে পারেন)
const devices = [
  "iPhone",
  "Samsung",
  "iPad",
  "MacBook",
  "ASUS",
  "Dell",
  "HP",
  "Other",
];

const issues = [
  "Screen Replacement",
  "Battery Replacement",
  "Charging Port Fix",
  "Software Issue",
  "Hardware Problem",
  "Water Damage",
  "Other",
];

const serviceTypes = [
  {
    id: 1,
    name: "In-Store Repair",
    description: "Bring device to our shop",
    price: "Charge Free",
    time: "24-48h",
  },
  {
    id: 2,
    name: "Home Service",
    description: "We come to you",
    price: "50",
    time: "48-72h",
  },
  {
    id: 3,
    name: "Express Service",
    description: "Fast track repair",
    price: "100",
    time: "12-24h",
  },
];

export default function CreateNewRequestPage() {
  
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">New Request</h1>
        </div>
        <DashboardHeader />

        {/* ক্লায়েন্ট কম্পোনেন্ট কল করা হচ্ছে */}
        <CreateRequestForm
          devices={devices}
          issues={issues}
          serviceTypes={serviceTypes}
        />
      </div>
    </div>
  );
}
