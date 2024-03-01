import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const dataType = req.headers.get("DB-Content") as General.GameGenshinQuery["subfield"] | null;

  if (!dataType) return NextResponse.json({ msg: "Tipe Data yang ingin dihapus kosong" }, { status: 400 });
}
