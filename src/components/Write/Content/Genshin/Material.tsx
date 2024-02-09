"use client";

import { GenshinMaterialProvider } from "@/components/Providers";
import { Input, VariantClass } from "@/components/general/Input";
import React from "react";
import { submitFormHandler } from "./formState";
import ImageInput, { changeHandler } from "@/components/general/ImageInput";

export default function Material() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");

  return (
    <GenshinMaterialProvider>
      <form
        onSubmit={(e) => submitFormHandler(e, "/api/post", setIsLoading, "Genshin Impact", "Material")}
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
        <ImageInput
          changeHandler={(e) => changeHandler(e, setFileName, setPreviewLink)}
          fileName={fileName} previewLink={previewLink}
        />
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
