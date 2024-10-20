import { getSanityImage, sanityClient } from "@/sanity/client";
import { characterTableQuery } from "@/sanity/queries-genshin";

export const getCharacterTable = async () => {
  const characters = await sanityClient.fetch<GenshinImpact.CharacterTable[]>(characterTableQuery);

  const data:GenshinImpact.CharacterTable[] = characters.map((character) => {
    return{
      ...character,
      image: {
        cover: character.image.cover ? getSanityImage(character.image.cover).url() : "/no-profile.png",
        portrait: character.image.portrait ? getSanityImage(character.image.portrait).url() : "/no-profile.png",
      }
    }
  })

  return data;
}

// export const getCharacters = async (lang: General.Languages) => {
//   const docSelect: Record<typeof lang, Model<any>> = {
//     en: CharacterEN,
//     id: CharacterID,
//   };

//   const doc = docSelect[lang];

//   const characters = (await doc.find()) as GenshinImpact.Character[];

//   return characters;
// };

// export const getSlug = (value: string) => {
//   const slug = `${value.toLowerCase()}`;
//   return slug;
// };

// export const convertToTable = (characters: GenshinImpact.Character[], slice?: number) => {
//     const data: GenshinImpact.CharacterTable[] = (slice ? characters.slice(0, slice) : characters)
//       .sort()
//       .map((d) => {
//         return {
//           _id: d._id,
//           name: d.name,
//           element: d.element,
//           rarity: d.rarity,
//           region: d.region,
//           weapon: d.weapon,
//           image: d.image,
//         };
//       });
  
//     return data;
//   };
  