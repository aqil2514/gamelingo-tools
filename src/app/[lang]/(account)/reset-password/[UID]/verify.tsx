"use client";
import { Input, VariantClass } from "@/components/general/Input";
import { notif } from "@/utils/fe";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface PasswordState {
  newPassword: string;
  confirmNewPassword: string;
}

export default function Verify({ email }: { email: string }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<PasswordState>({ newPassword: "", confirmNewPassword: "" });
  const router = useRouter();

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.put("/api/users/reset-password", {
        password: password.newPassword,
        confirmPassword: password.confirmNewPassword,
        email,
      });

      notif(res.data.msg, { color: "green", refElement: "password-button", location: "before" });
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, { color: "red", refElement: "password-button", location: "before" });
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <form onSubmit={submitHandler}>
        <Input forId="email" label="Email" variant={VariantClass.dashboard} disabled defaultValue={email} />
        <Input type="password" forId="password" label="Password Baru" variant={VariantClass.dashboard} value={password.newPassword} onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
        <Input type="password" forId="confirm-password" label="Konfirmasi Password" variant={VariantClass.dashboard} value={password.confirmNewPassword} onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })} />

        <button id="password-button" disabled={isLoading} className="bg-white px-6 py-2 block mx-auto font-poppins my-4 font-bold text-black text-xl rounded-xl">
          {isLoading ? "Tunggu sebentar..." : "Pulihkan"}
        </button>
      </form>
    </div>
  );
}
