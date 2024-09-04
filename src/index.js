import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { LeaderBoardProvider, ModeProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModeProvider>
      <LeaderBoardProvider>
        <RouterProvider router={router}></RouterProvider>
      </LeaderBoardProvider>
    </ModeProvider>
  </React.StrictMode>,
);
