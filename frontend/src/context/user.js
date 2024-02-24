"use client"
import {createContext,useState} from "react";

/**
 *
 * @typedef {Object} TUserContext
 * @property {string} userName
 * @property {function} setUserName
 */

export const UserContext = createContext(/** @type {TUserContext} */null)
export default function userProvider ({children}) {
    const [userName , setUserName] = useState("")

    return (
        <UserContext.Provider value={{userName , setUserName}}>
            {children}
        </UserContext.Provider>
    )
}