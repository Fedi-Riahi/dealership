import connectDatabase from "@/lib/database";
import News from '@/models/News'; // Assuming your News model is in a file called 'News.js'
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { image, title, category } = await request.json();
    
        await connectDatabase();
    
        await News.create({
            image,
            title,
            category
        });
    
        return NextResponse.json({ message: "News post created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating news post:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
