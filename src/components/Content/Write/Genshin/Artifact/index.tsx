import ArtifactProvider from "@/components/Providers/Game/GenshinImpact/ArtifactProvider";
import GIArtifactContentForm from "./Form";

export default function ArtifactForm() {
  return (
    <ArtifactProvider>
      <GIArtifactContentForm template="Write" />
    </ArtifactProvider>
  );
}
