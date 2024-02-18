"use client";

import { GenshinMaterialProvider } from "@/components/Providers";
import { Input, VariantClass } from "@/components/general/Input";
import React from "react";
import { submitFormHandler } from "./genshinUtils";
import ImageInput, { changeHandler } from "@/components/general/ImageInput";
import Button, { VariantClass as ButtonClass } from "@/components/general/Button";

export default function Material() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");

  return (
    <GenshinMaterialProvider>
      <form onSubmit={(e) => submitFormHandler(e, "/api/post", setIsLoading, "Genshin Impact", "Material", "material-button-submit")} id="form-material-genshin" className="my-4">
        <Input disabled={isLoading} forId="material-name" name="name" label="Material Name" variant={VariantClass.dashboard} />
        <Input disabled={isLoading} forId="material-type" name="typeMaterial" label="Material Type" variant={VariantClass.dashboard} list="material-type-list" />
        <Input disabled={isLoading} forId="rarity" name="rarity" label="Rarity" variant={VariantClass.dashboard} />
        <div>
          <label htmlFor="material-lore" className="text-white font-bold">
            Material Lore :
          </label>
          <textarea disabled={isLoading} className="w-full h-[100px] block  my-4 rounded-xl p-4 text-zinc-950 text-base font-bold font-poppins" name="lore" id="material-lore"></textarea>
        </div>
        <Input disabled={isLoading} forId="material-gain" label="Material Gain" name="gainedFrom" variant={VariantClass.dashboard} />
        <p className="text-white font-bold">Tambah tanda &quot;,&quot; sebagai pemisah.</p>
        <ImageInput changeHandler={(e) => changeHandler(e, setFileName, setPreviewLink)} fileName={fileName} previewLink={previewLink} />
        <Button className={ButtonClass.submit} id="material-button-submit">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <datalist id="material-type-list">
        <option value="Character Ascension Material" />
        <option value="Character Level Up Material" />
        <option value="Character Talent Material" />
        <option value="Character And Weapon Enhancement Material" />
        <option value="Local Speciality (Mondstadt)" />
        <option value="Local Speciality (Liyue)" />
        <option value="Local Speciality (Liyue)" />
        <option value="Local Speciality (Inazuma)" />
        <option value="Local Speciality (Sumeru)" />
        <option value="Local Speciality (Fontain)" />
        <option value="Produk Khas Mondstadt" />
        <option value="Produk Khas Liyue" />
        <option value="Produk Khas Inazuma" />
        <option value="Produk Khas Sumeru" />
        <option value="Produk Khas Fontain" />
        <option value="Mata Uang Umum" />
        <option value="Mata Uang Langka" />
        <option value="Material Penguatan Karakter" />
        <option value="Weapon Ascension" />
        <option value="Weapon and Character Material" />
        <option value="Talent Material" />
        <option value="Special Currency" />
        <option value="Common Currency" />
      </datalist>
    </GenshinMaterialProvider>
  );
}
