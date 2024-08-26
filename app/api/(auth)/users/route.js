import connectDB from "@/lib/db"
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server"


const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async ()=>{
    try {
        await connectDB();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status : 200});
    } catch (error) {
        return new NextResponse("Error in fetching USers" + error.message, {status : 500})
    
    }
}

export const POST = async (req)=>{
    try {
        await connectDB();
        const body = await req.json()
        const newUser = new User(body)
        await newUser.save()

        return new NextResponse (JSON.stringify({message: "User is  created", user : newUser}, {status : 200}))
        
    } catch (error) {
        return new NextResponse("Error in creating new user" + error.message, {status : 500})
    }
}

export const PATCH = async (req)=>{
    try {
        await connectDB();
        const body = await req.json()
        const {userId, newUsername} = body;

        if (!userId || !newUsername){
            return new NextResponse(JSON.stringify({message: "ID or username not found"}), {status: 400})
        }

        if (!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid user ID"}), {status: 400})
        }

        const updatedUser = await User.findOneAndUpdate(
           { _id : new ObjectId(userId) },
           { username : newUsername },
           { new : true}
        );

        if(!updatedUser){
            return new NextResponse (
                JSON.stringify({message : "User not found in the database"}), 
                {status : 400}
            )
        }

        return new NextResponse (
            JSON.stringify({message : "User is updated", user : updatedUser}), 
            {status : 200}
        )
        
    } catch (error) {
        return new NextResponse ("Error in updating user " + error.message, {status : 500})
    }
}

export const DELETE = async (req)=>{
    try {
        
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId');

        if (!userId ){
            return new NextResponse(JSON.stringify({message: "ID not found"}), {status: 400})
        }

        if (!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid user ID"}), {status: 400})
        }
        await connectDB()

        const deletedUser = await User.findByIdAndDelete(userId)

        if (!deletedUser){
            return new NextResponse (
                JSON.stringify({message : "User not found in the database"}), 
                {status : 400}
            )
        }

        return new NextResponse (
            JSON.stringify({message : "User successfully deleted"}), 
            {status : 200}
        )

    } catch (error) {
        return new NextResponse ("Error in deleting user " + error.message, {status : 500})
        
    }
}