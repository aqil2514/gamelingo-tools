import { translate } from "bing-translate-api";
import { NextRequest, NextResponse } from "next/server";

interface TranslationData {
  text: string;
  userLang: "auto-detect" | string;
  translation: string;
  language: {
    from: string;
    to: string;
    score: number;
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const text: string = body.text;

  const translation = (await translate(text, null, "id")) as TranslationData;
  const translatedText = translation.translation;

  return NextResponse.json({ translatedText }, { status: 200 });
}