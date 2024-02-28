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

export default function DetailMenu({ field, subfield }: ContextSelectFieldProps) {
  if (field === "account") {
    if (subfield === "userslogin") return <UserDetail />;
    else if (subfield === "verificationcode") return <CodeDetail />;
    else if (subfield === "password_purify") return <PasswordPurifyDetail />;
  }
}

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
