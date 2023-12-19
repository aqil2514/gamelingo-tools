import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { comment } = await req.json();

  return NextResponse.json({ comment }, { status: 200 });
}
