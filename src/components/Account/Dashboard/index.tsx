import React from "react";
import { DataState, INITIAL_STATE, StateAction, reducer } from "./reducer";
import BasicInfo from "./BasicInfo";
import Buttons from "./Buttons";

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
      <BasicInfo />
      <Buttons />
    </DashboardContext.Provider>
  );
}
