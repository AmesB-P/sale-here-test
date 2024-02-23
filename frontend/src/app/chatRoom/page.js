"use client"
import {useState} from "react";
import {useUser} from "@/app/hooks/useUser";
import {useRoom} from "@/app/hooks/useRoom";
import {useMutation, useSubscription, gql} from '@apollo/client';

const Messages = ({userName, roomId = "1"}) => {

    const [roomMessages , setRoomMessages] =  useState([])

    const GET_MESSAGES = gql`
              subscription NewMessage($roomId : ID!){
              newMessage(roomId : $roomId){
                id
                user
                text
               }
            }
        `;
    const {data , loading , error} = useSubscription(
        GET_MESSAGES ,
        {
            variables : {roomId},
            onData : (data) => {
                const {newMessage} = data.data.data
                setRoomMessages(prevState => [...prevState , newMessage])
            }
        }
    )

    if (!data) {
        return null;
    }


    return (
        <div className={" w-full min-h-full grid-cols-1 p-[10px] "}>
            {roomMessages.map((message ,index) => {
                return (
                    <div key={index} className={`${message.user === userName ?`text-end` : `text-start`} mt-4`} >
                        <p className={"mb-1"}>{message.user}</p>
                        <span className={"text-[0.9rem] text-white pr-4 pl-4 pt-2 pb-2 bg-blue-500 rounded-[15px]  bg-gradient-to-br from-[#c41417] to-[#b31315]"}>
                            {message.text}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
export default function EnterName() {
    const {roomId} = useRoom();
    const {userName} = useUser();

    const [text, setText] = useState("");

    const POST_MESSAGE = gql`
        mutation SendMessage($roomId : ID! , $user : String , $text : String){
        sendMessage(input: { roomId: $roomId, user: $user, text: $text}) {
         id
         user
         text
        }
    }
    `;

    const [sendMessage, {data, loading, error}] = useMutation(POST_MESSAGE)


    const newMessage = async (event) => {
        if (event.key === "Enter") {
            if (!!userName && !!text) {
                await  sendMessage({ variables: { roomId , text , user : userName } });
                setText("");
            } else {
                alert("ไม่มีข้อความ")
            }

        }


    }

    return (

        <div className={"h-[90vh] rounded-[20px] bg-[#ffffff] flex flex-col gap-4 "}>
            <div className={"text-[37px] text-[#383838] text-start grid-cols-1 pt-2 pl-5 "}>
                {roomId}
            </div>

            <div className={"flex h-full bg-[#d3d3d3] bg-opacity-15  m-10 mt-0 rounded-[10px] items-end justify-end overflow-hidden"}>
                <div className={"flex flex-col w-full h-full grid-cols-1 items-end justify-end "}>
                        <Messages userName={userName} roomId={roomId}/>

                    <input
                        id={"inputMessage"}
                        onKeyPress={newMessage}
                        className={"text-[#4e4e4e] text-[34px] text-end pr-2 w-full bg-white border-[#D3D3D3] border-solid rounded-[10px] h-[60px] border-2 placeholder:text-end placeholder:translate-y-2/3 placeholder:mr-1 placeholder:text-[10px] "}
                        placeholder={"Enter เพื่อส่ง"}
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                </div>
            </div>
        </div>
    )
}