"use client";

import { notif } from "@/utils/fe";
import axios from "axios";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ContextMenuState {
  x: number;
  y: number;
  isActive: boolean;
  target: HTMLElement | null;
}
export default function UserData({ data }: { data: Account.AdminUserOutput[] }) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({} as ContextMenuState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const clickFunction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (contextMenu.isActive) setContextMenu({ ...contextMenu, isActive: false, target: null });

      if (target.tagName.toLowerCase() !== "td" && target.tagName.toLowerCase() !== "th") return;

      setContextMenu({ x: e.clientX, y: e.clientY, isActive: !contextMenu.isActive, target: e.target as HTMLElement });
    };

    window.addEventListener("click", clickFunction);

    return () => {
      window.removeEventListener("click", clickFunction);
    };
  }, [contextMenu]);

  async function copyHandler() {
    if (contextMenu.target) {
      await navigator.clipboard.writeText(contextMenu.target?.innerText);
      notif("Berhasil copy data", "green", "table-user-data", "before");
    }
  }

  async function deleteHandler() {
    const id = contextMenu.target?.getAttribute("data-id");
    const username = data.find((d) => d.id === id)?.username;
    if (username === "aqil2514") return notif("Tidak dapat menghapus diri anda sendiri", "red", "table-user-data", "before");
    const allow = confirm(`Yakin ingin hapus user dengan username ${username}?`);
    if (!allow) return notif("Aksi dibatalkan", "green", "table-user-data", "before");
    const url: Route = "/api/users";
    try {
      setIsLoading(true);

      const res = await axios.delete(url, {
        data: {
          id,
        },
      });

      notif(res.data.msg, "green", "table-user-data", "before");
      router.refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="px-4">
      {isLoading && <p className="font-bold text-amber-500">Menghapus Data...</p>}
      <table id="table-user-data" className="border-2 border-white text-white mx-auto my-4 w-full">
        <thead>
          <tr>
            <th className="font-bold capitalize cursor-default border-2 border-white">#</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">name</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">username</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">role</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">verified</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i: number) => (
            <tr key={`${d.id}`} className="py-2">
              <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white">{i + 1}</td>
              <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.id}>
                {d.name}
              </td>
              <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.id}>
                {d.username}
              </td>
              <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.id}>
                {d.role}
              </td>
              <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.id}>
                {d.account_verified ? "True" : "False"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {contextMenu.isActive && (
        <div style={{ top: contextMenu.y + "px", left: contextMenu.x + "px" }} className="absolute z-50 bg-slate-700 rounded-xl min-h-[50px] min-w-[100px] p-4">
          <ul>
            <li className="text-white rounded-md transition duration-200 font-semibold text-base font-mclaren px-2 hover:bg-white hover:text-black cursor-pointer my-2" onClick={copyHandler}>
              Copy Content
            </li>
            <li className="text-white rounded-md transition duration-200 font-semibold text-base font-mclaren px-2 hover:bg-white hover:text-black cursor-pointer my-2" onClick={deleteHandler}>
              Delete Data
            </li>
            <li className="text-white rounded-md transition duration-200 font-semibold text-base font-mclaren px-2 hover:bg-white hover:text-black cursor-pointer my-2">Edit Data</li>
          </ul>
        </div>
      )}
    </div>
  );
}
