import { useEffect } from "react";
import ContextMenu from "../../../ContextMenu";
import { useMenuContextData } from "../../../ContextMenu/ContextProvider";
import EditMenu from "../../../ContextMenu/EditMenu";
import DetailMenu from "../../../ContextMenu/DetailMenu";
import { TD_Style, TH_Style, Table_Style } from "@/components/Admin/Resources";
import Button, { VariantClass } from "@/components/general/Button";

export default function MaterialDataTable({ data }: { data: GenshinImpact.MaterialTable[] }) {
  const { contextMenu, setContextMenu, detailMenu, isDeleting, editMenu, router } = useMenuContextData();

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
      <Button className={VariantClass.submit} onClick={() => router.push("/write?game=genshin-impact&category=Material")}>
        Tambah Data
      </Button>
      <table id="table-material-data" className={Table_Style.style1}>
        <thead>
          <tr>
            <th className={TH_Style.style1}>#</th>
            <th className={TH_Style.style1}>name</th>
            <th className={TH_Style.style1}>rarity</th>
            <th className={TH_Style.style1}>type Material</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).length === 0 ? (
            <tr className="py-2">
              <td className={TD_Style.style1} colSpan={4}>
                No Data
              </td>
            </tr>
          ) : (
            data.map((d, i: number) => (
              <tr key={`${d._id}`} className="py-2">
                <td className={TD_Style.style1}>{i + 1}</td>
                <td className={TD_Style.style1} data-id={d._id}>
                  {d.name}
                </td>
                <td className={TD_Style.style1} data-id={d._id}>
                  {d.rarity}
                </td>
                <td className={TD_Style.style1} data-id={d._id}>
                  {d.typeMaterial}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {contextMenu.isActive && <ContextMenu field="account" subfield="userslogin" passData={data} />}

      {editMenu && <EditMenu field="account" subfield="userslogin" />}

      {detailMenu && <DetailMenu field="account" subfield="userslogin" />}
    </div>
  );
}
