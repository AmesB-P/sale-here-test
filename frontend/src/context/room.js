"use client"
import {createContext, useState} from "react";


/**
 *
 * @typedef {Object} TRoomContext
 * @property {string} roomId
 * @property {function} setRoomId
 */

export const RoomContext = createContext(/** @type {TRoomContext} */null)
export default function roomProvider ({children}) {
    const [roomId , setRoomId] = useState("")

    return (
        <RoomContext.Provider value={{roomId , setRoomId}}>
            {children}
        </RoomContext.Provider>
    )
}