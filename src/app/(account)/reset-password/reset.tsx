"use client";
import { notif } from "@/utils/fe";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function ResetForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/reset-password", {
        email,
      });

      notif(data.msg, { color: "green", refElement: "button-send", location: "before" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, { color: "red", refElement: "button-send", location: "before" });
        }
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <form onSubmit={submitHandler}>
        <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8">
          Email:
          <input disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Email..." className="block w-full py-2 rounded-lg px-2 text-zinc-950" />
        </label>
        <button id="button-send" disabled={loading} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
          {loading ? "Tunggu sebentar..." : "Pulihkan"}
        </button>
      </form>
    </div>
  );
}
