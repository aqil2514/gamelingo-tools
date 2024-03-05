import CharacterProvider from "@/components/Providers/Game/GenshinImpact/CharacterProvider";
import GICharacterContentForm from "./Form";

export default function CharacterForm() {
  return (
    <CharacterProvider>
      <GICharacterContentForm template="Write" />
    </CharacterProvider>
  );
}
