export const genshinOrganizing={
    artifact: (data:FormUtils.FormDataArtifact, imageUrl:string) =>{
        const finalData: GenshinImpact.Artifact ={
            name: data.name,
            type: data.type as GenshinImpact.Artifact["type"],
            set: data.set,
            setBonus:[
                {
                    setName: data["setName-1"] as "2 Set Bonus" | "4 Set Bonus",
                    setValue: data["setValue-1"],
                },
                {
                    setName: data["setName-2"] as "2 Set Bonus" | "4 Set Bonus",
                    setValue: data["setValue-2"],
                },
            ],
            rarity: data.rarity,
            source: data.source.split(","),
            image: imageUrl,
        }

        return finalData;
    }
}