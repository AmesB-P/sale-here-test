"use client"
import {useContext} from "react";
import {UserContext} from "@/context/user";

export const useUser= () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useThemeContext must be used inside the ThemeProvider");
    }

    return context
};