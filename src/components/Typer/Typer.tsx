"use client"

import { useEffect, useState } from "react";

export default function Typer(
    {
        children,
        startDelay,
        typeDelay
    }:
    {
        children:string,
        startDelay:number,
        typeDelay: number
    }
)
{
    const [curText, setCurText] = useState("");

    useEffect(() => {
        setTimeout(() => {
            if(curText === children) return;

            setCurText(curText + children[curText.length]);
        }, curText.length === 0 ? startDelay : typeDelay);
    });

    return (<>
        &#8203;{curText}<span className={`border-r w-0 ml-1 ${curText === children ? "hidden" : "inline"}`}></span>
    </>);
}