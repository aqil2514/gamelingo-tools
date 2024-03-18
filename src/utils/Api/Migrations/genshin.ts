import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import * as fs from "fs";

const basePath = "public/migrations";

export const genshinMigration = {
  character: async () => {
    const EnglishCharacter = JSON.stringify(await CharacterEN.find());
    const IndonesianCharacter = JSON.stringify(await CharacterID.find());

    fs.writeFileSync(
      `${basePath}/genshin-impact/english-character.json`,
      EnglishCharacter,
      { encoding: "utf-8" }
    );
    fs.writeFileSync(
      `${basePath}/genshin-impact/indonesian-character.json`,
      IndonesianCharacter,
      { encoding: "utf-8" }
    );

    const englishPath = `${basePath}/genshin-impact/english-character.json`;
    const indonesianPath = `${basePath}/genshin-impact/indonesian-character.json`;

    const englishCharacter = fs.readFileSync(englishPath);

    const data = [englishCharacter, indonesianPath];

    return data;
  },
};
