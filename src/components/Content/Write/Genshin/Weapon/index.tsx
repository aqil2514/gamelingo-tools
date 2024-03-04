import WeaponProvider from "@/components/Providers/Game/GenshinImpact/WeaponProvider";
import GIWeaponContentForm from "./Form";

export default function WeaponForm() {
  return (
    <WeaponProvider>
      <GIWeaponContentForm template="Write" />
    </WeaponProvider>
  );
}
