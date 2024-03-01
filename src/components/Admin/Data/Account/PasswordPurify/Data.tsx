import { useEffect } from "react";
import { useMenuContextData } from "../../../ContextMenu/ContextProvider";
import ContextMenu from "../../../ContextMenu";
import DetailMenu from "../../../ContextMenu/DetailMenu";

export default function PasswordPurifyData({ data }: { data: Account.PasswordPurify[] }) {
  const { contextMenu, setContextMenu, detailMenu } = useMenuContextData();
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
  }, [contextMenu, setContextMenu]);

  return (
    <div className="px-4">
      <table id="table-password-purify" className="border-2 border-white text-white mx-auto my-4 w-full">
        <thead>
          <tr>
            <th className="font-bold capitalize cursor-default border-2 border-white">#</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">id</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">email</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">craetedat</th>
          </tr>
        </thead>
        {data.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={4} className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white">
                No Data
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((d, i: number) => (
              <tr key={`${d.uid}`}>
                <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.uid}>
                  {i + 1}
                </td>
                <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.uid}>
                  {d.uid}
                </td>
                <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.uid}>
                  {d.email}
                </td>
                <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.uid}>
                  {new Date(d.createdat).toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {contextMenu.isActive && Object.keys(data).length !== 0 && <ContextMenu field="account" subfield="password_purify" />}

      {detailMenu && <DetailMenu field="account" subfield="password_purify" />}
    </div>
  );
}
