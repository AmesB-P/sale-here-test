import { ApolloClient, InMemoryCache, split, HttpLink} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    options: {
        reconnect: true,
    },
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
    },
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);


export const client = new ApolloClient({
    link : splitLink, //websocket link
    uri: 'ws://localhost:4000/graphql', //connect to server
    cache: new InMemoryCache(),
});

