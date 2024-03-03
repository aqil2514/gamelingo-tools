"use client";

import ContextProvider from "../../../../Providers/Admin/ContextProvider";
import UserDataTable from "./UserData";

export default function UserData({ data }: { data: Account.AdminUserOutput[] }) {
  return (
    <ContextProvider>
      <UserDataTable data={data} />
    </ContextProvider>
  );
}
