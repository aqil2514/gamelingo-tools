import React from "react";
import { DataState, INITIAL_STATE, StateAction, reducer } from "./reducer";
import BasicInfo from "./BasicInfo";
import PopupEmail from "./PopupEmail";
import PasswordManage from "./PasswordSection";

interface DashboardProps {
  data: Account.User;
}

interface DashboardState {
  state: DataState;
  dispatch: React.Dispatch<StateAction>;
}

const DashboardContext = React.createContext({} as DashboardState);

export const useDashboardData = () => {
  return React.useContext(DashboardContext);
};

export default function Dashboard({ data }: DashboardProps) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE(data));

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {!state.passwordSection && <BasicInfo />}
      {state.popUpActive && <PopupEmail />}
      {state.passwordSection && <PasswordManage />}
    </DashboardContext.Provider>
  );
}
