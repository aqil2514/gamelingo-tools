/**
 *
 * Detail Menu
 *
 */

import { useEffect, useState } from "react";
import { useMenuContextData } from "./ContextProvider";
import axios from "axios";
import { Route } from "next";
import Loading from "@/components/general/Loading";
import Button, { VariantClass } from "@/components/general/Button";
import { ContextSelectFieldProps } from "./interface";
import { dateOptions, dateOptionsWithTime } from "./config";
import { Clipboard, ClipboardCheck } from "react-bootstrap-icons";
import { baseUrl } from "@/components/general/Data";
import Image from "next/image";

export default function DetailMenu({ field, subfield }: ContextSelectFieldProps) {
  if (field === "account") {
    if (subfield === "userslogin") return <UserDetail />;
    else if (subfield === "verificationcode") return <CodeDetail />;
    else if (subfield === "password_purify") return <PasswordPurifyDetail />;
  } else if (field === "genshin-impact") {
    if (subfield === "Material") return <GenshinMaterialDetail />;
  }
}

// <<<<< User Detail Menu Section >>>>>

const UserDetail = () => {
  const [data, setData] = useState<Account.UserFromMongoDB>({} as Account.UserFromMongoDB);
  const { contextMenu, setDetailMenu } = useMenuContextData();
  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/users?userId=${contextMenu.target?.getAttribute("data-id")}&db=mongodb`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu]);

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data user..." />
      ) : (
        <>
          <p className="font-poppins text-white">
            <strong className="font-bold">User Id : </strong>
            {data.userId}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Username : </strong>
            {data.username}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Nama : </strong>
            {data.name}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Email : </strong>
            {data.email}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Jumlah Postingan : </strong>
            {data.post.length}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Dibuat pada : </strong>
            {new Date(data.createdAt)?.toLocaleDateString("id-ID", dateOptions)}
          </p>
          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" className={VariantClass.danger} onClick={() => setDetailMenu(false)}>
              Kembali
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const CodeDetail = () => {
  const [data, setData] = useState<Account.VerifCode>({} as Account.VerifCode);
  const [copied, setCopied] = useState<boolean>(false);
  const { contextMenu, setDetailMenu } = useMenuContextData();

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/users/verify?uniqueId=${contextMenu.target?.getAttribute("data-id")}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu]);

  async function linkCopyHandler() {
    await navigator.clipboard.writeText(`${baseUrl}/verification/${data.uid}?code=${data.code}`);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  return (
    <div className="min-w-[50%] max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data user..." />
      ) : (
        <>
          <h1 className="text-center text-white font-bold font-merienda my-4 text-3xl">Verification Code for {data.email}</h1>
          <div className="font-poppins text-white text-lg">
            <div className="flex gap-4 my-4">
              <strong className="font-bold">Kode Registrasi : </strong>
              {!copied && <Clipboard className="my-auto cursor-pointer transition duration-200 hover:text-black" title="Copy Link" onClick={linkCopyHandler} />}
              {copied && <ClipboardCheck className="my-auto cursor-default" title="Copy Link" />}
              {copied && <p className="my-auto text-green-500 font-bold cursor-default"> Link berhasil dicopy</p>}
            </div>
            <p className="border border-white rounded py-2 text-center">{data.uid}</p>
          </div>
          <p className="font-poppins text-white text-lg">
            <strong className="font-bold">Email : </strong>
            {data.email}
          </p>
          <p className="font-poppins text-white text-lg">
            <strong className="font-bold">Code : </strong>
            {data.code}
          </p>
          <p className="font-poppins text-white text-lg">
            <strong className="font-bold">Dibuat pada : </strong>
            {new Date(data.createdat as string).toLocaleString("id-ID", dateOptionsWithTime)}
          </p>
          <p className="font-poppins text-white text-lg">
            <strong className="font-bold">Email : </strong>
            {data.email}
          </p>

          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" className={VariantClass.danger} onClick={() => setDetailMenu(false)}>
              Kembali
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const PasswordPurifyDetail = () => {
  const [data, setData] = useState<Account.PasswordPurify>({} as Account.PasswordPurify);
  const [copied, setCopied] = useState<boolean>(false);
  const { contextMenu, setDetailMenu } = useMenuContextData();

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/users/reset-password?uniqueId=${contextMenu.target?.getAttribute("data-id")}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu]);

  async function linkCopyHandler() {
    await navigator.clipboard.writeText(`${baseUrl}/reset-password/${data.uid}`);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  return (
    <div className="min-w-[50%] max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data user..." />
      ) : (
        <>
          <h1 className="text-center text-white font-bold font-merienda my-4 text-3xl">Reset Password for {data.email}</h1>
          <div className="font-poppins text-white text-lg">
            <div className="flex gap-4 my-4">
              <strong className="font-bold">Kode Reset Password : </strong>
              {!copied && <Clipboard className="my-auto cursor-pointer transition duration-200 hover:text-black" title="Copy Link" onClick={linkCopyHandler} />}
              {copied && <ClipboardCheck className="my-auto cursor-default" title="Copy Link" />}
              {copied && <p className="my-auto text-green-500 font-bold cursor-default"> Link berhasil dicopy</p>}
            </div>
            <p className="border border-white rounded py-2 text-center">{data.uid}</p>
          </div>
          <p className="font-poppins text-white text-lg">
            <strong className="font-bold">Email : </strong>
            {data.email}
          </p>
          <p className="font-poppins text-white text-lg">
            <strong className="font-bold">Dibuat pada : </strong>
            {new Date(data.createdat as string).toLocaleString("id-ID", dateOptionsWithTime)}
          </p>

          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" className={VariantClass.danger} onClick={() => setDetailMenu(false)}>
              Kembali
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

// <<<<< Genshin Impact Detail Menu Section >>>>>
const GenshinMaterialDetail = () => {
  const [data, setData] = useState<GenshinImpact.Material>({} as GenshinImpact.Material);
  const { contextMenu, setDetailMenu } = useMenuContextData();

  const id = contextMenu.target?.getAttribute("data-id");
  const lang = contextMenu.target?.getAttribute("data-lang");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Material&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu, id, lang]);

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data material..." />
      ) : (
        <>
          <div>
            <h1 className="font-mclaren text-white text-center font-bold ">{data.name}</h1>
            <p className="font-mclaren text-white text-sm text-center font-bold mb-4">{typeof data.createdAt === "string" ? new Date(data.createdAt).toLocaleDateString("id-ID", dateOptions) : ""}</p>
          </div>
          <div className="relative m-auto border border-dashed group border-white rounded-md w-full h-full flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden">
            {data.image ? (
              <Image src={data.image} fill sizes="auto" alt={data.name + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
            ) : (
              <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
            )}
          </div>
          <p className="font-poppins text-white">
            <strong className="font-bold">Material Name : </strong>
            {data.name}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Material Type : </strong>
            {data.typeMaterial}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Rarity : </strong>
            {data.rarity ? data.rarity : "1"}
          </p>
          <div>
            <strong className="font-bold text-white font-poppins">Lore : </strong>
            <p className="font-poppins text-white">{data.lore}</p>
          </div>
          <p className="font-poppins text-white">
            <strong className="font-bold">Gained From : </strong>
            {typeof data.gainedFrom === "object" ? data.gainedFrom.join(", ") : data.gainedFrom}
          </p>
          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" className={VariantClass.danger} onClick={() => setDetailMenu(false)}>
              Kembali
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
