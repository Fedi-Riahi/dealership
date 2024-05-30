import connectDatabase from "@/lib/database";
import Quote from "@/models/Quote";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const {
        firstName, // Match field name with the frontend
        email,
        date,
        phoneNumber,
        carId,
      } = await request.json();
  
      // Check if carId is provided
      if (!carId) {
        return NextResponse.json({ error: "carId is required" }, { status: 400 });
      }
  
      // Create the quote
      await connectDatabase();
  
      await Quote.create({
        firstName, // Match field name with the frontend
        email,
        date,
        phoneNumber,
        carId,
      });
  
      return NextResponse.json(
        { message: "Quote created successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating quote:", error);
      return NextResponse.json(
        { error: "Failed to create quote" },
        { status: 500 }
      );
    }
  }
  

export async function GET(request) {
  try {
    await connectDatabase();
    const quotes = await Quote.find();
    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
