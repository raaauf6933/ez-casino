import { AppStateActionType } from "types";

export interface AppStateAction {
  type: AppStateActionType;
  payload?: any;
}

const state = {
  error: {},
  loading: false
};

const reducer = (state: any, action: AppStateAction) => {
  switch (action.type) {
    case AppStateActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message
      };
    case AppStateActionType.START_LOADING:
      return {
        loading: true
      };
    case AppStateActionType.FINISH_LOADING:
      return {
        loading: false
      };
  }
};

export { reducer, state };
