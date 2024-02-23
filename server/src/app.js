const {createSchema ,createYoga , createPubSub} = require("graphql-yoga");
const typeDefs = require('./schema/meassage')
const resolvers = require('./controller/message')
const { createServer } = require('node:http')
const { WebSocketServer } = require('ws')
const { useServer  } = require('graphql-ws/lib/use/ws')

const pubSub = createPubSub();

const yoga = createYoga({
    schema: createSchema({ typeDefs, resolvers}),
    context: {pubSub},
    graphiql: {
        // Use WebSockets in GraphiQL
        subscriptionsProtocol: 'WS',
    }
});

const options = {
    port: 4000
};
const server = createServer(yoga)

const wsServer = new WebSocketServer({
    server: server,
    path: yoga.graphqlEndpoint
})

useServer(
    {
        execute: (args) => args.rootValue.execute(args),
        subscribe: (args) => args.rootValue.subscribe(args),
        onSubscribe: async (ctx, msg) => {
            const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
                ...ctx,
                req: ctx.extra.request,
                socket: ctx.extra.socket,
                params: msg.payload
            })

            const args = {
                schema,
                operationName: msg.payload.operationName,
                document: parse(msg.payload.query),
                variableValues: msg.payload.variables,
                contextValue: await contextFactory(),
                rootValue: {
                    execute,
                    subscribe
                }
            }

            const errors = validate(args.schema, args.document)
            if (errors.length) return errors
            return args
        }
    },
    wsServer
)


server.listen(options, () => {
    console.log(`Server is running on http://localhost:${options.port}`);
});

