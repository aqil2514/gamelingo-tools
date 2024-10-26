import { getSanityImage, sanityClient } from "@/sanity/client";
import { characterPostQuery, characterTableQuery } from "@/sanity/queries-genshin";

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

export const getCharacter = async (slug:string) => {
  const character = await sanityClient.fetch<GenshinImpact.Character[]>(characterPostQuery, {slug});
  const noImage = "/no-profile.png"

  const data:GenshinImpact.Character[] = character.map((character) => {
    return{
      ...character,
      image: {
        cover: character.image.cover ? getSanityImage(character.image.cover).url() : noImage,
        portrait: character.image.portrait ? getSanityImage(character.image.portrait).url() : noImage,
      },
      talents: character.talents ? character.talents.map((talent) => {
        return{
          ...talent,
          image: talent.image ? getSanityImage(talent.image).url() : noImage
        }
      }) : undefined,
      passives: character.passives ? character.passives.map((passive) => {
        return{
          ...passive,
          image: passive.image ? getSanityImage(passive.image).url() : noImage
        }
      }) : undefined,
      constellations: character.constellations ? character.constellations.map((constellation) => {
        return{
          ...constellation,
          image: constellation.image ? getSanityImage(constellation.image).url() : noImage
        }
      }) : undefined,
    }
  })

  return data;
}