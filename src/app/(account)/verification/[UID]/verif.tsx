"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Verification() {
  const { UID } = useParams();
  const [initInfo, setInitInfo] = useState<React.ComponentState>();
  const [info, setInfo] = useState<React.ComponentState>();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<false | true>(false);
  const [changeMode, setChangeMode] = useState<false | true>(false);
  const [codeLoading, setCodeLoading] = useState<false | true>(false);
  const router = useRouter();

  async function getInfo() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/users/verify");

      const selected = data.serializedVerify.find((s: any) => s.UID === UID.toString());
      if (!selected) {
        router.replace("/login");
      } else if (selected.account_verified === true) {
        router.replace("/");
      }

      setInitInfo(selected);
      setInfo(selected);
    } catch (error) {
      console.error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function clickHandler() {
    try {
      setCodeLoading(true);
      const { data } = await axios.post("/api/users", {
        typeAction: "code",
        UID: info?.UID,
        email: info?.email,
        code,
      });

      if (data.status !== "ok") {
        alert(data.msg);
        return;
      }

      alert(data.msg);
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setCodeLoading(false);
    }
  }

  async function resendHandler() {
    try {
      setCodeLoading(true);

      const { data } = await axios.put("/api/users/verify", {
        UID,
        email: info?.email,
        putType: "code",
      });

      alert(data.msg);
    } catch (error) {
    } finally {
      setCodeLoading(false);
    }
  }

  async function changeHandler() {
    try {
      setCodeLoading(true);

      const allow = confirm(`Yakin ingin ganti email jadi ${info?.email} ?`);
      if (!allow) {
        return;
      }

      const { data } = await axios.put("/api/users/verify", {
        putType: "email",
        UID,
        email: info?.email,
        oldEmail: initInfo?.email,
      });

      alert(data.msg);
      location.reload();
    } catch (error) {
    } finally {
      setCodeLoading(false);
    }
  }

  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      {loading ? (
        <p className="text-white text-base font-bold font-poppins">Mengambil Data...</p>
      ) : (
        <>
          <label htmlFor="email" className="text-white text-base font-bold font-poppins my-8 py-10">
            Email :
            <input
              type="email"
              name="email"
              id="email"
              value={info?.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
              disabled={!changeMode || (changeMode && codeLoading)}
              required
            />
          </label>
          <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8 py-10">
            Kode Verifikasi :
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]"
              name="name"
              id="name"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Masukkan Kode Verifikasi..."
              minLength={6}
              maxLength={6}
              disabled={codeLoading || changeMode}
              className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
              required
            />
          </label>
          {!codeLoading && !changeMode && (
            <button type="button" onClick={resendHandler} className="bg-rose-950 disabled:text-black disabled:bg-slate-50 px-6 py-2 block mx-auto font-poppins my-4 font-bold text-white text-xl rounded-xl">
              {codeLoading ? "Mengirim via Email..." : "Kirim ulang"}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setChangeMode(!changeMode);
              setInfo(initInfo);
            }}
            disabled={codeLoading}
            className="bg-rose-950 disabled:text-black disabled:bg-slate-50 px-6 py-2 block mx-auto font-poppins my-4 font-bold text-white text-xl rounded-xl"
          >
            {changeMode ? "Batal" : "Ganti Email"}
          </button>

          {changeMode && (
            <button type="button" onClick={changeHandler} disabled={codeLoading} className="bg-rose-950 disabled:text-black disabled:bg-slate-50 px-6 py-2 block mx-auto font-poppins my-4 font-bold text-white text-xl rounded-xl">
              {codeLoading ? "Mengganti Email" : "Konfirmasi"}
            </button>
          )}

          {!changeMode && (
            <button
              type="button"
              onClick={clickHandler}
              disabled={code.length <= 4 || codeLoading}
              className="bg-rose-950 disabled:text-black disabled:bg-slate-50 px-6 py-2 block mx-auto font-poppins my-4 font-bold text-white text-xl rounded-xl"
            >
              {codeLoading ? "Mohon Tunggu..." : "Kirim Kode Verifikasi"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
