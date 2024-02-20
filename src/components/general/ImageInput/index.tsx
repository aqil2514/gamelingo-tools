import Image from "next/image";
import React from "react";
import Button from "../Button";

export default function ImageInput({
  changeHandler,
  fileName,
  setFileName,
  previewLink,
  setPreviewLink,
}: {
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  previewLink: string;
  setPreviewLink: React.Dispatch<React.SetStateAction<string>>;
}) {
  const initFileName = `No Image Selected`;
  const imageRef = React.useRef<HTMLInputElement>(null);
  function removeHandler() {
    if (imageRef.current) {
      imageRef.current.value = "";
      imageRef.current.files = null;
      setPreviewLink("");
      setFileName(initFileName);
    }
  }
  return (
    <>
      {previewLink && (
        <Button
          type="button"
          className="h-[30px] transition duration-200 hover:bg-red-700 rounded-lg border border-red-700 hover:border-red-700 text-red-700 font-semibold font-poppins hover:text-white px-4 cursor-pointer"
          onClick={removeHandler}
        >
          Remove
        </Button>
      )}
      <div
        className="inline-block hover:cursor-pointer group hover:bg-slate-800 font-semibold my-4 mx-2 text-slate-800 hover:text-slate-300 p-1 bg-slate-500 transition duration-200 rounded-lg"
        onClick={(e) => {
          const element = e.target as HTMLDivElement;
          const input = element.children[0] as HTMLInputElement;

          if (input) return input.click();
        }}
      >
        Gambar :
        <input
          type="file"
          name="image"
          onChange={changeHandler}
          id="file"
          ref={imageRef}
          accept=".png, .webp"
          className="hidden"
        />
        <label
          htmlFor="file"
          className="text-slate-500 my-auto hover:cursor-pointer mx-1 px-2 font-normal bg-white rounded-xl"
        >
          {fileName ? fileName : initFileName}
        </label>
      </div>
      {previewLink && (
        <Image
          src={previewLink}
          width={300}
          height={300}
          alt={fileName}
          className="h-auto"
        />
      )}
    </>
  );
}

export function changeHandler(
  event: React.ChangeEvent<HTMLInputElement>,
  setFileName: React.Dispatch<React.SetStateAction<string>>,
  setPreviewLink: React.Dispatch<React.SetStateAction<string>>,
) {
  if (event.target.files && event.target.files.length > 0) {
    const selectedFile = event.target.files[0] as File;
    setFileName(selectedFile.name);
    setPreviewLink(URL.createObjectURL(selectedFile)); // Create URL for preview
  }
}
