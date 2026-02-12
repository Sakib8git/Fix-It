import { getCollection } from "@/lib/dbConntect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    // ডাটাবেস কানেকশন এবং কালেকশন সিলেক্ট করা
    const requestCollection = await getCollection("repair_requests");
    // ডাটা ইনসার্ট করা
    const result = await requestCollection.insertOne({
      ...body,
      createdAt: new Date(), // কখন রিকোয়েস্ট এসেছে তার সময়
      status: "Pending", // ডিফল্ট স্ট্যাটাস
    });
    return NextResponse.json({
      message: "Request submitted successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Failed to submit request" },
      { status: 500 },
    );
  }
}
