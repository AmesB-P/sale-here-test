"use client"
import {motion} from "framer-motion";
import {useUser} from "@/app/hooks/useUser";
import Link from 'next/link'

export default function CreateOrJoinChatRoom() {
    const {userName} = useUser();
    return (
        <div className={"h-[90vh] rounded-[20px] bg-[#ffffff] flex flex-col items-center p-20 gap-4"}>
            <motion.span className={"text-[37px] text-[#383838]"}
                         initial={{y: 20, opacity: 0}}
                         animate={{y: 0, opacity: !!userName ? 1 : 0,}}
                         transition={{duration: 0.2}}
            >
                คุณ {userName}
            </motion.span>

            <div className={"flex flex-col grid-cols-1 h-full gap-2 justify-center items-center"}>
                    <motion.div
                        initial={{y: 20, opacity: 0}}
                        animate={{y: 0, opacity: !!userName ? 1 : 0,}}
                        transition={{duration: 0.6}}
                    >
                        <Link href={"/createOrJoinChatRoom/createRoom"}>
                            <motion.button
                                className={"text-white hover:text-[#c41417] bg-[#ffffff] bg-gradient-to-br from-[#c41417] to-[#b31315] rounded-[10px] w-full pr-20 pl-20 pt-5 pb-5"}
                                whileHover={{ scale : 1.2}}
                                whileTap={{ scale : 1}}
                            >
                                สร้างห้องใหม่
                            </motion.button>
                        </Link>

                    </motion.div>
                    <motion.div
                        initial={{y: 20, opacity: 0}}
                        animate={{y: 0, opacity: !!userName ? 1 : 0,}}
                        transition={{duration: 0.8}}
                    >
                        <Link href={"/createOrJoinChatRoom/joinRoom"}>
                            <motion.button
                                className={"text-[#6f6f6f] hover:text-[#c41417] bg-[#ffffff] rounded-[20px] w-full pr-10 pl-10 pt-5 pb-5"}
                            >
                                เข้าร่วมแชท
                            </motion.button>
                        </Link>
                    </motion.div>
            </div>
        </div>
    )
}