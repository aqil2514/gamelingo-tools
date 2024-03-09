import Button, { VariantClass } from "@/components/Input/Button";
import React, { useState } from "react";
import { Images } from "react-bootstrap-icons";

interface FileNamesState {
  fileName1: string;
  fileName2?: string;
  fileName3?: string;
}

interface PreviewLinkState {
  link1: string;
  link2?: string;
  link3?: string;
}

export default function CharacterImage() {
  const [fileNames, setFileNames] = useState<FileNamesState>({} as FileNamesState);
  const [previewLink, setPreviewLink] = useState<PreviewLinkState>({} as PreviewLinkState);
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const files = Array.from(target.files);
    const file1 = files.find((f) => f.name.includes("01"));
    const file2 = files.find((f) => f.name.includes("02"));
    const file3 = files.find((f) => f.name.includes("03"));

    if (!file1) throw new Error("Error: Minimal harus ada satu gambar");
    const fileName1 = file1.name;
    const fileName2 = file2 ? file2.name : "";
    const fileName3 = file3 ? file3.name : "";
    const link1 = URL.createObjectURL(file1);
    const link2 = file2 ? URL.createObjectURL(file2) : "";
    const link3 = file3 ? URL.createObjectURL(file3) : "";

    setFileNames({ fileName1, fileName2, fileName3 });
    setPreviewLink({ link1, link2, link3 });
  }
  return (
    <div>
      <label htmlFor="characterImages">
        <Button className={VariantClass.fetch}>
          <span className="mx-2">
            <Images />
          </span>{" "}
          Upload Images
        </Button>
        <input type="file" id="characterImages" name="characterImages" className="hidden" accept=".png, .webp" multiple onChange={changeHandler} />
      </label>
    </div>
  );
}
