import { Input, VariantClass } from "@/components/general/Input";
import Buttons from "./Buttons";
import { useDashboardData } from "..";
import ChangeInfo from "./ChangeInfo";
import React from "react";

interface VerifState {
  code: string;
  isSending: boolean;
  isResending: boolean;
}
export default function PopupEmail() {
  const { state, dispatch } = useDashboardData();
  const [verif, setVerif] = React.useState<VerifState>({
    code: "",
    isSending: false,
    isResending: false,
  });
  return (
    <div className="w-full h-full fixed bg-[rgba(0,0,0,0.8)] py-40 top-0 left-0">
      <div className="mx-auto w-1/2 bg-zinc-800 p-4">
        <h1 className="font-bold font-poppins text-white text-center">Perubahan Email Terdeteksi!</h1>
        <ChangeInfo />
        <Input forId="verification-code" disabled={verif.isResending || verif.isSending} value={verif.code} onChange={(e) => setVerif({ ...verif, code: e.target.value })} label="Kode Verifikasi" variant={VariantClass.dashboard} />
        <Buttons verif={verif} setVerif={setVerif} />
      </div>
    </div>
  );
}
