import connectDB from "@/lib/db"
import User from "@/lib/models/user";
import { Types } from "mongoose";
import Category from "@/lib/models/category";
import Blog from "@/lib/models/blog";
import { NextResponse } from "next/server";


export const GET = async (req, context)=>{
    const blogId = context.params.id
    try {

        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId');
        const categoryId = searchParams.get('categoryId');
        
       if (!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message: "Invalid or missing user ID"}), {status: 400})
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)){
        return new NextResponse(JSON.stringify({message: "Invalid or missing category id"}), {status: 400})
        }

        if (!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing blog id"}), {status: 400})
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

        const blog = await Blog.findOne({
            _id : blogId,
            user: userId,
            category: categoryId,
    })

    if (!blog){
        return new NextResponse (
            JSON.stringify({message : "blog not found in the database"}), 
            {status : 404}
        )
    }

    return new NextResponse (
        JSON.stringify({message : "blog successfully fetched", blog :blog}), 
        {status : 200}
    )

    } catch (error) {
        return new NextResponse ("Error fetching blog " + error.message, {status : 500})
    }
    
}


export const PATCH = async (req, context)=>{
    const blogId = context.params.id
    try {
        const body = await req.json()
        const { title, description } = body
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId');
       
        
       if (!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message: "Invalid or missing user ID"}), {status: 400})
        }

        if (!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing blog id"}), {status: 400})
            }

        await connectDB();  
        
        const user = await User.findById(userId)
        if (!user){
            return new NextResponse (
                JSON.stringify({message : "User not found in the database"}), 
                {status : 404}
            )
        }

        const blog = await Blog.findOne({
            _id : blogId,
            user: userId,
    })

    if (!blog){
        return new NextResponse (
            JSON.stringify({message : "blog not found in the database"}), 
            {status : 404}
        )
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {$set:{title : title, description : description}},
        { new : true }
    )
 

    return new NextResponse (
        JSON.stringify({message : "blog successfully updated", blog : updatedBlog}), 
        {status : 200}
    )

    } catch (error) {
        return new NextResponse ("Error updating blog " + error.message, {status : 500})
    }
    
}


export const DELETE = async (req, context)=>{
    const blogId = context.params.id
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId');
       
        
       if (!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(JSON.stringify({message: "Invalid or missing user ID"}), {status: 400})
        }

        if (!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing blog id"}), {status: 400})
            }

        await connectDB();  
        
        const user = await User.findById(userId)
        if (!user){
            return new NextResponse (
                JSON.stringify({message : "User not found in the database"}), 
                {status : 404}
            )
        }

        const blog = await Blog.findOne({
            _id : blogId,
            user: userId,
    })

    if (!blog){
        return new NextResponse (
            JSON.stringify({message : "blog not found in the database"}), 
            {status : 404}
        )
    }

     await Blog.findByIdAndDelete(blogId)
 

    return new NextResponse (
        JSON.stringify({message : "blog successfully deleted"}), 
        {status : 200}
    )

    } catch (error) {
        return new NextResponse ("Error deleting blog " + error.message, {status : 500})
    }
    
}