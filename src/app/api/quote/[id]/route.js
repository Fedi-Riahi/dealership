import connectDatabase from "@/lib/database";
import Quote from "@/models/Quote";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID parameter is missing" }, { status: 400 });
    }

    await connectDatabase();
    const quote = await Quote.findById(id);

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const requestData = await request.json();
    await connectDatabase();

    // Find the quote by ID and update its properties
    await Quote.findByIdAndUpdate(id, requestData);

    return NextResponse.json({ message: "Quote updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json({ message: "Failed to update quote", error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectDatabase();

    // Find the quote by ID and delete it
    const deletedQuote = await Quote.findByIdAndDelete(id);
    if (!deletedQuote) {
      return NextResponse.json({ message: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Quote deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json({ message: "Failed to delete quote" }, { status: 500 });
  }
}
