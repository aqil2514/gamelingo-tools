import { notif } from "@/utils/fe";
import axios from "axios";
import { Route } from "next";
import React from "react";

/** Konfigurasi untuk submifFormHandler */
export interface SubmitConfig_GI {
  /** url endpoint. Ini yang akan dijadikan sebagai url server */
  url: Route;
  /** Set isLoading. Digunakan untuk UX Loading ketika mengirim data */
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  /** Data game yang dikirim */
  game: General.Game["game"];
  /** Topik atau kategorinya */
  category: General.Game["category"];
  /** Ini bertujuan untuk penampilan pesan */
  ref: string;
  /** Ganti halaman setelah input data berhasil */
  callbackUrl?: Route;
  /** Ganti halaman setelah input data berhasil */
  moveLocation?: boolean;
}

export const apiURL = "https://genshin-db-api.vercel.app/api/v5";

export function getFormData(e: React.FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.target as HTMLFormElement);

  const elements = document.querySelectorAll("input[type=text]") as NodeListOf<HTMLInputElement>;
  const textarea = document.querySelector("textarea");
  const files = document.querySelectorAll("input[type=file]") as NodeListOf<HTMLInputElement>;

  const data: { [key: string]: string | null | FileList } = {};

  elements.forEach((el) => {
    data[el.name] = formData.get(el.name) as string;
  });

  files.forEach((file) => (data[file.name] = file.files));
  data[textarea!.name] = formData.get(textarea!.name) as string;


  return data;
}

/**
 * Menangani submit form untuk bagian Genshin Impact
 */
export async function submitFormHandler(e: React.FormEvent<HTMLFormElement>, config: SubmitConfig_GI) {
  const { setIsLoading, url, game, category, ref, callbackUrl, moveLocation } = config;
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  try {
    setIsLoading(true);
    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        game,
        category,
      },
    });

    notif(res.data.msg, { color: "green", refElement: ref, location: "before" });

    if (callbackUrl && moveLocation) location.href = callbackUrl;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        notif(error.response?.data.msg, { color: "red", refElement: ref, location: "before" });
      } else if (error.response?.status === 401) {
        notif(error.response?.data.msg, { color: "red", refElement: ref, location: "before" });
        setTimeout(() => {
          location.href = "/login" as Route;
        }, 3000);
      }
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}
