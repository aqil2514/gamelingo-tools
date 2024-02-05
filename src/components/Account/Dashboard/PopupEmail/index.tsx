import { Input, VariantClass } from "@/components/general/Input";
import Buttons from "./Buttons";
import { useDashboardData } from "..";
import ChangeInfo from "./ChangeInfo";

export default function PopupEmail() {
  const { state, dispatch } = useDashboardData();
  return (
    <div className="w-full h-full fixed bg-[rgba(0,0,0,0.8)] py-40 top-0 left-0">
      <div className="mx-auto w-1/2 bg-zinc-800 p-4">
        <h1 className="font-bold font-poppins text-white text-center">Perubahan Email Terdeteksi!</h1>
        <ChangeInfo />
        <Input forId="verification-code" label="Kode Verifikasi" variant={VariantClass.dashboard} />
        <Buttons />
      </div>
    </div>
  );
}
