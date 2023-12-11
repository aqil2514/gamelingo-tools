import LeaderSkills from "@/lib/mongodb/model/leaderSkill";
import Characters from "@/lib/mongodb/model/character";
import { NextResponse } from "next/server";

export async function GET() {
  const leaderSkill = await LeaderSkills.find();
  const chars = await Characters.find();

  return NextResponse.json({ leaderSkill, chars });
}
