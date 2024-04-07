"use client"
import { fetcherWithParams } from "@/lib/Data";
import { Route } from "next";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { TalentDefault, TalentSkeleton } from "./Talent";

interface PostComponentProps{
    components: General.GameGenshinImpact["category"],
}

const langMap:Record<string, General.PostDocument["lang"]> = {
    en: "English",
    id: "Indonesian"
  }

export default function PostComponent({components}: PostComponentProps){
    const category: General.AdminQueryGameGenshin["subfield"] = "Talent";
    const params = useParams();
    const lang = langMap[params.lang as string];
    const id= params.id as string;
    const url: Route = `/api/gamelingo/genshin-impact/character`;
    const {data, isLoading} = useSWR(url, url => fetcherWithParams(url, {category, lang, id}));

    if(components === "Talent"){
        if(!data || isLoading) return <TalentSkeleton />

        return <TalentDefault data={data.data.talent} />        
    }
    if(components === "Constellations"){
        
    }
}