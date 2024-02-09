import mongoose, { ConnectOptions } from "mongoose";

/** Connect to Mongo DB
 * @param {"evertale" | "genshinimpact"} db - Nama Database.
 * Daftar nama Database :
 * - Evertale : "evertale"
 * - Genshin Impact : "genshinimpact"
 */
const connectMongoDB = async (db: "evertale" | "genshinimpact" = "evertale"): Promise<void> => {
  try {
    if (db==="evertale")await mongoose.connect(`${process.env.MONGODB_URI}`);
    else if (db==="genshinimpact")await mongoose.connect(`${process.env.MONGODB_URI_Genshin}`);
    console.log(`Connected to ${db} Collection`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// export const dbName = mongoose.connection.db.databaseName;

export const destroyDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB Disconnected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;
