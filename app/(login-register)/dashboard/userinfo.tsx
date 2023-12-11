"use client";

import Data from "@/app/components/Data";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const session = useSession();
  const username = session?.data?.user?.name;
  const [infoInit, setInfoInit] = useState<React.ComponentState>();
  const [info, setInfo] = useState<React.ComponentState>();
  const [isReadMode, setIsReadMode] = useState<false | true>(true);
  const [loading, setLoading] = useState<false | true>(false);

  async function getInfo() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/users");

      console.log(username);

      const user = data.users.users.find((u: React.ComponentState) => u.username === username);
      setInfo(user);
      setInfoInit(user);
      console.log(user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      {loading ? (
        <p className="text-white text-base font-bold font-poppins">Mengambil Data...</p>
      ) : (
        <>
          <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8 py-10">
            Username :
            <input
              type="text"
              name="name"
              id="name"
              value={info?.username}
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
              placeholder="Masukkan Nama Anda..."
              className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
              disabled={isReadMode}
              required
            />
          </label>
          <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8 py-10">
            Nama Pengguna :
            <input
              type="text"
              name="name"
              id="name"
              value={info?.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              placeholder="Masukkan Nama Anda..."
              className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
              disabled={isReadMode}
              required
            />
          </label>
          <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8 py-10">
            Email :
            <input
              type="text"
              name="name"
              id="name"
              value={info?.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              placeholder="Masukkan Nama Anda..."
              className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
              disabled={isReadMode}
              required
            />
          </label>
          <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8 py-10">
            Role :
            {isReadMode ? (
              <input type="text" name="name" id="name" value="Pengguna" placeholder="Masukkan Nama Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" disabled={isReadMode} required />
            ) : (
              <select name="set-role" id="set-role" className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2">
                <option value="Pengguna">Pengguna</option>
                <option value="null" disabled>
                  General Admin (Belum Tersedia)
                </option>
                <option value="null" disabled>
                  Admin (Belum Tersedia)
                </option>
                <option value="null" disabled>
                  Moderator (Belum Tersedia)
                </option>
              </select>
            )}
          </label>
          <button
            type="button"
            onClick={() => {
              setIsReadMode(!isReadMode);
              setInfo(infoInit);
            }}
            className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl"
          >
            {isReadMode ? "Edit Data" : "Batal Edit"}
          </button>
          {!isReadMode && (
            <button type="button" onClick={() => alert("Fitur belum tersedia")} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
              Ubah Data
            </button>
          )}
        </>
      )}
    </div>
  );
}
