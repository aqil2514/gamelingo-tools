import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import clsx from "clsx";
import React from "react";

export enum VariantClass {
  submit = "block px-4 py-2 bg-green-700 mt-4 rounded-lg hover:bg-green-600 disabled:bg-green-600 text-white font-bold",
  fetch = "block px-4 py-2 bg-blue-700 mt-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-600 text-white font-bold",
  danger = "block px-4 py-2 bg-red-700 mt-4 rounded-lg hover:bg-red-600 disabled:bg-red-600 text-white font-bold",
}

type ButtonProps = Components.Input.Button.ButtonProps;

export default function Button({ children, className, ...props }: ButtonProps) {
  const withTemplate = props.withTemplate;
  if (withTemplate) {
    if (!props.template) throw new Error("Jika ingin gunakan template, tentukan template apa yang ingin digunakan");
    if (props.template === "detail-menu") return <DetailMenu />;
  }
  return (
    <button {...props} className={clsx(VariantClass, className)}>
      {children}
    </button>
  );
}

function DetailMenu() {
  const { setDetailMenu } = useMenuContextData();

  return (
    <div id="buttons" className="flex justify-center gap-4">
      <Button type="button" className={VariantClass.danger} onClick={() => setDetailMenu(false)}>
        Kembali
      </Button>
      <Button type="button" className={VariantClass.fetch} onClick={() => alert("Belum tersedia")}>
        Lihat Konten
      </Button>
    </div>
  );
}
