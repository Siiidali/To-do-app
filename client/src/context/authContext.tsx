import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext(null);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user")!);

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
