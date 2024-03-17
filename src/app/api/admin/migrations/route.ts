import { evertaleConnection } from "@/lib/mongoose";
import mongoose, { connection } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");
    // const data = evertaleConnection.modelNames()
    return NextResponse.json({msg:"oke", category}, {status:200})
}