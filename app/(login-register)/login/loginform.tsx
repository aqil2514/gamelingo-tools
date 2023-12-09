"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { Google } from "react-bootstrap-icons";

export default function LoginForm() {
  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data } = await axios.post("/api/users", {
      username: (document.getElementById("username") as HTMLInputElement)?.value,
      password: (document.getElementById("password") as HTMLInputElement)?.value,
    });

    if (data.status === "404") {
      alert(data.msg);
      return;
    } else if (data.status === "403") {
      alert(data.msg);
      return;
    } else if (data.status === "402") {
      alert(data.msg);
      return;
    }
    console.log(data);
    alert(data.msg);
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
          <input type="text" name="username" id="username" placeholder="Username..." className="block w-full py-2 rounded-lg px-2 text-zinc-950" />
        </label>
        <label htmlFor="password" className="text-white text-base font-bold font-poppins my-8">
          Password:
          <input type="password" name="password" id="password" placeholder="Password..." className="block w-full py-2 rounded-lg px-2 text-zinc-950" />
        </label>
        <p className="text-xs sm:text-base text-white font-poppins underline my-2 inline cursor-pointer me-2">Lupa Password?</p>
        <p className="text-xs sm:text-base text-white font-poppins underline my-2 inline cursor-pointer ms-2">Belum punya akun?</p>
        <button type="submit" className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
}
