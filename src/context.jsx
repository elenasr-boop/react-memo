import { createContext } from "react";
import { useState } from "react";

export const ModeContext = createContext(null);

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState({
    amount: null,
    isThreeTries: null,
  });

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
};
