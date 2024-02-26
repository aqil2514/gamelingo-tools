import { getUser } from "@/utils/api";
import { redirect } from "next/navigation";
import React from "react";

export default async function WriteLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (user?.role === "User" || !user) redirect("/");
  return <>{children}</>;
}
