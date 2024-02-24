const typeDefs = `
  type Message {
    id: ID!
    user: String!
    text: String!
  }
  input SendMessage {
  roomId : ID!
  user : String
  text : String
  }
  type Query {
    messages: [Message!]
    room(id : ID!) : [Message!]!
  }
  type Mutation {
    postMessage( user: String!, text: String!): ID!,
    sendMessage(input :SendMessage! ) : Message!
  }
  type Subscription {
    messages: [Message!]
    newMessage(roomId : ID!) : Message!
  }
`;

module.exports = typeDefs