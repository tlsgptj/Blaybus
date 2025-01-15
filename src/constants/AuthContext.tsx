import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  isLogin: boolean | null;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
