"use client"
import {createContext, useContext, useState} from "react";

export const UserContext = createContext(null)
export default function userProvider ({children}) {
    const [userName , setUserName] = useState("")

    return (
        <UserContext.Provider value={{userName , setUserName}}>
            {children}
        </UserContext.Provider>
    )
}