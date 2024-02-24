"use client"
import {useContext} from "react";
import {RoomContext} from "@/context/room";


export const useRoom= () => {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error("useThemeContext must be used inside the ThemeProvider");
    }

    return context
};