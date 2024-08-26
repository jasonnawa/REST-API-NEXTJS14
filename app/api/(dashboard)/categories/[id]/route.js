import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import connectDB from "@/lib/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server"


export const PATCH = async (req, context)=>{
    const categoryId = context.params.id
    console.log(categoryId)
    try {
       const body = await req.json() 
       const {title} = body

       const { searchParams } = new URL(req.url)
       const userId = searchParams.get('userId');

       if (!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message: "Invalid or missing user ID"}), {status: 400})
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)){
        return new NextResponse(JSON.stringify({message: "Invalid or missing category id"}), {status: 400})
        }

        await connectDB();
        const user = await User.findById(userId)
        
        if (!user){
            return new NextResponse (
                JSON.stringify({message : "User not found in the database"}), 
                {status : 404}
            )
        }
    
        const category = await Category.findOne({_id : categoryId, user: userId})
        if (!category){
            return new NextResponse (
                JSON.stringify({message : "category not found in the database"}), 
                {status : 404}
            )
        }
    
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { title },
            { new : true }
        )

        return new NextResponse (
            JSON.stringify({message : "category is updated"}), 
            {status : 200}
        )
    } catch (error) {
        return new NextResponse ("Error in updating category " + error.message, {status : 500})
    }
}

export const DELETE = async (req, context)=>{
    const categoryId = context.params.id
    try {
       
       const { searchParams } = new URL(req.url)
       const userId = searchParams.get('userId');

       if (!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message: "Invalid or missing user ID"}), {status: 400})
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)){
        return new NextResponse(JSON.stringify({message: "Invalid or missing category id"}), {status: 400})
        }

        await connectDB();
        const user = await User.findById(userId)
        
        if (!user){
            return new NextResponse (
                JSON.stringify({message : "User not found in the database"}), 
                {status : 404}
            )
        }
    
        const category = await Category.findOne({_id : categoryId, user: userId})
        if (!category){
            return new NextResponse (
                JSON.stringify({message : "category not found in the database"}), 
                {status : 404}
            )
        }
    
       await Category.findByIdAndDelete(categoryId)

        return new NextResponse (
            JSON.stringify({message : "category is deleted"}), 
            {status : 200}
        )
    } catch (error) {
        return new NextResponse ("Error in deleting category " + error.message, {status : 500})
    }
}
