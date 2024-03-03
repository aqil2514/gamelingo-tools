import ArtifactProvider from "@/components/Providers/Game/GenshinImpact/ArtifactProvider";
import ArtifactContentForm from "./Form";

export default function ArtifactForm() {
  return (
    <ArtifactProvider>
      <ArtifactContentForm />
    </ArtifactProvider>
  );
}
