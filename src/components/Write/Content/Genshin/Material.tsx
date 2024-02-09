"use client";

import { GenshinMaterialProvider } from "@/components/Providers";
import { Input, VariantClass } from "@/components/general/Input";
import React from "react";
import { getFormData } from "./formState";
import { Route } from "next";
import axios from "axios";

export default function Material() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url: Route = "/api/post";

    const data = getFormData(e);

    try {
      setIsLoading(true);
      const res = await axios.post(url, {
        data,
        game: "genshin-impact",
        category: "material",
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
        <Input
        disabled={isLoading}
          forId="material-image"
          name="image"
          label="Material Image"
          variant={VariantClass.dashboard}
        />
        <button className="px-4 py-2 bg-green-700 hover:bg-green-600 disabled:bg-green-600 text-white" disabled={isLoading}>{isLoading?"Submitting...":"Submit"}</button>
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
