import ConstellationsProvider from "@/components/Providers/Game/GenshinImpact/ConstellationsProvider";
import GICharacterContentForm from "./Form";

export default function CharacterForm() {
  return (
    <ConstellationsProvider>
      <GICharacterContentForm template="Write" />
    </ConstellationsProvider>
  );
}
