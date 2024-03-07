import TalentProvider from "@/components/Providers/Game/GenshinImpact/TalentProvider";
import GITalentContentForm from "./Form";

export interface CombatStatus {
  statsName: string;
  paramName: string[];
  additionalRule: string;
  suffix: string;
  codeStatus: string;
}

export default function TalentForm() {
  return (
    <TalentProvider>
      <GITalentContentForm template="Write" />
    </TalentProvider>
  );
}
