import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  return (
    <UserContext.Provider value={[loginData, setLoginData]}>
      {props.children}
    </UserContext.Provider>
  );
};
