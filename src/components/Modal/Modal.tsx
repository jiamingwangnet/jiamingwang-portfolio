"use client"

import { useRouter } from "next/navigation";
import "@/app/globals.css"
import { FlyInLR } from "@/app/Animations";

export default function Modal({children, zindex=70}:{children:React.ReactNode,zindex?:number})
{
    const router = useRouter();

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center`} style={{zIndex: zindex, animation:
            "fadeIn 380ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards"
        }}
            onClick={e => {
                router.back();
            }}
        >
            <div 
                style={{animation: FlyInLR("0ms", "350ms")}}
                onClick={e => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                }}
                className="relative p-3 h-[calc(100%-50px)] lg:w-2/3 md:w-10/12 w-[calc(100%-20px)] bg-bg-color rounded-xl shadow-2xl border border-white/20">
                <span className="absolute right-4 text-3xl w-8 h-8 transition hover:bg-white/30 text-center rounded-full cursor-pointer"
                    onClick={e => {
                        router.back();
                    }}
                >&times;</span>
                <div className="overflow-y-auto h-full w-full">{children}</div>
            </div>
        </div>
    )
}