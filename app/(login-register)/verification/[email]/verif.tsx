"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Verification() {
  const { email } = useParams();
  const [info, setInfo] = useState<React.ComponentState>();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<false | true>(false);
  const [codeLoading, setCodeLoading] = useState<false | true>(false);
  const router = useRouter();

  let userEmail: string;
  if (typeof email === "string") {
    userEmail = email.replace("%40", "@");
  } else {
    userEmail = email[0].replace("%40", "@");
  }

  async function getInfo() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/users");

      const selected = data.users.find((s: any) => s.email === userEmail);
      if (!selected) {
        router.replace("/login");
      } else if (selected.account_verified === true) {
        router.replace("/");
      }

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
        email: userEmail,
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

  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      {loading ? (
        <p className="text-white text-base font-bold font-poppins">Mengambil Data...</p>
      ) : (
        <>
          <label htmlFor="email" className="text-white text-base font-bold font-poppins my-8 py-10">
            Email :
            <input type="email" name="email" id="email" value={info?.email} className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" disabled required />
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
              disabled={codeLoading}
              className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
              required
            />
          </label>
          <button
            type="button"
            onClick={clickHandler}
            disabled={code.length <= 4 || codeLoading}
            className="bg-rose-950 disabled:text-black disabled:bg-slate-50 px-6 py-2 block mx-auto font-poppins my-4 font-bold text-white text-xl rounded-xl"
          >
            {codeLoading ? "Mohon Tunggu..." : "Kirim Kode Verifikasi"}
          </button>
        </>
      )}
    </div>
  );
}
