"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [loading, setLoading] = useState<false | true>(false);
  const router = useRouter();

  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/users", {
        name: (document.getElementById("name") as HTMLInputElement)?.value,
        username: (document.getElementById("username") as HTMLInputElement)?.value,
        password: (document.getElementById("password") as HTMLInputElement)?.value,
        confirmPassword: (document.getElementById("confirm-password") as HTMLInputElement)?.value,
        email: (document.getElementById("email") as HTMLInputElement)?.value,
        typeAction: "register",
      });

      if (data.status === "no-data") {
        alert(data.msg);
        return;
      } else if (data.status === "less-username") {
        alert(data.msg);
        return;
      } else if (data.status === "less-password") {
        alert(data.msg);
        return;
      } else if (data.status === "incorrect-password") {
        alert(data.msg);
        return;
      } else if (data.status === "found-user") {
        alert(data.msg);
        return;
      } else if (data.status === "email-found") {
        alert(data.msg);
        return;
      }

      alert(data.msg);
      router.push("/login");
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <form onSubmit={(e) => handlerSubmit(e)}>
        <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8 py-10">
          Nama :
          <input type="text" name="name" id="name" placeholder="Masukkan Nama Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
        </label>
        <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8">
          Username :
          <input type="text" minLength={8} name="username" id="username" placeholder="Masukkan Username Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
        </label>
        <label htmlFor="password" className="text-white text-base font-bold font-poppins my-8">
          Kata Sandi :
          <input type="password" minLength={8} name="password" id="password" placeholder="Masukkan Kata Sandi Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
        </label>
        <label htmlFor="confirm-password" className="text-white text-base font-bold font-poppins my-8">
          Konfirmasi Kata Sandi :
          <input type="password" minLength={8} name="confirm-password" id="confirm-password" placeholder="Masukkan Kata Sandi Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
        </label>
        <label htmlFor="email" className="text-white text-base font-bold font-poppins my-8">
          Email :
          <input type="email" name="email" id="email" placeholder="Masukkan Email Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
        </label>
        <input type="hidden" name="typeAction" id="typeAction" value="register" />
        <Link href="/login" className="text-xs sm:text-base text-white font-poppins underline my-2 inline cursor-pointer ms-2">
          Punya akun?
        </Link>
        <button className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl" disabled={loading}>
          {loading ? "Mengirim Data..." : "Daftar Sekarang"}
        </button>
      </form>
    </div>
  );
}
