import { Input, VariantClass } from "@/components/general/Input";
import Buttons from "./Buttons";
import React from "react";
import { useDashboardData } from "..";

interface PasswordState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export default function PasswordManage({ data }: { data: Account.User }) {
  const { state } = useDashboardData();
  const [password, setPassword] = React.useState<PasswordState>({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  return (
    <>
      {data.passwordExisting ? (
        <Input
          forId="old-password"
          type="password"
          disabled={state.isEditing}
          label="Password Lama"
          value={password.oldPassword}
          onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
          variant={VariantClass.dashboard}
        />
      ) : (
        <p className="text-white font-bold font-poppins text-center">Anda belum setting password</p>
      )}
      <Input forId="new-password" type="password" disabled={state.isEditing} label="Password Baru" value={password.newPassword} onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} variant={VariantClass.dashboard} />
      <Input
        forId="confirm-new-password"
        type="password"
        disabled={state.isEditing}
        label="Konfirmasi Password Baru"
        value={password.confirmNewPassword}
        onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })}
        variant={VariantClass.dashboard}
      />
      <Buttons password={password} data={data} />
    </>
  );
}
