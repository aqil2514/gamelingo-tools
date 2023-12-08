import { ObjectId } from "mongodb";
import clientPromise from ".";

let client, db, chars, conjures, generals, passiveskills, leaderskills, weapons;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    chars = await db.collection("characters");
    conjures = await db.collection("conjures");
    generals = await db.collection("generals");
    leaderskills = await db.collection("leaderskills");
    passiveskills = await db.collection("passiveskills");
    weapons = await db.collection("weapons");
  } catch (error) {
    throw new Error("Koneksi gagal ke database");
  }
}

async () => {
  await init();
};

export async function getChars() {
  try {
    if (!chars) await init();
    const result = await chars
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { chars: result };
  } catch (error) {
    return { error: "Gagal mengambil data" };
  }
}

export async function getConjures() {
  try {
    if (!conjures) await init();
    const result = await conjures
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { conjures: result };
  } catch (error) {
    return { error: "Gagal mengambil data" };
  }
}

export async function addConjures(data) {
  try {
    if (!conjures) await init();
    const insertResult = await conjures.insertMany([data]);
    console.log("Inserted documents =>", insertResult);
    const success = `Conjures dengan nama ${data.name} berhasil ditambah`;
    return success;
  } catch (error) {
    return { error: "Aksi gagal" };
  }
}

export async function addChars(data) {
  try {
    if (!chars) await init();
    const insertResult = await chars.insertMany([data]);
    console.log("Inserted documents =>", insertResult);
  } catch (error) {
    return { error: "Aksi gagal" };
  }
}
export async function addLeaderSkill(data) {
  try {
    if (!leaderskills) await init();
    const insertResult = await leaderskills.insertMany([data]);
    console.log("Inserted documents =>", insertResult);
    const success = `Leader Skill dengan nama ${data.name} berhasil ditambah. Silahkan reload halaman`;
    return success;
  } catch (error) {
    return { error: "Aksi gagal" };
  }
}

export async function deleteConjures(data) {
  try {
    if (!conjures) await init();
    const deleteResult = await conjures.deleteMany({ name: { $in: data } });
    console.log("Deleted documents =>", deleteResult);
  } catch (error) {
    console.error("Error deleting documents:", error);
    return { error: "Aksi gagal" };
  }
}

export async function deleteCharacters(data) {
  try {
    if (!chars) {
      await init();
    }

    if (chars) {
      const objectID = new ObjectId(data);
      const deleteResult = await chars.deleteMany({ _id: objectID });
      if (deleteResult.deletedCount <= 0) {
        console.log("Tidak ada data yang dihapus");
        return;
      }
      console.log("Deleted documents =>", deleteResult);
    } else {
      console.error("Kesalahan: chars tidak terdefinisi");
    }
  } catch (error) {
    console.error("Error deleting documents:", error);
    return { error: "Aksi gagal" };
  }
}

export async function updateConjures(...data) {
  try {
    if (!conjures) await init();
    const updateResult = await conjures.updateOne(
      { name: data[0] },
      {
        $set: {
          name: data[1],
          link: data[2],
        },
      }
    );
    console.log("Update documents =>", updateResult);
  } catch (error) {
    console.error("Error Updating documents:", error);
    return { error: "Aksi gagal" };
  }
}

export async function updateCharacters(data) {
  try {
    if (!chars) await init();

    const objectID = new ObjectId(data._id);

    const updateResult = await chars.updateOne(
      { _id: objectID },
      {
        $set: {
          charImage: data.charImage,
          charIntro: data.charIntro,
          charProfile: data.charProfile,
          charStatus: data.charStatus,
          nASkill: data.nASkill,
          nPSkill: data.nPSkill,
        },
      }
    );
    console.log("Update documents =>", updateResult);
  } catch (error) {
    console.error("Error Updating documents:", error);
    return { error: "Aksi gagal" };
  }
}

export async function getGenerals() {
  try {
    if (!generals) await init();
    const result = await generals
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { generals: result };
  } catch (error) {
    return { error: "Gagal mengambil data" };
  }
}

export async function getLeaderSkills() {
  try {
    if (!leaderskills) await init();
    const result = await leaderskills
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { leaderskills: result };
  } catch (error) {
    return { error: "Gagal mengambil data" };
  }
}

export async function getPassiveSkills() {
  try {
    if (!passiveskills) await init();
    const result = await passiveskills
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { passiveskills: result };
  } catch (error) {
    return { error: "Gagal mengambil data" };
  }
}

export async function getWeapons() {
  try {
    if (!weapons) await init();
    const result = await weapons
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { weapons: result };
  } catch (error) {
    return { error: "Gagal mengambil data" };
  }
}
