"use client"

import { useEffect, useRef, useState } from "react";

const RandLetter = () => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";
    const letter = Math.floor(Math.random() * letters.length);
    const cap = Math.floor(Math.random() * 2);

    return cap ? letters[letter].toUpperCase() : letters[letter];
}

const RandRange = (max:number) => {
    return Math.floor(Math.random() * max);
}

export default function RandomGlitchTyper(
    {
        children,
        startDelay,
        switchDelay,
        typeDelay,
        amount,
    }:
    {
        children:string,
        startDelay:number,
        switchDelay: number,
        typeDelay: number,
        amount:number
    }
)
{
    const [curText, setCurText] = useState<string[]>(new Array(children.length).fill(''));

    const [typed, setTyped] = useState(new Array<boolean>(children.length).fill(false));
    const [counter, setCounter] = useState(0);
    const notTyped = useRef([...Array(children.length).keys()]);

    typeDelay = Math.floor(typeDelay / switchDelay);
    startDelay = Math.floor(startDelay / switchDelay);

    useEffect(() => {
        setTimeout(() => {
            if(curText.join('') === children) return;

            if(counter > startDelay && counter % typeDelay === 0)
            {   
                const next = [...typed];

                for(let i = 0; i < amount; i++)
                {
                    const typeI = RandRange(notTyped.current.length);
                    const typeL = notTyped.current[typeI];
                    notTyped.current.splice(typeI, 1);

                    next[typeL] = true; 
                }

                setTyped(next);
            }

            setCurText(curText.map((c, i) => {
                return typed[i] ? children[i] : (children[i] === ' ' ? ' ' : RandLetter());
            }));

            setCounter(counter + 1);
        }, switchDelay);
    }, [counter]);

    return (<>
        {curText.join('')}
    </>);
}