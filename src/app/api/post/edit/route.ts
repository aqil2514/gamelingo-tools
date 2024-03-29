import { CharacterEN } from "@/models/GenshinImpact/Character";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const game = searchParams.get("game") as General.AdminQuery["field"];
    const category = searchParams.get("category") as General.AdminQuery["subfield"];

    if(game === "genshin-impact"){
        if(category === "Character"){
            const characters = await CharacterEN.find() as GenshinImpact.Character[];
            const data = characters.map((c) => c.name);

            return NextResponse.json({data}, {status:200})
        }
    }

    return NextResponse.json({game, category}, {status:200})
}