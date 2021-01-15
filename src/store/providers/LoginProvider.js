import React, { useReducer } from "react";
import LoginContext, {initialData} from '../context/LoginContext';
import reducers from "../reducers";

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducers, initialData);

  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
}

export default Provider;