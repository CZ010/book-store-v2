import React, {createContext} from "react";
import {useCookies} from "react-cookie";

export const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const user = cookies.user;

  const login = userData => {
    setCookie("user", userData, {path: "/", maxAge: 2592000});
  };

  const logout = () => {
    removeCookie("user");
  };


  return (
    <DataContext.Provider
      value={{
        AuthedUser: [user],
        Login: [login],
        Logout: [logout]
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
