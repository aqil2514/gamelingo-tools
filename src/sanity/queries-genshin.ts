import { groq } from "next-sanity";

export const characterQuery = groq`
*[_type == 'genshinImpactCharacter'] {
  _id,
  'slug': slug.current,
  characterName,
  image {
    cover,
    portrait
  },
  gender,
  region,
  element,
  rarity,
  weapon,
  ascendStatus,
  description,
  cv {
    english,
    chinese,
    japanese,
    korean
  },
  createdAt,
  updatedAt
}
`;

export const characterTableQuery = groq`
*[_type == "genshinImpactCharacter" && defined(slug.current) && !(_id in path("drafts.**"))] {
      _id,
      'slug': slug.current,
      characterName,
      element,
      rarity,
      region,
      weapon,
      image
    }
`;