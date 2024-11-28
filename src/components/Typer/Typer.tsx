"use client"

import { useEffect, useState } from "react";

export default function Typer(
    {
        children,
        startDelay,
        typeDelay
    }:
    {
        children:string | JSX.Element,
        startDelay:number,
        typeDelay: number
    }
)
{
    const childText:string = typeof(children) === "string" ? children : children.props.children;

    const [curText, setCurText] = useState("");

    useEffect(() => {
        setTimeout(() => {
            if(curText === childText) return;

            setCurText(curText + childText[curText.length]);
        }, curText.length === 0 ? startDelay : typeDelay);
    });

    return (<>
        &#8203;{curText}<span className={`border-r w-0 ml-1 ${curText === childText ? "hidden" : "inline"}`}></span>
    </>);
}