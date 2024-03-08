"use client";

import CharacterProvider from "@/components/Providers/Game/Evertale/CharacterProvider";
import EvertaleCharacterForm from "./Form";

export default function EvertaleCharacterContentForm() {
  return (
    <CharacterProvider>
      <EvertaleCharacterForm template="Write" />
    </CharacterProvider>
  );
}
