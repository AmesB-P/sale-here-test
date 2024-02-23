"use client"
import {AnimatePresence, motion} from "framer-motion";
import Link from 'next/link'
import {useUser} from "@/app/hooks/useUser";

export default function EnterName() {
    // const [userName, setUserName] = useState("")
    const {userName, setUserName} = useUser()

    const handleClickEnterName =()=>{
        localStorage.setItem("userName" , JSON.stringify(userName))
    }
    return (
        <div className={"h-[90vh] rounded-[20px] bg-[#ffffff] flex flex-col items-center p-20 gap-4 "}>
            <span className={"text-[37px] text-[#383838]"}>
                ชื่อของคุณ
            </span>

            <input className={"text-[#4e4e4e] border-[3px] border-[#D3D3D3] border-solid h-[60px] rounded-[10px] text-[34px] w-[60%] text-center"}
                   onChange={(e) => setUserName(e.target.value)} value={userName}/>

            <div className={"grid-cols-1 h-full"}>
                <AnimatePresence mode={"wait"}>
                    <motion.div
                        initial={{y: 20, opacity: 0}}
                        animate={{y: !!userName ? 0: 20, opacity: !!userName ? 1 : 0,}}
                        transition={{duration: 0.4}}
                    >
                        <Link href={{pathname : "/createOrJoinChatRoom"}}>
                        <motion.button
                            className={"text-white hover:text-[#c41417] bg-[#ffffff] bg-gradient-to-br from-[#c41417] to-[#b31315] rounded-[10px] w-full pr-10 pl-10 pt-5 pb-5"}
                            onClick={handleClickEnterName}
                        >
                                ยืนยัน
                        </motion.button>
                        </Link>
                    </motion.div>

                </AnimatePresence>

            </div>
        </div>
    )
}