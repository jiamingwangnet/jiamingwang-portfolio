"use client"

import "../../app/palette.css";
import "@/app/globals.css";
import "./style.css";
import Image from "next/image"
import BarSVG from "/public/assets/bar.svg"
import Logo from "/public/assets/logo.svg";
import { RefObject, useCallback, useRef, useState, useEffect } from "react";
import { MenuFont } from "@/app/fonts";
import TransitionLink from "../TransitionLink/TransitionLink";
import {ORIGINAL_RATE, SetRate, NEW_RATE} from "@/app/globals";

export default function Navbar({contentClass="trContent"}:{contentClass?:string})
{
    const mlist:RefObject<HTMLUListElement> = useRef(null);

    const [showMenu, setShowMenu] = useState(false);

    const toggle = useCallback(() => {
        setShowMenu(!showMenu);      
    }, [showMenu, setShowMenu])

    useEffect(() => {
        if(showMenu) SetRate(NEW_RATE);
        else SetRate(ORIGINAL_RATE); 
    }, [showMenu])

    const [click, setClick] = useState(false);

    const items:{name:string,url:string}[] = [
        {
            name: "Home", 
            url: "/"
        },
        {
            name: "About Me", 
            url: "/about"
        },
        {
            name: "Projects", 
            url: "/projects"
        },
        {
            name: "Contact", 
            url: "/contact"
        },
    ];
    
    useEffect(() => {
        setShowMenu(false);
    }, [click])

    return (
        <nav>
            <div className="flex justify-center h-12 lg:pt-5">
                <div className="m-2 flex items-center justify-between w-[96%] z-30">
                    <div>
                        <TransitionLink href="/" useClass elements={[contentClass]} animations={[{name: "fly-out-l-r", duration: 380}]}
                            onClick={e => {setClick(!click)}}>
                            <Image 
                                priority
                                src={Logo}
                                alt={"Logo"}
                                className="m-3"
                                width={35}
                                height={35}
                            />
                        </TransitionLink>
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
                        {
                            items.map((value, idx) => {
                                return <li key={value.name}
                                            className={`lg:text-4xl md:text-4xl sm:text-3xl text-2xl sm:mb-6 mb-3 transition-all hover:tracking-[0.25em] ${MenuFont.className}`} 
                                            style={{animation: 
                                            showMenu ? `drop 250ms cubic-bezier(.26,.84,.4,1.01) ${idx * 100}ms forwards` : 
                                            `fly 250ms cubic-bezier(.57,-0.03,.94,.22) ${idx * 100}ms forwards`, transform: "translateY(-100vh)"}}>
                                            
                                                <TransitionLink href={value.url} elements={[contentClass]} useClass animations={[{name:"fly-out-l-r",duration:380}]}
                                                    onClick={e => {setClick(!click)}}
                                                >{value.name}</TransitionLink>
    
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}