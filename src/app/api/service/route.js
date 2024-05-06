import connectDatabase from "@/lib/database";
import Service from '@/models/Service';
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
      await connectDatabase();
      const services = await Service.find();
  
      return NextResponse.json({ services });
    } catch (error) {
      console.error("Error fetching services:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
