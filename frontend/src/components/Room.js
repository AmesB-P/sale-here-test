"use client"
import {motion} from "framer-motion";
import {useRoom} from "@/app/hooks/useRoom";
import Link from "next/link";

export default function EnterName({type = "create"}) {
    const {setRoomId} = useRoom();
    return (

        <div className={"h-[90vh] rounded-[20px] bg-[#ffffff] flex flex-col items-center p-20 gap-6"}>
            <span className={"text-[37px] text-[#383838]"}>
                {
                    type === "create" ? "สร้างห้องใหม่" : "เข้าร่วมแชท"
                }
            </span>

            <input className={"text-[#4e4e4e] border-[3px] border-[#D3D3D3] border-solid h-[60px] rounded-[10px] text-[34px] w-[60%] text-center"}
            onChange={(e) => setRoomId(e.target.value)}/>

            <div className={"flex flex-row grid-cols-1 h-full gap-2 "}>
                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.4}}
                >

                    <Link href={"/createOrJoinChatRoom"}>
                        <motion.button
                            className={"text-[#6f6f6f] hover:text-[#c41417] bg-[#ffffff] rounded-[20px] w-full pr-10 pl-10 pt-5 pb-5"}
                        >
                            กลับ
                        </motion.button>
                    </Link>

                </motion.div>

                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.2}}
                >
                    <Link href={"/chatRoom"}>
                        <motion.button
                            className={"text-white hover:text-[#c41417] bg-[#ffffff] bg-gradient-to-br from-[#c41417] to-[#b31315] rounded-[10px] w-full pr-10 pl-10 pt-5 pb-5"}
                        >
                            ยืนยัน
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}