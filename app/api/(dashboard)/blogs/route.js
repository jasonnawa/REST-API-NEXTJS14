import connectDB from "@/lib/db"
import User from "@/lib/models/user";
import { Types } from "mongoose";
import Category from "@/lib/models/category";
import Blog from "@/lib/models/blog";
import { NextResponse } from "next/server";
import { title } from "process";
import { describe } from "node:test";

export const GET = async (req)=>{
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId');
        const categoryId = searchParams.get('categoryId');
        const searchKeywords = searchParams.get('keywords');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");



        
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
    
        const category = await Category.findById(categoryId)
        if (!category){
            return new NextResponse (
                JSON.stringify({message : "category not found in the database"}), 
                {status : 404}
            )
        }

        const filter = {
            user : userId,
            category : categoryId,
        }

        if(searchKeywords){
            filter.$or = [
                {
                    title : { $regex :searchKeywords, $options: "i"}
                },
                {
                    description : { $regex :searchKeywords, $options: "i" },
                }
            ]
        }

        if (startDate && endDate){
            filter.createdAt = {
                $gte : new Date(startDate),
                $lte : new Date(endDate),
            }
        }else if(startDate){
            filter.createdAt = {
                $gte : new Date(startDate),
            }
        }else if(endDate){
            filter.createdAt = {
                $lte : new Date(endDate),
            }
        }


        const skip = (page - 1) * limit


        const blogs = await Blog.find(filter).skip(skip).limit(limit)

        return new NextResponse ("blogs fetched successfully " + blogs, {status : 200})
    } catch (error) {
        return new NextResponse ("Error in fetching blogs " + error.message, {status : 500})
    }


}

export const POST = async (req)=>{
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId');
        const categoryId = searchParams.get('categoryId');

        const body = await req.json()
        const { title, description } = body
        
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
    
        const category = await Category.findById(categoryId)
        if (!category){
            return new NextResponse (
                JSON.stringify({message : "category not found in the database"}), 
                {status : 404}
            )
        }

        const newBlog = new Blog({
            title,
            description,
            user : userId,
            category : categoryId,
        })

        await newBlog.save();
        return new NextResponse (JSON.stringify({message : "Blog successfully created ", blog : newBlog}), {status : 500})
    }catch(error){
        return new NextResponse ("Error creating blog " + error.message, {status : 500})
    }
}