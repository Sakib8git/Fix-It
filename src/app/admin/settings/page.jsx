import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeaderProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceList from "@/components/ServiceList";
 // ক্লায়েন্ট কম্পোনেন্ট ইম্পোর্ট

// ডাটা এখন সার্ভার সাইডে (বা ডাটাবেস থেকে আনতে পারেন)
const servicesData = [
  {
    id: 1,
    name: "Screen Replacement",
    category: "Smartphone",
    price: 150,
    turnaround: "24h",
    active: true,
  },
  {
    id: 2,
    name: "Battery Replacement",
    category: "Laptop",
    price: 220,
    turnaround: "48h",
    active: true,
  },
  {
    id: 3,
    name: "Keyboard Repair",
    category: "Laptop",
    price: 180,
    turnaround: "48h",
    active: true,
  },
  {
    id: 4,
    name: "Charging Port Fix",
    category: "Tablet",
    price: 120,
    turnaround: "24h",
    active: true,
  },
];

export default function ServiceSettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">
            Service Settings
          </h1>
        </div>
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Service Settings
              </h1>
              <p className="text-muted-foreground">
                Manage available repair services and pricing
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Available Services</CardTitle>
                    <CardDescription>
                      Configure services, pricing, and turnaround times
                    </CardDescription>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* ডাটাগুলো প্রপস হিসেবে পাঠানো হচ্ছে */}
                <ServiceList initialData={servicesData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}