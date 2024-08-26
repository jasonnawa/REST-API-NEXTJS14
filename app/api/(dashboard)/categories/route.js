import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import connectDB from "@/lib/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server"

export const GET = async (req)=>{
try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId');

    if(!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message: "invalid or missing user ID"}), {status: 400})
    }

    await connectDB();

    const user = await User.findById(userId)

    if (!user){
        return new NextResponse (
            JSON.stringify({message : "User not found in the database"}), 
            {status : 400}
        )
    }

    const categories = await Category.find({
        user : new Types.ObjectId(userId),
    })

    return new NextResponse(categories, {status: 200})
} catch (error) {
    
    return new NextResponse ("Error in fetching categories " + error.message, {status : 500})
       
}
}



export const POST = async (req)=>{
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId');

        const { title } = await req.json()
    
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "invalid or missing user ID"}), {status: 400})
        }

        await connectDB()

        const user = await User.findById(userId)

        
        if (!user){
            return new NextResponse (
                JSON.stringify({message : "User not found in the database"}), 
                {status : 400}
            )
        }

        const newCategory = new Category({
            title,
            user : new Types.ObjectId(userId),
        })

        await newCategory.save();

        return new NextResponse (
            JSON.stringify({message : "category successfully created"}), 
            {status : 200}
        )
}catch(error){
    return new NextResponse ("Error in creating category " + error.message, {status : 500})
}
}