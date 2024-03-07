import { useArtifactContext } from "@/components/Providers/Game/GenshinImpact/ArtifactProvider";
import Button, { VariantClass as ButtonClass } from "@/components/Input/Button";
import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import Image from "next/image";
import React from "react";

interface SwiperSlideProps {
  keyValue: "flower" | "circlet" | "goblet" | "plume" | "sands";
  template: "Write" | "Edit";
  data?: GenshinImpact.Artifact;
}

export default function SwiperSlideData({ keyValue, template, data }: SwiperSlideProps) {
  if (template === "Write") return <SwiperWrite keyValue={keyValue} />;
  else if (template === "Edit") return <SwiperEdit data={data} keyValue={keyValue} />;
}

function SwiperWrite({ keyValue }: Pick<SwiperSlideProps, "keyValue">) {
  const context = useArtifactContext();
  const data = context.artifact;
  const setData = context.setArtifact;

  const initFileName = `No Image Selected for ${keyValue}`;
  const [fileName, setFileName] = React.useState<string>(initFileName);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const imageRef = React.useRef<HTMLInputElement>(null);

  function imageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const el = e.target as HTMLInputElement;
    if (el.files && el.files?.length > 0) {
      const imgSrc = URL.createObjectURL(el?.files[0] as File);
      setFileName(el.files[0].name);
      setPreviewLink(imgSrc);
    }
  }

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
      <h2 className="text-white font-semibold font-poppins capitalize">{keyValue}</h2>

      <Input
        forId={`${keyValue}-name`}
        label="Name"
        name={`${keyValue}-name`}
        variant={VariantClass.dashboard}
        value={data[keyValue].name}
        onChange={(e) =>
          setData({
            ...data,
            [keyValue]: { ...data[keyValue], name: e.target.value },
          })
        }
      />

      <Input
        forId={`${keyValue}-type`}
        label="Type"
        name={`${keyValue}-type`}
        variant={VariantClass.dashboard}
        value={data[keyValue].relicText}
        onChange={(e) =>
          setData({
            ...data,
            [keyValue]: { ...data[keyValue], relicText: e.target.value },
          })
        }
      />

      <Textarea
        forId={`${keyValue}-description`}
        label="Description"
        name={`${keyValue}-description`}
        className={TextareaStyle.variant_1}
        value={data[keyValue].description}
        onChange={(e) =>
          setData({
            ...data,
            [keyValue]: { ...data[keyValue], description: e.target.value },
          })
        }
      />

      <Textarea
        forId={`${keyValue}-lore`}
        label="Lore"
        name={`${keyValue}-lore`}
        className={TextareaStyle.variant_1}
        value={data[keyValue].story}
        onChange={(e) =>
          setData({
            ...data,
            [keyValue]: { ...data[keyValue], story: e.target.value },
          })
        }
      />

      {/* Gambar di sini */}
      <div className="flex justify-start min-h-[70px] gap-4">
        {previewLink && (
          <Button
            type="button"
            className="h-[30px] transition duration-200 hover:bg-red-700 rounded-lg border border-red-700 hover:border-red-700 text-red-700 font-semibold font-poppins hover:text-white px-4 cursor-pointer"
            onClick={removeHandler}
          >
            Remove
          </Button>
        )}
        <label htmlFor={`${keyValue}-image`} className="h-[30px] transition duration-200 hover:bg-zinc-800 rounded-lg border border-white hover:border-zinc-800 text-white px-4 cursor-pointer">
          <p className="font-semibold font-poppins cursor-pointer">{previewLink ? "Change Image" : "Upload Image"}</p>
          <input type="file" ref={imageRef} name={`${keyValue}-image`} id={`${keyValue}-image`} onChange={imageHandler} accept=".png, .webp" className="hidden" />
        </label>
        <p className="font-bold font-mono text-white">{fileName}</p>
        {previewLink && <Image width={64} height={64} alt={fileName} src={previewLink} className="h-auto rounded-xl" />}
      </div>
    </>
  );
}

function SwiperEdit({ keyValue, data }: Omit<SwiperSlideProps, "template">) {
  const initFileName = `No Image Selected for ${keyValue}`;
  const [fileName, setFileName] = React.useState<string>(initFileName);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const imageRef = React.useRef<HTMLInputElement>(null);

  function imageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const el = e.target as HTMLInputElement;
    if (el.files && el.files?.length > 0) {
      const imgSrc = URL.createObjectURL(el?.files[0] as File);
      setFileName(el.files[0].name);
      setPreviewLink(imgSrc);
    }
  }

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
      {!data || Object.keys(data).length === 0 ? (
        <></>
      ) : (
        <>
          <h2 className="text-white font-semibold font-poppins capitalize">{keyValue}</h2>

          <Input forId={`${keyValue}-name`} label="Name" name={`${keyValue}-name`} variant={VariantClass.dashboard} defaultValue={data[keyValue].name} />

          <Input forId={`${keyValue}-type`} label="Type" name={`${keyValue}-type`} variant={VariantClass.dashboard} defaultValue={data[keyValue].type} />

          <Textarea forId={`${keyValue}-description`} label="Description" name={`${keyValue}-description`} className={TextareaStyle.variant_1} value={data[keyValue].description} />

          <Textarea forId={`${keyValue}-lore`} label="Lore" name={`${keyValue}-lore`} className={TextareaStyle.variant_1} value={data[keyValue].lore} />

          {/* Gambar di sini */}
          <div className="flex justify-start min-h-[70px] gap-4">
            {previewLink && (
              <Button
                type="button"
                className="h-[30px] transition duration-200 hover:bg-red-700 rounded-lg border border-red-700 hover:border-red-700 text-red-700 font-semibold font-poppins hover:text-white px-4 cursor-pointer"
                onClick={removeHandler}
              >
                Remove
              </Button>
            )}
            <label htmlFor={`${keyValue}-image`} className="h-[30px] transition duration-200 hover:bg-zinc-800 rounded-lg border border-white hover:border-zinc-800 text-white px-4 cursor-pointer">
              <p className="font-semibold font-poppins cursor-pointer">{previewLink ? "Change Image" : "Upload Image"}</p>
              <input type="file" ref={imageRef} name={`${keyValue}-image`} id={`${keyValue}-image`} onChange={imageHandler} accept=".png, .webp" className="hidden" />
            </label>
            <p className="font-bold font-mono text-white">{fileName}</p>
            {previewLink && <Image width={64} height={64} alt={fileName} src={previewLink} className="h-auto rounded-xl" />}
          </div>
        </>
      )}
    </>
  );
}
