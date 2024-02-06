import React from "react";
import { useDashboardData } from "..";
import { StateActionKind } from "../reducer";
import { Input, VariantClass } from "@/components/general/Input";
import { mainRoleData } from "../../Data";
import Buttons from "./Buttons";

export default function BasicInfo() {
  const { state, dispatch } = useDashboardData();

  const disabledIn = !state.editMode || state.isEditing;

  React.useEffect(() => {
    if (state.editMode === false) return dispatch({ type: StateActionKind.RESET_DATA });
  }, [state.editMode, dispatch]);

  return (
    <>
      <Input
        disabled={disabledIn}
        forId="name"
        label="Nama Pemilik Akun"
        variant={VariantClass.dashboard}
        value={state.data.name}
        onChange={(e) => dispatch({ type: StateActionKind.EDIT_DATA, payload: { id: e.target.id, value: e.target.value } })}
      />
      <Input
        disabled={disabledIn}
        forId="username"
        label="Username"
        variant={VariantClass.dashboard}
        value={state.data.username}
        onChange={(e) => dispatch({ type: StateActionKind.EDIT_DATA, payload: { id: e.target.id, value: e.target.value } })}
      />

      <Input disabled={disabledIn} forId="email" label="Email" variant={VariantClass.dashboard} value={state.data.email} onChange={(e) => dispatch({ type: StateActionKind.EDIT_DATA, payload: { id: e.target.id, value: e.target.value } })} />

      <Input
        disabled
        list="main-role-data"
        forId="role"
        label="Role"
        variant={VariantClass.dashboard}
        value={state.data.role}
        onChange={(e) => dispatch({ type: StateActionKind.EDIT_DATA, payload: { id: e.target.id, value: e.target.value } })}
      />
      {state.editMode && <p className="font-poppins text-white text-base">Hanya admin yang dapat mengedit role</p>}
      <datalist id="main-role-data">
        {mainRoleData.map((role) => (
          <option value={role} key={role} />
        ))}
      </datalist>
      <Buttons />
    </>
  );
}
