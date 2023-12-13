"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Verify() {
  const [loading, setLoading] = useState<false | true>(false);
  const [loadingPage, setLoadingPage] = useState<false | true>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<React.ComponentState>({ new: "", confirmNew: "" });
  const router = useRouter();
  const { UID } = useParams();

  async function getInfo() {
    try {
      setLoadingPage(true);
      const { data } = await axios.get(`/api/users/reset-password?UID=${UID}`);

      if (data.status === 404) {
        alert(data.msg);
        router.replace("/");
      }

      setEmail(data.email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/api/users/reset-password", {
        email,
        password,
      });

      if (data.status !== 200) {
        alert(data.msg);
        return;
      }
      alert(data.msg);
      router.replace("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return loadingPage ? (
    <h1 className="text-white text-center text-base font-bold font-poppins my-8">Loading...</h1>
  ) : (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="email" className="text-white text-base font-bold font-poppins my-8">
          Email:
          <input disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Memuat data..." className="block w-full py-2 rounded-lg px-2 text-zinc-950" />
        </label>
        <label htmlFor="password" className="text-white text-base font-bold font-poppins my-8">
          Kata sandi baru :
          <input
            disabled={loading}
            value={password.new}
            onChange={(e) => setPassword({ ...password, new: e.target.value })}
            type="password"
            name="password"
            id="password"
            placeholder="Masukkan kata sandi..."
            className="block w-full py-2 rounded-lg px-2 text-zinc-950"
          />
        </label>
        <label htmlFor="confirm-password" className="text-white text-base font-bold font-poppins my-8">
          Konfirmasi kata sandi:
          <input
            disabled={loading}
            value={password.confirmNew}
            onChange={(e) => setPassword({ ...password, confirmNew: e.target.value })}
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Konfirmasi kata sandi..."
            className="block w-full py-2 rounded-lg px-2 text-zinc-950"
          />
        </label>
        <button disabled={loading} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
          {loading ? "Tunggu sebentar..." : "Pulihkan"}
        </button>
      </form>
    </div>
  );
}
