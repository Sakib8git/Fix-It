"use client";

import { useState } from "react";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { DashboardSidebar } from "@/Components/DashboardSidebar";
import { DashboardHeader } from "@/Components/DashboardHeaderProps";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import Swal from "sweetalert2";

const devices = ["iPhone", "Samsung", "iPad", "MacBook", "Dell", "HP", "Other"];
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
    price: "Varies",
    time: "24-48h",
  },
  {
    id: 2,
    name: "Home Service",
    description: "We come to you",
    price: "+$50",
    time: "48-72h",
  },
  {
    id: 3,
    name: "Express Service",
    description: "Fast track repair",
    price: "+$100",
    time: "12-24h",
  },
];

export default function CreateNewRequestPage() {
  const [formData, setFormData] = useState({
    deviceType: "",
    issue: "",
    serviceType: "",
    description: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 লোডিং স্টেট যোগ করলাম

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ১. টিকিট আইডি জেনারেট করা
    const newTicketId = `FIX-${Math.floor(Math.random() * 10000)}`;
    // ২. ডাটা অবজেক্ট সাজানো

    const requestData = {
      ticketId: newTicketId,
      deviceType: formData.deviceType,
      issue: formData.issue,
      serviceTypeId: formData.serviceType,
      // সার্ভিস টাইপের নামটা খুঁজে বের করে পাঠাচ্ছি (অপশনাল, কিন্তু ভালো প্র্যাকটিস)
      serviceTypeName: serviceTypes.find((s) => s.id === formData.serviceType)
        ?.name,
      description: formData.description,
      contact: formData.contact,
    };

    // setSubmitted(true);
    try {
      // ৩. API তে ডাটা পাঠানো
      const response = await fetch("/api/repair-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      // ৪. সফল হলে স্টেট আপডেট
      setTicketId(newTicketId);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  if (submitted) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
            <h1 className="text-lg font-semibold text-foreground">
              Request Submitted
            </h1>
          </div>
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="p-6">
              <div className="text-center space-y-6 max-w-md">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Request Submitted!
                  </h1>
                  <p className="text-muted-foreground">
                    Your repair request has been received and is being
                    processed.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-left">
                  <p className="text-sm text-muted-foreground mb-1">
                    Your Ticket ID
                  </p>
                  <p className="text-2xl font-bold text-foreground font-mono">
                    {ticketId}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Save this ticket ID to track your repair status
                  </p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    View My Repairs
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-background border-border"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        deviceType: "",
                        issue: "",
                        serviceType: "",
                        description: "",
                        contact: "",
                      });
                    }}
                  >
                    Create Another Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ৫. মেইন ফর্ম UI
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">New Request</h1>
        </div>
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8 max-w-4xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create Repair Request
              </h1>
              <p className="text-muted-foreground">
                Submit a new device repair request
              </p>
            </div>

            {/* Device Selection Card */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Select Your Device</CardTitle>
                <CardDescription>
                  Choose the device that needs repair
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {devices.map((device) => (
                    <Button
                      key={device}
                      variant={
                        formData.deviceType === device ? "default" : "outline"
                      }
                      onClick={() => handleChange("deviceType", device)}
                      className={
                        formData.deviceType === device
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border-border"
                      }
                    >
                      {device}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Issue Selection Card */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Describe the Issue</CardTitle>
                <CardDescription>
                  Select the issue your device is experiencing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {issues.map((issue) => (
                    <Button
                      key={issue}
                      variant={formData.issue === issue ? "default" : "outline"}
                      onClick={() => handleChange("issue", issue)}
                      className={
                        formData.issue === issue
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border-border justify-start"
                      }
                    >
                      {issue}
                    </Button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Details
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Describe the issue in more detail..."
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="4"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Service Type Selection Card */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Choose Service Type</CardTitle>
                <CardDescription>
                  Select how you'd like to have your device repaired
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {serviceTypes.map((service) => (
                    <div
                      key={service.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.serviceType === service.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleChange("serviceType", service.id)}
                    >
                      <h3 className="font-semibold text-foreground mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">
                          {service.price}
                        </span>
                        <Badge variant="outline">{service.time}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info Card */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Your Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.contact}
                    onChange={(e) => handleChange("contact", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !formData.deviceType ||
                  !formData.issue ||
                  !formData.serviceType ||
                  !formData.contact
                }
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
              <Button variant="outline" className="bg-background border-border">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
