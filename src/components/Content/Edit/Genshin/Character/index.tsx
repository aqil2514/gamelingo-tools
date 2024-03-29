"use client";
import Button, { VariantClass } from "@/components/Input/Button";
import Select from "@/components/Input/Select";
import TextField from "@/components/Input/TextField";
import { fetcherWithParams } from "@/lib/Data";
import { Route } from "next";
import useSWR from "swr";

interface GenshinCharacterEditProps {
  searchParams: {
    game: General.AdminQuery["field"];
    category: General.AdminQuery["subfield"];
  };
}

export default function GenshinCharacterEdit({
  searchParams,
}: GenshinCharacterEditProps) {
  const endPoint: Route = "/api/post/edit";
  const { game, category } = searchParams;

  const { data, isLoading, error } = useSWR(
    endPoint,
    (endPoint) => fetcherWithParams(endPoint, { game, category }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!data || isLoading)
    return <TextField variant="skeleton-variant-1" label="Select Character" />;

  return (
    <div className="grid grid-cols-[300px_300px] gap-4">
      <TextField
        forId="character-search-name"
        variant="default-variant-1"
        list="p"
        label="Select Character"
      />
      <div className="my-auto">
        <Button className={`${VariantClass.fetch} mb-auto`}>Tampilkan Data</Button>
      </div>
      <datalist id="p">
        {data.data.map((d: string) => (
          <option value={d} key={d} />
        ))}
      </datalist>
    </div>
  );
}
