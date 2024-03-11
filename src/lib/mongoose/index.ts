import mongoose, { ConnectOptions, Connection } from "mongoose";

const config: ConnectOptions = {
  maxPoolSize: 10,
  minPoolSize: 1,
};

// Membuat koneksi evertale
let evertaleConnection: Connection;
try {
  evertaleConnection = mongoose.createConnection(`${process.env.MONGODB_URI_EVERTALE}`, config);
  console.info("Koneksi evertale berhasil dibuat.");
} catch (error) {
  console.error("Kesalahan saat membuat koneksi evertale:", error);
}

// Membuat koneksi genshin
let genshinConnection: Connection;
try {
  genshinConnection = mongoose.createConnection(`${process.env.MONGODB_URI_GENSHIN}`, config);
  console.info("Koneksi genshin berhasil dibuat.");
} catch (error) {
  console.error("Kesalahan saat membuat koneksi genshin:", error);
}

// Membuat koneksi general
let generalConnection: Connection;
try {
  generalConnection = mongoose.createConnection(`${process.env.MONGODB_URI_GENERAL}`, config);
  console.info("Koneksi general berhasil dibuat.");
} catch (error) {
  console.error("Kesalahan saat membuat koneksi general:", error);
}

// Mengekspor koneksi yang berhasil dibuat
export { evertaleConnection, genshinConnection, generalConnection };
