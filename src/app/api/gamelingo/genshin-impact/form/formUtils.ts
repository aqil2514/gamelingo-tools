import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";

export async function getCharacter(charName:string, lang:General.PostDocument["lang"]) : Promise<GenshinImpact.Character> {
    if(lang === "English"){
        const data = await CharacterEN.findOne({name:charName});

        return data;
    }    

    const data = await CharacterID.findOne({name:charName});
    return data;
}