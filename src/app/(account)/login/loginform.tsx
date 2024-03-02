"use client";
import axios, { isAxiosError } from "axios";
import type { Route } from "next";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Google } from "react-bootstrap-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NotifConfig, notif } from "@/utils/fe";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const url: Route = "/api/users";
  useEffect(() => {
    alert("Fitur login dan register baru bisa dirasakan oleh kontributor situs.\n Next akan ada fitur untuk para pengunjung situs");
  }, []);
  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(url, {
        username: (document.getElementById("username") as HTMLInputElement)?.value,
        password: (document.getElementById("password") as HTMLInputElement)?.value,
        typeAction: "login",
      } as Route.Request.Users);

      if (res.status === 200) {
        const username = (document.getElementById("username") as HTMLInputElement)?.value;

        signIn("credentials", { username });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const notifConfigError: NotifConfig = {
          color: "red",
          refElement: "login-button",
          location: "before",
        };

        if (error.response?.status === 422 && error.response.data.UID) {
          const verifNow = confirm(error.response.data.msg);
          if (!verifNow) return router.refresh();

          return router.replace(`/verification/${error.response.data.UID}`);
        }
        if (error.response?.status === 422) {
          notif(error.response.data.msg, notifConfigError);
        }
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <div onClick={() => signIn("google", { callbackUrl: "/" })} className="bg-white cursor-pointer rounded-[32px] justify-center w-full flex flex-row ps-4 py-4">
        <Google className="text-base sm:text-2xl mx-2 my-auto"></Google>
        <p className="font-poppins font-bold mx-2 my-auto text-base sm:text-2xl">Masuk dengan Google</p>
      </div>
      <h2 className="text-center text-xl font-mclaren text-white font-bold my-4">Punya Akun?</h2>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <label htmlFor="username" className="text-white text-base font-bold font-poppins my-8">
          Username:
          <input disabled={loading} type="text" name="username" id="username" placeholder="Username..." className="block w-full py-2 rounded-lg px-2 text-zinc-950" />
        </label>
        <label htmlFor="password" className="text-white text-base font-bold font-poppins my-8">
          Password:
          <input disabled={loading} type="password" name="password" id="password" placeholder="Password..." className="block w-full py-2 rounded-lg px-2 text-zinc-950" />
        </label>
        <Link href="/reset-password" className="text-xs sm:text-base text-white font-poppins underline my-2 inline cursor-pointer me-2">
          Lupa Password?
        </Link>
        <Link href="/register" className="text-xs sm:text-base text-white font-poppins underline my-2 inline cursor-pointer ms-2">
          Belum punya akun?
        </Link>
        <button disabled={loading} id="login-button" type="submit" className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
          {loading ? "Tunggu Sebentar..." : "Login"}
        </button>
      </form>
    </div>
  );
}
