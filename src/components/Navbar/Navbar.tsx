"use client"

import "../../app/palette.css";
import "./style.css";
import Image from "next/image"
import BarSVG from "/public/assets/bar.svg"
import Logo from "/public/assets/logo.svg";
import { RefObject, useCallback, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Manrope } from "next/font/google";

const manrope = Manrope({
    subsets: ['latin']
})

export default function Navbar()
{
    const mlist:RefObject<HTMLUListElement> = useRef(null);

    const [showMenu, setShowMenu] = useState(false);

    const toggle = useCallback(() => {
        setShowMenu(!showMenu);
    }, [showMenu, setShowMenu])

    const path = usePathname();
    
    useEffect(() => {
        setShowMenu(false);
    }, [path])

    return (
        <nav>
            <div className="flex justify-center h-12 lg:pt-5">
                <div className="m-2 flex items-center justify-between w-[96%] z-30">
                    <div>
                        <Link href="/">
                            <Image 
                                priority
                                src={Logo}
                                alt={"Logo"}
                                className="m-3"
                                width={35}
                                height={35}
                            />
                        </Link>
                    </div>

                    <div>
                        <ul className="flex items-center list-none">
                            <li style={{animation: showMenu ? "spin 250ms cubic-bezier(.26,.84,.4,1.01) forwards" : "spinback 250ms cubic-bezier(.26,.84,.4,1.01) forwards"}}>
                                <button onClick={toggle}>
                                    <Image
                                        priority
                                        src={BarSVG}
                                        alt={"Bar icon"}
                                        className="m-3"
                                    />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="fixed w-full h-full flex justify-center items-center left-0 top-0 z-20 menu" 
                style={{animation: showMenu ? "open 380ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards" : 
                                    "close 480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards",display: 'flex',visibility:'hidden'}}>
                <div className="flex items-center w-full h-full pl-[10%] bg-[#00000098]">
                    <ul className="list-none items-center h-fit" ref={mlist}>
                        <li className={`text-5xl mb-6 transition-all hover:tracking-[0.25em] ${manrope.className}`} 
                            style={{animation: 
                            showMenu ? "drop 250ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards" : 
                            "fly 250ms cubic-bezier(.57,-0.03,.94,.22) 0ms forwards", transform: "translateY(-100vh)"}}><Link href="/">Home</Link></li>
                        <li className={`text-5xl mb-6 transition-all hover:tracking-[0.25em] ${manrope.className}`} 
                            style={{animation: 
                            showMenu ? "drop 250ms cubic-bezier(.26,.84,.4,1.01) 100ms forwards" : 
                            "fly 250ms cubic-bezier(.57,-0.03,.94,.22) 100ms forwards", transform: "translateY(-100vh)"}}><Link href="/about">About Me</Link></li>
                        <li className={`text-5xl mb-6 transition-all hover:tracking-[0.25em] ${manrope.className}`} 
                            style={{animation: 
                            showMenu ? "drop 250ms cubic-bezier(.26,.84,.4,1.01) 200ms forwards" : 
                            "fly 250ms cubic-bezier(.57,-0.03,.94,.22) 200ms forwards", transform: "translateY(-100vh)"}}><Link href="/projects">Projects</Link></li>
                        <li className={`text-5xl mb-6 transition-all hover:tracking-[0.25em] ${manrope.className}`} 
                            style={{animation: 
                            showMenu ? "drop 250ms cubic-bezier(.26,.84,.4,1.01) 300ms forwards" : 
                            "fly 250ms cubic-bezier(.57,-0.03,.94,.22) 300ms forwards", transform: "translateY(-100vh)"}}><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}