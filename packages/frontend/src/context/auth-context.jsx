import { createContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLoginHandler = () => {
    setIsLoggedIn(true);
  };

  const onLogoutHandler = () => {
    setIsLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    login: onLoginHandler,
    logout: onLogoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
