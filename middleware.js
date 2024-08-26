import { NextResponse } from "next/server";


export const config = {

    matcher : "/api/:path",
};

//middleware for protecting routes using NextAuth / other methods
//Will be created soon

export default function middleware(req){
    return NextResponse.next()
}