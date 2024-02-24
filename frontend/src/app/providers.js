'use client'
import UserProvider from "../context/user"
import RoomProvider from "../context/room"
import {ApolloProvider} from "@apollo/client";
import {client} from "@/apollo/configServer";

/**
 * All Providers for the whole app
 * @param children - App children
 * @return {JSX.Element}
 * @constructor
 */
export const AppProviders = ({children}) => {
    return (
        <ApolloProvider client={client}>
            <UserProvider>
                <RoomProvider>
                    {children}
                </RoomProvider>
            </UserProvider>
        </ApolloProvider>

    )
}