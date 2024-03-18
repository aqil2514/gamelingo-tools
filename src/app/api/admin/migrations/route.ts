import { migrationTypeGuard } from "@/components/Admin/Migrations/helper";
import { evertaleConnection } from "@/lib/mongoose";
import { genshinMigration } from "@/utils/Api/Migrations/genshin";
import mongoose, { connection } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category") as
    | General.AdminQuery["field"]
    | null;
  const topic = searchParams.get("topic");

  if (!category) throw new Error("Category belum diisi");
  if (!topic) throw new Error("Topic belum diisi");

  if (category === "genshin-impact" && migrationTypeGuard.genshinTopic(topic)) {
    if (topic === "Character") {
      const data = await genshinMigration.character();

      // return NextResponse.json({ msg: "oke", data }, { status: 200 });
      res.setHeader('Content-Type', 'image/jpg')
      return res.send({ msg: "oke", data }, { status: 200 });
    }
  }
}
