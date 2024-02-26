"use client";

import { useEffect, useState } from "react";
import ContextMenu, { EditMenu } from "./ContextMenu";

export interface ContextMenuState {
  x: number;
  y: number;
  isActive: boolean;
  target: HTMLElement | null;
}
export default function UserData({ data }: { data: Account.AdminUserOutput[] }) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({} as ContextMenuState);
  const [editMenu, setEditMenu] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

      {contextMenu.isActive && <ContextMenu setEditMenu={setEditMenu} setIsLoading={setIsLoading} contextMenu={contextMenu} data={data} />}

      {editMenu && <EditMenu setEditMenu={setEditMenu} contextMenu={contextMenu} />}
    </div>
  );
}
