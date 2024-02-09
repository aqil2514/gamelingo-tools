"use client";

import { GenshinMaterialProvider } from "@/components/Providers";
import { Input, VariantClass } from "@/components/general/Input";
import React from "react";
import { getFormData } from "./formState";
import { Route } from "next";
import axios from "axios";
import { notif } from "@/utils/fe";
import Image from "next/image";

export default function Material() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url: Route = "/api/post";

    const formData = new FormData(e.target as HTMLFormElement);
    try {
      setIsLoading(true);
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          game: "genshin-impact",
          category: "material",
        },
      });

      notif(res.data.msg, "green", "material-submit-button", "before");
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(
            error.response?.data.msg,
            "red",
            "material-submit-button",
            "before"
          );
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0] as File;
      setFileName(selectedFile.name);
      setPreviewLink(URL.createObjectURL(selectedFile)); // Create URL for preview
    }
  }

  return (
    <GenshinMaterialProvider>
      <form
        onSubmit={submitHandler}
        id="form-material-genshin"
        className="my-4"
      >
        <Input
          disabled={isLoading}
          forId="material-name"
          name="name"
          label="Material Name"
          variant={VariantClass.dashboard}
        />
        <Input
          disabled={isLoading}
          forId="material-type"
          name="typeMaterial"
          label="Material Type"
          variant={VariantClass.dashboard}
          list="material-type-list"
        />
        <Input
          disabled={isLoading}
          forId="rarity"
          name="rarity"
          label="Rarity"
          variant={VariantClass.dashboard}
        />
        <div>
          <label htmlFor="material-lore" className="text-white font-bold">
            Material Lore :
          </label>
          <textarea
            disabled={isLoading}
            className="w-full h-[100px] block  my-4 rounded-xl p-4"
            name="lore"
            id="material-lore"
          ></textarea>
        </div>
        <Input
          disabled={isLoading}
          forId="material-gain"
          label="Material Gain"
          name="gainedFrom"
          variant={VariantClass.dashboard}
        />
        <p className="text-white font-bold">
          Tambah tanda &quot;,&quot; sebagai pemisah.
        </p>
        <div 
        className="inline-block hover:cursor-pointer group hover:bg-slate-800 font-semibold my-4 mx-2 text-slate-800 hover:text-slate-300 p-1 bg-slate-500 transition duration-200"
        onClick={(e) =>{
          const element = e.target as HTMLDivElement;
          const input = element.children[0] as HTMLInputElement;
          
          if(input) return input.click();
        }}
        >
          Gambar :
          <input
            type="file"
            name="image"
            onChange={changeHandler}
            id="file"
            className="hidden"
          />
          <label
            htmlFor="file"
            className="text-slate-500 my-auto hover:cursor-pointer mx-1 px-2 font-normal bg-white"
          >
            {fileName? fileName:"Belum pilih file..."}
          </label>
        </div>
        {previewLink && (
          <Image src={previewLink} width={300} height={300} alt={fileName} className="w-auto h-auto" />
        )}
        <button
          id="material-submit-button"
          className="block px-4 py-2 bg-green-700 mt-4 hover:bg-green-600 disabled:bg-green-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <datalist id="material-type-list">
        <option value="Character Ascension" />
        <option value="Weapon Ascension" />
        <option value="Weapon and Character Material" />
        <option value="Talent Material" />
      </datalist>
    </GenshinMaterialProvider>
  );
}
