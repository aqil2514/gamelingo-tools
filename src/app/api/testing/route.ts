import connectMongoDB from "@/lib/mongoose";
import Character from "@/models/Evertale/Characters";
import { Weapon } from "@/models/Evertale/Weapons";
import Post from "@/models/General/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const weapons = await Weapon.find();
  const chars = await Character.find();

  const post = await Post.find();
  const char = await Post.findById("65977574843c76e0ccd52200").populate("content");
  const weapon = await Post.findById("65977574843c76e0ccd521d8").populate("content");

  return NextResponse.json({ post, char, weapon }, { status: 200 });
}

// **************************MIGRATTION FUNCTION********************
// const post = await Post.find({ "game.topic": "Weapons" });

// const post = await Post.findById("65976fe4843c76e0ccd50b70").populate("content");

// return NextResponse.json({ weapons }, { status: 200 });

// for (const weapon of weapons) {
//   const data = {
//     title: weapon.weapName,
//     game: {
//       name: "Evertale",
//       topic: "Weapon",
//     },
//     content: weapon._id,
//     author: "Admin GameLingo",
//     tags: [],
//     comment: [],
//   };

//   await Post.create(data);
// }

// for (const char of chars) {
//   const data = {
//     title: char.charStatus.charName,
//     game: {
//       name: "Evertale",
//       topic: "Character",
//     },
//     content: char._id,
//     author: "Admin GameLingo",
//     tags: [],
//     comment: [],
//   };

//   await Post.create(data);
// }
