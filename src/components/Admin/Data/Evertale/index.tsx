import CharacterData from "./CharacterData"

export default function EvertaleData({subfield,data}: {subfield:string, data:Evertale.Character.QuickInfo[]}){
    if(subfield === "chars") return <CharacterData data={data} />
    return(
<div>
    <h1>
        ok
    </h1>
</div>
    )
}