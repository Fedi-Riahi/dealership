// routes/api/carBrands.js
// routes/api/carBrands.js
import connectDatabase from "@/lib/database";
import CarBrand from '@/models/CarBrand';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name, models, coverImage } = await request.json();

        await connectDatabase();

        // Check if the brand already exists
        const existingBrand = await CarBrand.findOne({ name });

        if (existingBrand) {
            return NextResponse.json({ message: "Brand with this name already exists" }, { status: 400 });
        }

        // Create a new CarBrand
        const newCarBrand = new CarBrand({ name, models, coverImage });

        // Save the brand and models
        await newCarBrand.save();

        console.log("Created CarBrand:", newCarBrand);

        const savedBrand = await CarBrand.findOne({ name }); // Retrieve the saved brand for verification
        console.log("Saved CarBrand:", savedBrand);

        return NextResponse.json({ message: "Car Brand Created", data: newCarBrand }, { status: 201 });
    } catch (error) {
        console.error("Error creating Car Brand:", error);
        return NextResponse.json({ message: "Error creating Car Brand" }, { status: 500 });
    }
}




export async function GET(){

    await connectDatabase()
    const carBrand = await CarBrand.find()

    return  NextResponse.json({carBrand});
}