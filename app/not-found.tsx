"use client";

import { useRouter } from "next/navigation";
import { DIV_MAIN_STYLE } from "./components/Styles";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className={DIV_MAIN_STYLE + " py-20"}>
      <p className="font-poppins font-semibold text-base lg:text-2xl text-white mx-8 mt-4">Halaman belum dibuat atau tidak tersedia</p>
      <button onClick={() => router.back()} className="block mx-auto text-center font-mclaren text-slate-200 bg-yellow-600 px-4 py-2">
        Kembali ke halaman sebelumnya
      </button>
    </div>
  );
}
