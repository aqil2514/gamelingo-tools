import Button, { VariantClass } from "@/components/Input/Button";
import { notif } from "@/utils/fe";
import Image from "next/image";
import React, { useRef, useState } from "react";
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
  const imagesRef = useRef<HTMLInputElement | null>(null);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const files = Array.from(target.files);
    const file1 = files.find((f) => f.name.includes("01"));
    const file2 = files.find((f) => f.name.includes("02"));
    const file3 = files.find((f) => f.name.includes("03"));

    if (!file1) {
      notif("Error: Gambar pertama harus ada. Pastikan namanya mengandung '01'", { refElement: "upload-image", color: "red", location: "after" });
      return;
    }

    const fileName1 = file1.name;
    const fileName2 = file2 ? file2.name : "";
    const fileName3 = file3 ? file3.name : "";
    const link1 = URL.createObjectURL(file1);
    const link2 = file2 ? URL.createObjectURL(file2) : "";
    const link3 = file3 ? URL.createObjectURL(file3) : "";

    setFileNames({ fileName1, fileName2, fileName3 });
    setPreviewLink({ link1, link2, link3 });
  }

  function deleteHandler() {
    if (imagesRef.current) {
      imagesRef.current.value = "";
      imagesRef.current.files = null;
      setFileNames({} as FileNamesState);
      setPreviewLink({} as PreviewLinkState);
    }
  }

  return (
    <div id="character-image">
      <h5 className="text-white text-xl underline text-center font-bold font-poppins my-4">Character Image</h5>

      <label htmlFor="characterImages">
        <div id="upload-image" className="inline-flex items-center cursor-pointer px-4 py-2 bg-blue-700 mt-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-600 text-white font-bold">
          <span className="mx-2">
            <Images className="my-auto" />
          </span>{" "}
          Upload Images
        </div>
        <input type="file" ref={imagesRef} id="characterImages" name="characterImages" className="hidden" accept=".png, .webp" multiple onChange={changeHandler} />
      </label>
      {fileNames.fileName1 && (
        <div>
          <Button className={VariantClass.danger} type="button" onClick={deleteHandler}>
            Hapus semua
          </Button>
          <div className="my-4 flex justify-center gap-4">
            <div>
              <Image src={previewLink.link1} alt={fileNames.fileName1} height={128} width={128} className="w-auto block aspect-square" />
              <p className="font-bold text-white font-poppins my-4 text-center">{fileNames.fileName1}</p>
            </div>
            {previewLink.link2 && fileNames.fileName2 && (
              <div>
                <Image src={previewLink.link2} alt={fileNames.fileName2} height={128} width={128} className="w-auto block aspect-square" />
                <p className="font-bold text-white font-poppins my-4 text-center">{fileNames.fileName2}</p>
              </div>
            )}
            {previewLink.link3 && fileNames.fileName3 && (
              <div>
                <Image src={previewLink.link3} alt={fileNames.fileName3} height={128} width={128} className="w-auto block aspect-square" />
                <p className="font-bold text-white font-poppins my-4 text-center">{fileNames.fileName3}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
