import {Prompt} from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import {AppProviders} from "@/app/providers";

const prompt = Prompt({
    weight: '400',
    subsets: ["latin"]
})

export const metadata = {
    title: "Sale here test",
    description: "By Porames.a",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={prompt.className}>
        <AppProviders>
            <div className={"flex w-dvw h-dvh"}>
                <main className="flex-grow min-h-screen flex-col items-center bg-[url('../assets/images/bg.jpg')] bg-cover">
                    <div className={"grid grid-cols-1 gap-1"}>
                        <div className={"flex grid-cols-1 items-center justify-center"}>
                            <Image src={Logo} alt={"Logo"} className={"w-48 p-2"}/>
                        </div>
                        <div className={"grid-cols-1 pr-10 pl-10"}>
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </AppProviders>
        </body>
        </html>
    );
}
