"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Google } from "react-bootstrap-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<false | true>(false);
  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Sedang dalam pengembangan");
    return;

    // try {
    //   setLoading(true);
    //   const { data } = await axios.post("/api/users", {
    //     username: (document.getElementById("username") as HTMLInputElement)?.value,
    //     password: (document.getElementById("password") as HTMLInputElement)?.value,
    //     typeAction: "login",
    //   });

    //   if (data.status !== "ok" && data.status !== "av") {
    //     alert(data.msg);
    //     return;
    //   } else if (data.status === "av") {
    //     alert(data.msg);
    //     router.push(`/verification/${data.UID}`);
    //     return;
    //   }

    //   const username = (document.getElementById("username") as HTMLInputElement)?.value;
    //   const password = (document.getElementById("password") as HTMLInputElement)?.value;

    //   signIn("credentials", { username, password });
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
  }
  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <div
        onClick={
          () => alert("Dalam pengembangan")
          // signIn("google", { callbackUrl: "/" })
        }
        className="bg-white cursor-pointer rounded-[32px] justify-center w-full flex flex-row ps-4 py-4"
      >
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
        <button disabled={loading} type="submit" className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
          {loading ? "Tunggu Sebentar..." : "Login"}
        </button>
      </form>
    </div>
  );
}
