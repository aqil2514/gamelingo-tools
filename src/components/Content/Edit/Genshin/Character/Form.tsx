import Loading from "@/components/general/Loading";
import { fetcherWithParams } from "@/lib/Data";
import { Route } from "next";
import useSWR from "swr";

interface FormProps {
  charName: string;
  lang: General.PostDocument["lang"];
}
export default function Form({ charName, lang }: FormProps) {
  const category: General.GameGenshinImpact["category"] = "Character";
  const endPoint: Route = "/api/gamelingo/genshin-impact/form";

  const { data, isLoading, error } = useSWR(endPoint, (endPoint) =>
    fetcherWithParams(endPoint, { category, lang, charName })
  );

  if (!data || isLoading)
    return <Loading loading={1} textOn text="Mengambil data..." />;

  return <form action=""></form>;
}
