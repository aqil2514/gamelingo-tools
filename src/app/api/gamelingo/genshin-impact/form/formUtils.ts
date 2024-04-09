import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import { TalentEN, TalentID } from "@/models/GenshinImpact/Talent";

export async function getCharacter(charName:string, lang:General.PostDocument["lang"]) : Promise<GenshinImpact.Character> {
    if(lang === "English"){
        const data = await CharacterEN.findOne({name:charName});

        return data;
    }    

    const data = await CharacterID.findOne({name:charName});
    return data;
}

export async function getTalent(charName:string, lang:General.PostDocument["lang"]) : Promise<GenshinImpact.Talent> {
    if(lang === "English"){
        const data = await TalentEN.findOne({charName});

        return data;
    }    

    const data = await TalentID.findOne({charName});
    return data;
}
