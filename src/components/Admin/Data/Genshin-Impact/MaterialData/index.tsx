"use client";

import ContextProvider from "../../../ContextMenu/ContextProvider";
import MaterialDataTable from "./MaterialData";

export default function MaterialData({ data }: { data: Account.AdminUserOutput[] }) {
  return (
    <ContextProvider>
      <MaterialDataTable data={data} />
    </ContextProvider>
  );
}
