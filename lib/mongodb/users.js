import { ObjectId } from "mongodb";
import clientPromise from ".";

let client, db, users;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    users = await db.collection("users");
  } catch (error) {
    throw new Error("Koneksi gagal ke database");
  }
}

export async function getUsers(data) {
  try {
    if (!users) await init();
    const result = await users
      .find({ username: data })
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { users: result };
  } catch (error) {
    return { error: "Gagal mengambil data" };
  }
}
