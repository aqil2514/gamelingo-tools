"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Verify() {
  const [loading, setLoading] = useState<false | true>(false);
  const [email, setEmail] = useState<string>("");
  const { UID } = useParams();

  async function getInfo() {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/users/reset-password?UID=${UID}`);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/reset-password", {
        email,
      });

      if (data.status !== 200) {
        alert(data.msg);
        return;
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8">
          Email:
          <input disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Email..." className="block w-full py-2 rounded-lg px-2 text-zinc-950" />
        </label>
        <button disabled={loading} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
          {loading ? "Tunggu sebentar..." : "Pulihkan"}
        </button>
      </form>
    </div>
  );
}
