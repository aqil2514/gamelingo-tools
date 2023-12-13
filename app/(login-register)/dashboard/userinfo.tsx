"use client";

import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState, createContext, useContext } from "react";

const UserInfoContext = createContext<React.ComponentState | boolean>(null);

export default function UserInfo() {
  const session = useSession();
  const email = session?.data?.user?.email;
  const [infoInit, setInfoInit] = useState<React.ComponentState>();
  const [info, setInfo] = useState<React.ComponentState>();
  const [isReadMode, setIsReadMode] = useState<false | true>(true);
  const [passwordMode, setPasswordMode] = useState<false | true>(false);
  const [loading, setLoading] = useState<false | true>(false);
  const [editLoading, setEditLoading] = useState<false | true>(false);

  async function getInfo() {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/users");

      setInfo(data.user);
      setInfoInit(data.user);
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
        <UserInfoContext.Provider value={{ info, setInfo, infoInit, isReadMode, editLoading, setEditLoading, setIsReadMode, passwordMode, setPasswordMode }}>
          {!passwordMode && <Info />}
          {passwordMode && <Password />}
          {isReadMode && <ButtonPassword />}
        </UserInfoContext.Provider>
      )}
    </div>
  );
}

function Info() {
  const { info, setInfo, infoInit, editLoading, setEditLoading, isReadMode, setIsReadMode, passwordMode, setPasswordMode } = useContext(UserInfoContext);

  async function changeHandler() {
    try {
      const allow = confirm("Yakin ingin mengubah data?");
      if (!allow) {
        return;
      }

      setEditLoading(true);

      const { data } = await axios.post("/api/users", {
        username: (document.getElementById("username") as HTMLInputElement)?.value,
        name: (document.getElementById("name") as HTMLInputElement)?.value,
        email: (document.getElementById("email") as HTMLInputElement)?.value,
        id: infoInit?.id,
        typeAction: "update-info",
      });

      if (data.status === 200) {
        alert(data.msg);
        location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEditLoading(false);
    }
  }

  return (
    <>
      <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8 py-10">
        Username :
        <input
          type="text"
          name="username"
          id="username"
          value={info?.username}
          onChange={(e) => setInfo({ ...info, username: e.target.value })}
          placeholder="Masukkan Nama Anda..."
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          disabled={isReadMode || editLoading}
          required
        />
      </label>
      <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8 py-10">
        Nama Pemilik Akun :
        <input
          type="text"
          name="name"
          id="name"
          value={info?.name}
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
          placeholder="Masukkan Nama Anda..."
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          disabled={isReadMode || editLoading}
          required
        />
      </label>
      <label htmlFor="email" className="text-white text-base font-bold font-poppins my-8 py-10">
        Email :
        <input
          type="text"
          name="email"
          id="email"
          value={info?.email}
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
          placeholder="Masukkan Email Anda..."
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          disabled={isReadMode || editLoading}
          required
        />
      </label>
      <label htmlFor="role" className="text-white text-base font-bold font-poppins my-8 py-10">
        Role :
        {isReadMode ? (
          <input type="text" name="role" id="role" value="Pengguna" placeholder="Masukkan Nama Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" disabled={isReadMode || editLoading} required />
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
        disabled={editLoading}
        className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl"
      >
        {isReadMode ? "Edit Data" : "Batal Edit"}
      </button>
      {!isReadMode && (
        <button type="button" onClick={changeHandler} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl" disabled={editLoading}>
          {editLoading ? "Mengirim Data..." : "Ubah Data"}
        </button>
      )}
    </>
  );
}

function Password() {
  const { passwordMode, setPasswordMode, editLoading, setEditLoading, info, setInfo } = useContext(UserInfoContext);
  const [password, setPassword] = useState<React.ComponentState>({ oldPassword: "", newPassword: "", confirmNewPassword: "" });

  async function changeHandler() {
    try {
      setEditLoading(true);
      const allow = confirm("Yakin ingin ganti password?");
      if (!allow) {
        return;
      }

      const { data } = await axios.put("/api/users", {
        password,
        username: info?.username,
        putType: "changePassword",
      });

      if (data.status !== "ok") {
        alert(data.msg);
        return;
      }

      alert(data.msg);
      location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setEditLoading(false);
    }
  }

  return (
    <>
      <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8">
        Username :
        <input
          type="text"
          name="username"
          id="username"
          value={info?.username}
          onChange={(e) => setInfo({ ...info, username: e.target.value })}
          placeholder="Masukkan Nama Anda..."
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          disabled
          required
        />
      </label>
      <label htmlFor="old-password" className="text-white text-base font-bold font-poppins my-8">
        Kata Sandi Lama :
        <input
          type="password"
          name="old-password"
          id="old-password"
          value={password.oldPassword}
          onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
          placeholder="Masukkan kata sandi lama"
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          disabled={editLoading}
          required
        />
      </label>
      <label htmlFor="new-password" className="text-white text-base font-bold font-poppins my-8">
        Kata Sandi Baru :
        <input
          type="password"
          name="new-password"
          id="new-password"
          value={password.newPassword}
          onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
          placeholder="Masukkan kata sandi baru"
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          disabled={editLoading}
          required
        />
      </label>
      <label htmlFor="confirm-new-password" className="text-white text-base font-bold font-poppins my-8">
        Konfirmasi Kata Sandi Baru :
        <input
          type="password"
          name="confirm-new-password"
          id="confirm-new-password"
          value={password.confirmNewPassword}
          onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })}
          placeholder="Konfirmasi kata sandi baru"
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          disabled={editLoading}
          required
        />
      </label>
      <button type="button" onClick={changeHandler} disabled={editLoading} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
        {editLoading ? "Mengubah Kata Sandi..." : "Konfirmasi"}
      </button>
    </>
  );
}

function ButtonPassword() {
  const { setIsReadMode, isReadMode, setInfo, editLoading, infoInit, setPasswordMode, passwordMode } = useContext(UserInfoContext);

  return (
    <>
      {passwordMode && !editLoading && (
        <button
          type="button"
          onClick={() => {
            setPasswordMode(false);
            setInfo(infoInit);
          }}
          disabled={editLoading}
          className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl"
        >
          Batal
        </button>
      )}
      {!passwordMode && (
        <button
          type="button"
          onClick={() => {
            setPasswordMode(true);
            setInfo(infoInit);
          }}
          disabled={editLoading}
          className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl"
        >
          Ganti Password
        </button>
      )}
    </>
  );
}
