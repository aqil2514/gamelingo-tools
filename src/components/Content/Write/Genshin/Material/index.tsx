"use client";

import MaterialProvider from "@/components/Providers/Game/GenshinImpact/MaterialProvider";
import GIMaterialContentForm from "./Form";

export default function Material() {
  return (
    <MaterialProvider>
      <GIMaterialContentForm template="Write" />
    </MaterialProvider>
  );
}
