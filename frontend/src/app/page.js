"use client"
import Image from "next/image";
import Logo from  "../assets/images/logo.png"
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import EnterName from "@/app/enterName/page";

export default function Home() {
    return (
        <EnterName/>
    );
}
