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

export default function DetailMenu({ field, subfield }: ContextSelectFieldProps) {
  if (field === "account") {
    if (subfield === "userslogin") return <UserDetail />;
    else if (subfield === "verificationcode") return <CodeDetail />;
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
            {new Date(data.createdAt)?.toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
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
  const { contextMenu, setDetailMenu } = useMenuContextData();

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/users/verify?uniqueId=${contextMenu.target?.getAttribute("data-id")}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu]);

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data user..." />
      ) : (
        <>
          <h1 className="text-center text-white font-bold font-merienda">Verification Code for {data.email}</h1>
          <p className="font-poppins text-white">
            <strong className="font-bold">Email : </strong>
            {data.email}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Code : </strong>
            {data.code}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Dibuat pada : </strong>
            {new Date(data.createdat as string).toLocaleString("id-ID", { hour: "2-digit", minute: "2-digit", day: "2-digit", weekday: "long", month: "long", year: "numeric" })}
          </p>
          <p className="font-poppins text-white">
            <strong className="font-bold">Email : </strong>
            {data.email}
          </p>

          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" className={VariantClass.danger} onClick={() => setDetailMenu(false)}>
              Kembali
            </Button>
            {/* TODO: tambahin tombol agar ketika diklik, langsung mengarah ke halama verificationcode & codenya otomatis terisi  */}
          </div>
        </>
      )}
    </div>
  );
};
