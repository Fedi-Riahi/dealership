import connectDatabase from "@/lib/database";
import CarModel from '@/models/CarModel';
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID parameter is missing" }, { status: 400 });
        }

        await connectDatabase();
        const model = await CarModel.findById(id);

        if (!model) {
            return NextResponse.json({ error: "Model not found" }, { status: 404 });
        }

        return NextResponse.json({ model });
    } catch (error) {
        console.error("Error fetching model:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
  
    try {
      await connectDatabase();
  
      // Find the car part by ID and delete it
      const deletedModel = await CarModel.findByIdAndDelete(id);
      if (!deletedModel) {
        return NextResponse.json({ message: "Car model not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Car model deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting Car model:", error);
      return NextResponse.json({ message: "Failed to delete Car model" }, { status: 500 });
    }
  }