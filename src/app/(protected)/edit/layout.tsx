import { getUser } from "@/utils/Api/api";
import { redirect } from "next/navigation";
import React from "react";

export default async function EditLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (user?.role === "User" || !user) redirect("/");
  return <>{children}</>;
}
