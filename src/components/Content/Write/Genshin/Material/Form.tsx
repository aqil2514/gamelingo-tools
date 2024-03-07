import { Input, VariantClass } from "@/components/general/Input";
import React, { useEffect, useState } from "react";
import { SubmitConfig_GI, submitFormHandler } from "../genshinUtils";
import ImageInput, { changeHandler } from "@/components/general/ImageInput";
import Button, { VariantClass as ButtonClass } from "@/components/general/Button";
import { FetchApi } from "../genshinComponents";
import { useMaterialContext } from "@/components/Providers/Game/GenshinImpact/MaterialProvider";
import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import { getDate } from "@/components/Admin/ContextMenu/utils";
import { notif } from "@/utils/fe";
import Loading from "@/components/general/Loading";
import Image from "next/image";
import { allowedRole } from "@/lib/Data";

export default function GIMaterialContentForm({ template }: { template: General.ContentTemplate }) {
  if (template === "Write") return <WriteContent />;
  else if (template === "Edit") return <EditContent />;
}

function WriteContent() {
  const { material, setIsLoading, moveLocation, isLoading, setMaterial, setMoveLocation, setFileName, setPreviewLink, fileName, previewLink } = useMaterialContext();
  const dataExisting = Object.keys(material).length > 1;

  const submitConfig: SubmitConfig_GI = {
    url: "/api/post",
    setIsLoading: setIsLoading,
    game: "Genshin Impact",
    category: "Material",
    ref: "material-button-submit",
    callbackUrl: "/admin/data?field=genshin-impact&subfield=Material&lang=English",
    moveLocation,
  };
  return (
    <>
      <form onSubmit={(e) => submitFormHandler(e, submitConfig)} id="form-material-genshin" className="my-4">
        <FetchApi elementId="material-name" msgNoInput="Material belum dipilih" msgNoData="Data material tidak ada" refElement="material-name" query="materials" setData={setMaterial} />

        <Input disabled={isLoading} forId="material-name" name="name" label="Material Name" value={material.name} onChange={(e) => setMaterial({ ...material, name: e.target.value })} variant={VariantClass.dashboard} />
        {dataExisting ? (
          <>
            <Input
              disabled={isLoading}
              forId="material-type"
              name="typeMaterial"
              label="Material Type"
              value={material.typeText}
              onChange={(e) => setMaterial({ ...material, typeText: e.target.value })}
              variant={VariantClass.dashboard}
              list="material-type-list"
            />
            <Input disabled={isLoading} forId="rarity" name="rarity" label="Rarity" value={material.rarity} onChange={(e) => setMaterial({ ...material, rarity: Number(e.target.value) })} variant={VariantClass.dashboard} />
            <div>
              <label htmlFor="material-lore" className="text-white font-bold">
                Material Lore :
              </label>
              <textarea
                disabled={isLoading}
                className="w-full h-[100px] block  my-4 rounded-xl p-4 text-zinc-950 text-base font-bold font-poppins"
                name="lore"
                value={material.description}
                onChange={(e) => setMaterial({ ...material, description: e.target.value })}
                id="material-lore"
              ></textarea>
            </div>
            <Input
              disabled={isLoading}
              forId="material-gain"
              label="Material Gain"
              name="gainedFrom"
              value={(material.sources as string[]).join(", ")}
              onChange={(e) => setMaterial({ ...material, sources: e.target.value })}
              variant={VariantClass.dashboard}
            />
            <p className="text-white font-bold">Tambah tanda &quot;,&quot; sebagai pemisah.</p>
            <ImageInput changeHandler={(e) => changeHandler(e, setFileName, setPreviewLink)} fileName={fileName} previewLink={previewLink} setFileName={setFileName} setPreviewLink={setPreviewLink} />
          </>
        ) : (
          <p className="text-white font-bold font-poppins">No Data Selected</p>
        )}

        <div className="flex gap-4" id="material-button-submit">
          <Button className={ButtonClass.submit}>{isLoading ? "Submitting..." : "Submit"}</Button>
          <label htmlFor="move-location" className="text-white font-bold font-poppins my-auto">
            <input type="checkbox" id="move-location" className="mx-2" checked={moveLocation} onChange={() => setMoveLocation(!moveLocation)} />
            Lihat Data setelah selesai ditambah
          </label>
        </div>
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
    </>
  );
}

function EditContent() {
  const [data, setData] = useState<GenshinImpact.Material>({} as GenshinImpact.Material);
  const [date, setDate] = useState<string>("");
  const { contextMenu, setIsLoading, setEditMenu, isLoading, searchParams } = useMenuContextData();
  const langParams = searchParams.get("lang");
  const lang = contextMenu.target?.getAttribute("data-lang");
  const id = contextMenu.target?.getAttribute("data-id");
  const [previewLink, setPreviewLink] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Material&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }

    if (Object.keys(data).length !== 0) {
      const { year, month, day, hour, minutes } = getDate(data.createdAt as string);

      setDate(`${year}-${month}-${day}T${hour}:${minutes}`);
    }
  }, [contextMenu, data, id, lang]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm("/api/gamelingo/genshin-impact" as Route, formData, {
        headers: {
          "Data-Category": "Material",
          "Old-Id": _id,
          "Content-Lang": langParams,
        },
      });

      notif(res.data.msg, {
        color: "green",
        refElement: "buttons",
        location: "before",
      });
      setTimeout(() => {
        setEditMenu(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, {
            color: "red",
            refElement: "buttons",
            location: "before",
          });
        }
        if (error.response?.status === 400) {
          notif(error.response.data.msg, {
            color: "red",
            refElement: "buttons",
            location: "before",
          });
        }
        if (error.response?.status === 401) {
          notif(error.response.data.msg, {
            color: "red",
            refElement: "buttons",
            location: "before",
          });
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    if (!target.files || (target.files && target.files.length === 0)) {
      target.value = "";
      setFileName("");
      setPreviewLink("");

      return;
    }

    const image = target.files[0];
    const urlSrc = URL.createObjectURL(image);

    setFileName(image.name);
    setPreviewLink(urlSrc);
  }

  const isDisabled = isLoading;
  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      <h1 id="test" className="text-white text-center font-bold font-poppins">
        Edit Material
      </h1>
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data material..." />
      ) : (
        <form method="post" onSubmit={submitHandler}>
          <input type="hidden" name="id" defaultValue={data._id} />

          <div>
            <label
              className="relative m-auto border border-dashed group border-white rounded-md min-h-[128px] min-w-[128px] max-h-[210px] max-w-[210px] flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden"
              htmlFor="input-image"
            >
              <input type="file" name="image" id="input-image" className="hidden" onChange={changeHandler} />
              {/* Apakah gambar datanya ada di database ? */}
              {data.image ? (
                // Jika ada, tampilkan data tersebut dalam komponen Image
                <Image src={data.image} fill sizes="auto" alt={data.name + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
              ) : // Jika tidak ada, cek dulu apakah gambarnya sudah disetting melalui input?
              fileName && previewLink ? (
                // Jika sudah disetting melalui input, tampilkan gambar tersebut dengan komponen Image
                <Image src={previewLink} width={64} height={64} alt={fileName + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
              ) : (
                // Jika belum disetting melalui input, tampilkan gambar blum disetting
                <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
              )}
            </label>
          </div>

          <Input variant={VariantClass.dashboard} forId="id" disabled label="Material Id" defaultValue={data._id} />

          <Input variant={VariantClass.dashboard} forId="material-name" name="name" disabled={isDisabled} label="Material Name" defaultValue={data.name} />

          <Input variant={VariantClass.dashboard} forId="material-type" name="typeMaterial" disabled={isDisabled} label="Material Type" defaultValue={data.typeMaterial} />

          <Input variant={VariantClass.dashboard} forId="material-rarity" name="rarity" disabled={isDisabled} label="Material Rarity" defaultValue={data.rarity} />

          <Input variant={VariantClass.dashboard} forId="gainedFrom" name="gainedFrom" disabled={isDisabled} label="Gained From" defaultValue={typeof data.gainedFrom === "object" ? data.gainedFrom.join(", ") : data.gainedFrom} />

          <div>
            <label htmlFor="material-lore" className="text-white font-bold">
              Material Lore :
            </label>
            <textarea disabled={isLoading} className="w-full h-[100px] block  my-4 rounded-xl p-4 text-zinc-950 text-base font-bold font-poppins" name="lore" defaultValue={data.lore} id="material-lore"></textarea>
          </div>

          <Input variant={VariantClass.dashboard} type="datetime-local" disabled defaultValue={date} name="createdat" forId="createdat" label="Dibuat pada" />

          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" disabled={isDisabled} className={ButtonClass.danger} onClick={() => setEditMenu(false)}>
              Batal
            </Button>
            <Button className={ButtonClass.submit} disabled={isDisabled}>
              {isDisabled ? "Submitting..." : "Submit"}
            </Button>
          </div>

          <datalist id="data-role-user">
            {allowedRole.map((role) => (
              <option key={role} value={role} />
            ))}
          </datalist>
        </form>
      )}
    </div>
  );
}
