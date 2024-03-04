"use client";

import { useSearchParams } from "next/navigation";
import Content from "..";
import { SubTemplateDataState } from "./Data";

export default function WriteData() {
  const searchParams = useSearchParams();
  const game = searchParams.get("game");
  const category = searchParams.get("category");

  if (!game || !category) return <></>;

  return (
    <div>
      <h2 className="font-bold text-white font-poppins">
        Write <span className="capitalize underline">{game?.replace("-", " ")}</span> data on <span className="capitalize underline">{category}</span> category
      </h2>

      <Content game={game as keyof SubTemplateDataState} category={category as General.Game["category"]} />
    </div>
  );
}
