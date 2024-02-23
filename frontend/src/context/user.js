"use client"
import {createContext,useState} from "react";

/**
 *
 * @typedef {UserContext} - value of user context
 * @property {userName} - Name of the user
 * @property {setUserName} - Function useState for storing name of user
 */

export const UserContext = createContext(null)
export default function userProvider ({children}) {
    const [userName , setUserName] = useState("")

    return (
        <UserContext.Provider value={{userName , setUserName}}>
            {children}
        </UserContext.Provider>
    )
}