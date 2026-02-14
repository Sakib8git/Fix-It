"use client";

import { useState } from "react";

import { Save, X } from "lucide-react";
import { DashboardSidebar } from "@/components_temp/DashboardSidebar";
import { DashboardHeader } from "@/components_temp/DashboardHeaderProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components_temp/ui/card";
import { Button } from "@/components_temp/ui/button";
import { Input } from "@/components_temp/ui/input";
import { Badge } from "@/components_temp/ui/badge";

const services = [
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
  const [servicesList, setServicesList] = useState(services);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  const handleSave = () => {
    setServicesList(
      servicesList.map((s) => (s.id === editingId ? formData : s)),
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setServicesList(servicesList.filter((s) => s.id !== id));
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

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
                <div className="space-y-4">
                  {servicesList.map((service) => (
                    <div
                      key={service.id}
                      className="border border-border rounded-lg p-4"
                    >
                      {editingId === service.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-foreground block mb-2">
                                Service Name
                              </label>
                              <Input
                                value={formData.name}
                                onChange={(e) =>
                                  handleInputChange("name", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground block mb-2">
                                Category
                              </label>
                              <Input
                                value={formData.category}
                                onChange={(e) =>
                                  handleInputChange("category", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground block mb-2">
                                Price ($)
                              </label>
                              <Input
                                type="number"
                                value={formData.price}
                                onChange={(e) =>
                                  handleInputChange("price", e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground block mb-2">
                                Turnaround Time
                              </label>
                              <Input
                                value={formData.turnaround}
                                onChange={(e) =>
                                  handleInputChange(
                                    "turnaround",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSave}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                            >
                              <Save className="h-4 w-4" />
                              Save Changes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingId(null)}
                              className="bg-background border-border gap-2"
                            >
                              <X className="h-4 w-4" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {service.name}
                            </h3>
                            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                              <span>Category: {service.category}</span>
                              <span>Price: ${service.price}</span>
                              <span>Turnaround: {service.turnaround}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                service.active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {service.active ? "Active" : "Inactive"}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(service)}
                              className="bg-background border-border"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(service.id)}
                              className="bg-background border-border text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
