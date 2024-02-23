const messages = []; //stores all the messages sent
const subscribers = []; //stores any new messages sent upon listening

//to push new users to the subscribers array
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {

    Query: { //gets all messages
        messages: () => messages, //returns the messages array
        room : ()=> messages
    },
    Mutation: { //post new message and returns id
        postMessage: (_, {roomId ,user, text } , {pubSub}) => {
            const id = messages.length; //create the id for new message
            messages.push({id, user, text}); //push Message object to messages array
            subscribers.forEach((fn) => fn());
            pubSub.publish("messages" , {id, user, text})
            return id; //return the id
        },
        sendMessage :(_ , {input} , {pubSub})=>{
            const {roomId, user , text} = input
            const id = messages.length
            messages.push({id, user, text});
            pubSub.publish("newMessage",roomId , {id, user ,text})
            return {id, user ,text}
        }
    },
    Subscription: {
        messages:  {
            subscribe: (parent, args , {pubsub}) => {

                //create random number as the channel to publish messages to
                const channel = Math.random().toString(36).slice(2, 15);

                //push the user to the subscriber array with onMessagesUpdates function and
                //publish updated messages array to the channel as the callback
                onMessagesUpdates(() => pubsub.publish(channel, { messages }));

                //publish all messages immediately once a user subscribed
                setTimeout(() => pubsub.publish(channel, { messages }), 0);
                pubsub.subscribe("messages")
                return pubsub.asyncIterator(channel , { messages });
                // return asyncIterator(channel);
            },
            resolve: (payload) => {
                return payload;
            },
        },
        newMessage : {
            subscribe : (_ , {roomId} , {pubSub})=>pubSub.subscribe("newMessage" , roomId ),
            resolve : (payload) => payload
        }
    },

};

module.exports = resolvers;


