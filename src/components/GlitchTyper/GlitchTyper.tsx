"use client"

import { useEffect, useRef, useState } from "react";

const RandLetter = () => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*{}[]<>=+";
    const letter = Math.floor(Math.random() * letters.length);
    const cap = Math.floor(Math.random() * 2);

    return cap ? letters[letter].toUpperCase() : letters[letter];
}

export default function GlitchTyper(
    {
        children,
        startDelay,
        switchDelay,
        typeDelay,
        endless = false,
    }:
    {
        children:string | JSX.Element[],
        startDelay:number,
        switchDelay: number,
        typeDelay: number,
        endless?: boolean,
    }
)
{
    const isString = typeof(children) === "string";
    const typedText:any[] = isString ? children.split('') : children;

    const [curText, setCurText] = useState<any[]>(new Array(typedText.length).fill(''));

    const idx = useRef(-1);
    const [counter, setCounter] = useState(0);

    typeDelay = Math.floor(typeDelay / switchDelay);
    startDelay = Math.floor(startDelay / switchDelay);

    useEffect(() => {
        setTimeout(() => {
            if(!endless && curText.join('') === children) return;

            if(counter > startDelay && counter % typeDelay === 0)
            {
                idx.current++;
            }

            if(endless)
            {
                setCurText(curText.map((c, i) => {
                    return RandLetter();
                }));
            }
            else
            {
                setCurText(curText.map((c, i) => {
                    return i <= idx.current ? typedText[i] : (typedText[i] === ' ' ? ' ' : RandLetter());
                }));
            }

            setCounter(counter + 1);
        }, switchDelay);
    }, [counter]);

    return (<>
        {isString ? curText.join('') : curText}
    </>);
}