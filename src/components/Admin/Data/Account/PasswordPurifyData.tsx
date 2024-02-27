import { useEffect, useState } from "react";
import { ContextMenuState } from "./UserData";

export default function PasswordPurifyData({ data }: { data: Account.PasswordPurify[] }) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({} as ContextMenuState);
  const [editMenu, setEditMenu] = useState<boolean>(false);
  const [detailMenu, setDetailMenu] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const clickFunction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (contextMenu.isActive) setContextMenu({ ...contextMenu, isActive: false, target: null });

      if (target.tagName.toLowerCase() !== "td") return;

      setContextMenu({ x: e.clientX, y: e.clientY, isActive: !contextMenu.isActive, target: e.target as HTMLElement });
    };

    window.addEventListener("click", clickFunction);

    return () => {
      window.removeEventListener("click", clickFunction);
    };
  }, [contextMenu]);
  return (
    <div className="px-4">
      <table id="table-password-purify" className="border-2 border-white text-white mx-auto my-4 w-full">
        <thead>
          <tr>
            <th className="font-bold capitalize border-2 border-white">#</th>
            <th className="font-bold capitalize border-2 border-white">id</th>
            <th className="font-bold capitalize border-2 border-white">email</th>
            <th className="font-bold capitalize border-2 border-white">craetedat</th>
          </tr>
        </thead>
        {data.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={4} className="text-center border-2 border-white">
                No Data
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((d, i: number) => (
              <tr key={`${d.uid}`}>
                <td className="text-center border-2 border-white">{i + 1}</td>
                <td className="text-center border-2 border-white">{d.uid}</td>
                <td className="text-center border-2 border-white">{d.email}</td>
                <td className="text-center border-2 border-white">{new Date(d.createdat).toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {/* {contextMenu.isActive && Contexz} */}
    </div>
  );
}
