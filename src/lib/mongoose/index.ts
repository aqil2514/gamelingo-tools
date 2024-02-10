import mongoose, { ConnectOptions, Connection } from "mongoose";

export const evertaleConnection:Connection = mongoose.createConnection(`${process.env.MONGODB_URI_EVERTALE}`);
export const genshinConnection:Connection = mongoose.createConnection(`${process.env.MONGODB_URI_GENSHIN}`)
