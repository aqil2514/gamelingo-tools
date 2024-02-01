export enum StateActionKind {
  LOADING_END = "LOADING_END",
  LOADING_START = "LOADING_START",
  CHANGE_MODE = "CHANGE_MODE",
  NON_CHANGE_MODE = "NON_CHANGE_MODE",
  RESENDING_START = "RESENDING_START",
  RESENDING_END = "RESENDING_END",
  CHANGING_START = "CHANGING_START",
  CHANGING_END = "CHANGING_END",
}

interface StateAction {
  type: StateActionKind;
}

interface DataState {
  isLoading: boolean;
  changeMode: boolean;
  isResending: boolean;
  isChanging: boolean;
}

export const INITIAL_STATE: DataState = {
  isLoading: false,
  changeMode: false,
  isResending: false,
  isChanging: false,
};

export const reducer = (state: DataState, action: StateAction) => {
  switch (action.type) {
    case StateActionKind.LOADING_START: {
      return { ...state, isLoading: true };
    }
    case StateActionKind.LOADING_END: {
      return { ...state, isLoading: false };
    }
    case StateActionKind.CHANGE_MODE: {
      return { ...state, changeMode: true };
    }
    case StateActionKind.NON_CHANGE_MODE: {
      return { ...state, changeMode: false };
    }
    case StateActionKind.RESENDING_START: {
      return { ...state, isResending: true };
    }
    case StateActionKind.RESENDING_END: {
      return { ...state, isResending: false };
    }
    case StateActionKind.CHANGING_START: {
      return { ...state, isChanging: true };
    }
    case StateActionKind.CHANGING_END: {
      return { ...state, isChanging: false };
    }
  }
};
