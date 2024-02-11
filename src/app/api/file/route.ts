import axios from "axios";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
    console.log(res);
res.json({msg:"ok"})
}
