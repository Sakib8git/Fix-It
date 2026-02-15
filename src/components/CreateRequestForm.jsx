"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RepairLoader } from "@/components/Loading/RepairLoader";

export default function CreateRequestForm({ devices, issues, serviceTypes }) {
  const [formData, setFormData] = useState({
    deviceType: "",
    issue: "",
    serviceType: "",
    description: "",
    contact: "",
    price: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newTicketId = `FIX-${Math.floor(Math.random() * 10000)}`;

    const requestData = {
      ticketId: newTicketId,
      deviceType: formData.deviceType,
      issue: formData.issue,
      price: serviceTypes.find((s) => s.id === formData.serviceType)?.price,
      serviceTypeId: formData.serviceType,
      serviceTypeName: serviceTypes.find((s) => s.id === formData.serviceType)
        ?.name,
      description: formData.description,
      contact: formData.contact,
    };

    try {
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

  if (loading) {
    return <RepairLoader />;
  }

  // সফল সাবমিশন স্ক্রিন
  if (submitted) {
    return (
      <div className="flex-1 overflow-y-auto flex items-center justify-center h-full">
        <div className="p-6">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Request Submitted!
              </h1>
              <p className="text-muted-foreground">
                Your repair request has been received and is being processed.
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
              <Link
                href="/customer/history"
                className="w-full flex items-center justify-center rounded-md h-10 px-4 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
              >
                View My Repairs
              </Link>
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
                    price: "",
                  });
                }}
              >
                Create Another Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // মেইন ফর্ম
  return (
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
                onChange={(e) => handleChange("description", e.target.value)}
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
  );
}
