"use client"
import {createContext, useContext, useState} from "react";

export const RoomContext = createContext(null)
export default function roomProvider ({children}) {
    const [roomId , setRoomId] = useState("")

    return (
        <RoomContext.Provider value={{roomId , setRoomId}}>
            {children}
        </RoomContext.Provider>
    )
}