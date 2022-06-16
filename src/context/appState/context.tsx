import React, { createContext, useReducer } from "react";
import { AppStateAction, reducer, state } from "./actions";

interface AppStateProviderProps {
  children: React.ReactNode;
}

interface AppStateContextType {
  state: {
    loading: boolean;
    error: any;
  };
  dispatch: (action: AppStateAction) => void;
}

const AppStateContext = createContext<AppStateContextType | any>({});

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children
}) => {
  const [appState, appDispatch] = useReducer(reducer, state);

  return (
    <AppStateContext.Provider
      value={{
        dispatch: appDispatch,
        state: appState
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
