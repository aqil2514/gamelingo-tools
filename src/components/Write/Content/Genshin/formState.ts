import { notif } from "@/utils/fe";
import axios from "axios";
import { Route } from "next";
import React from "react";

export const apiURL = "https://genshin-db-api.vercel.app/api/v5"

export function getFormData(e: React.FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.target as HTMLFormElement);

  const elements = document.querySelectorAll(
    "input[type=text]"
  ) as NodeListOf<HTMLInputElement>;
  const textarea = document.querySelector("textarea");
  const files = document.querySelectorAll(
    "input[type=file]"
  ) as NodeListOf<HTMLInputElement>;

  const data: { [key: string]: string | null | FileList } = {};

  elements.forEach((el) => {
    data[el.name] = formData.get(el.name) as string;
  });

  files.forEach((file) => (data[file.name] = file.files));
  data[textarea!.name] = formData.get(textarea!.name) as string;

  console.log(data);

  return data;
}

export async function submitFormHandler(
  e: React.FormEvent<HTMLFormElement>,
  url: Route,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  game: General.Game["game"],
  category: General.Game["category"],
  ref: string
) {
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

    notif(res.data.msg, "green", ref, "before");
    console.log(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        notif(error.response?.data.msg, "red", ref, "before");
      }
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}
