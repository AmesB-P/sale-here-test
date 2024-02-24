"use client"
import {motion} from "framer-motion";
import {useRoom} from "@/app/hooks/useRoom";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {useCallback} from "react";

/**
 *
 * @param {string} type - Type for choose component between create chat room or join chat room
 * @return {JSX.Element}
 * @constructor
 */
export default function Room({type = "create"}) {
    const {  roomId, setRoomId} = useRoom();

    const router =  useRouter();

    const handleSubmit = useCallback((event)=>{
        try {
            event.preventDefault()
            if(!!roomId){
                router.push("/chatRoom")
            }else {
                alert(type === "create" ? "ท่านยังไม่ได้ตั้งชื่อห้อง!!" : "กรุณาระบุชื่อห้อง!!")
            }

        }catch (e) {
            setRoomId("")
        }
    },[roomId , setRoomId,type ,router])

    return (
        <div className={"h-[90vh] rounded-[20px] bg-[#ffffff] flex flex-col items-center p-20 gap-6"}>
            <motion.span className={"text-[37px] text-[#383838]"}
                         initial={{y: 20, opacity: 0}}
                         animate={{y: 0, opacity: 1}}
                         transition={{duration: 0.2}}
            >
                {
                    type === "create" ? "สร้างห้องใหม่" : "เข้าร่วมแชท"
                }
            </motion.span>

            <motion.input className={"text-[#4e4e4e] border-[3px] border-[#D3D3D3] border-solid h-[60px] rounded-[10px] text-[34px] w-[60%] text-center"}
            onChange={(e) =>  setRoomId(e.target.value)}
                          initial={{y: 20, opacity: 0}}
                          animate={{y: 0, opacity: 1}}
                          transition={{duration: 0.4}}
            />

            <div className={"flex flex-row grid-cols-1 h-full gap-2 "}>
                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.6}}
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
                    transition={{duration: 0.8}}
                >
                    {/*<Link href={""}>*/}
                        <motion.button
                            className={"text-white hover:text-[#c41417] bg-[#ffffff] bg-gradient-to-br from-[#c41417] to-[#b31315] rounded-[10px] w-full pr-10 pl-10 pt-5 pb-5"}
                            whileHover={{ scale : 1.2}}
                            whileTap={{ scale : 1}}
                            onClick={handleSubmit}
                        >
                            ยืนยัน
                        </motion.button>
                    {/*</Link>*/}
                </motion.div>
            </div>
        </div>
    )
}