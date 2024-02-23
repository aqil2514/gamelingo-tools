export enum StateActionKind {
  TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE",
  IS_EDITING_START = "IS_EDITING_START",
  IS_EDITING_END = "IS_EDITING_END",
  EDIT_DATA = "EDIT_DATA",
  RESET_DATA = "RESET_DATA",
  DATA_CHANGE = "DATA_CHANGE",
  NO_DATA_CHANGE = "NO_DATA_CHANGE",
  SHOW_POPUP_EMAIL = "SHOW_POPUP_EMAIL",
  HIDE_POPUP_EMAIL = "HIDE_POPUP_EMAIL",
  SHOW_PASSWORD_SECTION = "SHOW_PASSWORD_SECTION",
  HIDE_PASSWORD_SECTION = "HIDE_PASSWORD_SECTION",
}

export interface DataState {
  data: Account.User;
  initialData: Account.User;
  editMode: boolean;
  isEditing: boolean;
  isChanged: boolean;
  popUpActive: boolean;
  passwordSection: boolean;
}

export interface StateAction {
  type: StateActionKind;
  payload?: { id?: string; value?: string };
}

export function reducer(state: DataState, action: StateAction) {
  switch (action.type) {
    case StateActionKind.TOGGLE_EDIT_MODE: {
      return { ...state, editMode: !state.editMode };
    }
    case StateActionKind.EDIT_DATA: {
      return { ...state, data: { ...state.data, [action.payload?.id as string]: action.payload?.value } };
    }
    case StateActionKind.RESET_DATA: {
      return { ...state, data: state.initialData };
    }
    case StateActionKind.IS_EDITING_START: {
      return { ...state, isEditing: true };
    }
    case StateActionKind.IS_EDITING_END: {
      return { ...state, isEditing: false };
    }
    case StateActionKind.DATA_CHANGE: {
      return { ...state, isChanged: true };
    }
    case StateActionKind.NO_DATA_CHANGE: {
      return { ...state, isChanged: false };
    }
    case StateActionKind.SHOW_POPUP_EMAIL: {
      return { ...state, popUpActive: true };
    }
    case StateActionKind.HIDE_POPUP_EMAIL: {
      return { ...state, popUpActive: false };
    }
    case StateActionKind.SHOW_PASSWORD_SECTION: {
      return { ...state, passwordSection: true };
    }
    case StateActionKind.HIDE_PASSWORD_SECTION: {
      return { ...state, passwordSection: false };
    }
  }
}

export function INITIAL_STATE(data: Account.User): DataState {
  return {
    data,
    initialData: data,
    editMode: false,
    isEditing: false,
    isChanged: false,
    popUpActive: false,
    passwordSection: false,
  };
}
