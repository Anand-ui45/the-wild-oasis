import { createContext, useContext } from "react";

export const DarkModeContext = createContext();

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outsode of DarkModeProvider");

  return context;
}
