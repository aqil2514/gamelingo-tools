"use client";

import { useSearchParams } from "next/navigation";
import { SubTemplateDataState, subTemplateData } from "./Data";
import { useRouter } from "@/navigation";

interface SelectSubTemplateProps{
  template: "write" | "edit";
}

export default function SelectSubTemplate({template} : SelectSubTemplateProps) {
  const searchParams = useSearchParams();
  const game = searchParams.get("game") as keyof SubTemplateDataState;
  const category = searchParams.get("category");
  const router = useRouter();

  if (!game) return <></>;

  function changeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value === "select-category") return router.replace(`/${template}?game=${game}`);

    router.replace(`/${template}?game=${game}&category=${value}`);
  }

  return (
    <div>
      <label htmlFor="section-sub-template" className="text-lg text-white font-poppins font-semibold">
        Kategori :{" "}
      </label>
      <select name="section-sub-template" id="section-sub-template" className="block my-2 bg-zinc-800 text-white font-semibold font-poppins px-4" defaultValue={category ? category : ""} onChange={changeHandler}>
        <option value="select-category"> Select Category</option>
        {subTemplateData[game].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
