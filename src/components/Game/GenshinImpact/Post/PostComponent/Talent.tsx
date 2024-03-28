import { fetcher } from "@/lib/Data";
import { Route } from "next"
import useSWR from "swr"

export default function Talent(){
    const category: General.AdminQueryGameGenshin["subfield"] = "Talent";
    const lang: General.PostDocument["lang"] = "English";
    const url:Route = `/api/gamelingo/genshin-impact?category=${category}&lang=${lang}`;
    const {data, isLoading, error} = useSWR(url, fetcher)
    if(!data || isLoading) return <Skeleton />
}

function Skeleton(){
    return(
        <div className="w-3/4 bg-slate-900 min-h-100px  rounded-xl p-4 mx-auto my-2">
      <h3 className="text-white font-nova-square font-bold text-xl">Talent</h3>
            {[...Array(6)].map((_, i:number) => (
                <div key={`test${i}`} className="text-zinc-800 rounded-xl p-4 my-2 flex gap-4">
                    <div className="w-[128px] h-[64px] bg-zinc-800 animate-pulse"></div>
                    <p className="bg-zinc-800 animate-pulse">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem nesciunt libero ipsa facere voluptas laudantium odit quibusdam fugit itaque exercitationem.</p>
                </div>
            ))}
        </div>
    )
}

function Default({data}: {data:GenshinImpact.Talent}){
    return(<div>ok</div>)
}