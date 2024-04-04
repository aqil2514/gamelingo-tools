import Navigation from "@/components/Layout/Navigation";
import React from "react";

export default function EvertaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Navigation template="Evertale-Page" />
    </>
  );
}
