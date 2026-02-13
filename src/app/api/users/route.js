
import { getCollection } from "@/lib/dbConntect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // ১. কালেকশন কানেক্ট করা
    const usersCollection = await getCollection("users");
    
    // ২. ডাটা খুঁজে বের করা
    const result = await usersCollection.find().toArray();
    
    // ৩. রেসপন্স পাঠানো
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const usersCollection = await getCollection("users");
    const result = await usersCollection.insertOne(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

// const { connect } = require("@/lib/dbConntect");

// export async function GET(request) {
//   const usersCollection = await connect("users");
//   const result = await usersCollection.find().toArray();
//   return Response.json(result);
// }