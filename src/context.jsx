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

export const LeaderBoardContext = createContext(null);

export const LeaderBoardProvider = ({ children }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  return <LeaderBoardContext.Provider value={{ leaderBoard, setLeaderBoard }}>{children}</LeaderBoardContext.Provider>;
};
