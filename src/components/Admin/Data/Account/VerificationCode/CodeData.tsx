import { useEffect } from "react";
import { useMenuContextData } from "../ContextMenu/ContextProvider";
import ContextMenu from "../ContextMenu";
import DetailMenu from "../ContextMenu/DetaiMenu";
import EditMenu from "../ContextMenu/EditMenu";

export default function CodeData({ data }: { data: Account.VerifCode[] }) {
  const { contextMenu, setContextMenu, detailMenu, isDeleting, editMenu } = useMenuContextData();

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
      {isDeleting && <p className="font-bold text-amber-500">Menghapus Data...</p>}

      <table id="table-code-data" className="border-2 border-white text-white mx-auto my-4 w-full">
        <thead>
          <tr>
            <th className="font-bold capitalize cursor-default border-2 border-white">#</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">email</th>
            <th className="font-bold capitalize cursor-default border-2 border-white">code</th>
          </tr>
        </thead>
        {data.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={3} className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white">
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
                  {d.email}
                </td>
                <td className="text-center cursor-pointer hover:bg-zinc-600 border-2 border-white" data-id={d.uid}>
                  {d.code}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {contextMenu.isActive && data.length !== 0 && <ContextMenu field="account" subfield="verificationcode" passData={data} />}

      {detailMenu && <DetailMenu field="account" subfield="verificationcode" />}

      {editMenu && <EditMenu field="account" subfield="verificationcode" />}
    </div>
  );
}
