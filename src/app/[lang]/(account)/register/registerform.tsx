"use client";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { baseUrl } from "@/lib/Data";
import { NotifConfig, notif } from "@/utils/fe";
import { Link } from "@/navigation";

export default function RegisterForm() {
  const [loading, setLoading] = useState<false | true>(false);
  const router = useRouter();

  useEffect(() => {
    alert("Fitur login dan register baru bisa dirasakan oleh kontributor situs.\n Next akan ada fitur untuk para pengunjung situs");
  }, []);

  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    const notifConfigSuccess: NotifConfig = {
      color: "green",
      refElement: "submit-button",
      location: "before",
    };

    e.preventDefault();
    try {
      // Check: Fix ini. Pesan tidak muncul dan halaman tidak beralih
      setLoading(true);
      const { data } = await axios.post("/api/users", {
        name: (document.getElementById("name") as HTMLInputElement)?.value,
        username: (document.getElementById("username") as HTMLInputElement)?.value,
        password: (document.getElementById("password") as HTMLInputElement)?.value,
        confirmPassword: (document.getElementById("confirm-password") as HTMLInputElement)?.value,
        email: (document.getElementById("email") as HTMLInputElement)?.value,
        typeAction: "register",
      });

      notif(data.msg, notifConfigSuccess);
      window.location.replace(new URL(`/verification/${data.UID}`, baseUrl).href);
    } catch (error) {
      if (isAxiosError(error)) {
        const notifConfigError: NotifConfig = {
          color: "red",
          refElement: error.response?.data.ref,
          location: "after",
        };
        if (error.response?.status === 422) return notif(error.response?.data.msg, notifConfigError);

        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sm:w-1/3 w-4/5 mx-auto py-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <form onSubmit={(e) => handlerSubmit(e)}>
        <label htmlFor="name" className="text-white text-base font-bold font-poppins my-8 py-10">
          Nama :
          <input type="text" name="name" id="name" placeholder="Masukkan Nama Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
        </label>
        <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8">
          Username :
          <input type="text" minLength={8} name="username" id="username" placeholder="Masukkan Username Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
        </label>
        <label htmlFor="email" className="text-white text-base font-bold font-poppins my-8">
          Email :
          <input type="email" name="email" id="email" placeholder="Masukkan Email Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
        </label>
        <label htmlFor="password" className="text-white text-base font-bold font-poppins my-8">
          Kata Sandi :
          <input type="password" minLength={8} maxLength={20} name="password" id="password" placeholder="Masukkan Kata Sandi Anda..." className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2" required disabled={loading} />
          <p className="text-white text-[10px]">Kata Sandi harus memiliki minimal 1 huruf besar, 1 huruf kecil, dan 1 angka</p>
        </label>
        <label htmlFor="confirm-password" className="text-white text-base font-bold font-poppins my-8">
          Konfirmasi Kata Sandi :
          <input
            type="password"
            minLength={8}
            maxLength={20}
            name="confirm-password"
            id="confirm-password"
            placeholder="Masukkan Kata Sandi Anda..."
            className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
            required
            disabled={loading}
          />
        </label>
        <input type="hidden" name="typeAction" id="typeAction" value="register" />
        <Link href="/login" className="text-xs sm:text-base text-white font-poppins underline my-2 inline cursor-pointer ms-2">
          Punya akun?
        </Link>
        <button id="submit-button" className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl" disabled={loading}>
          {loading ? "Mengirim Data..." : "Daftar Sekarang"}
        </button>
      </form>
    </div>
  );
}
