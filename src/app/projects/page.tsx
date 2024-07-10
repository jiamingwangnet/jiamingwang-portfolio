"use client"

import { Manrope } from 'next/font/google';
import ProjectData from "./_data/projects.json";
import Link from 'next/link';
import "./style.css";
import Image from 'next/image';
import "../globals.css"
import { useCallback, useState, useRef, RefObject, useEffect } from 'react';
import Project from './_data/interface';
import Heading from '@/components/Heading/Heading';
import { FlyInRL, FlyInLR } from '../Animations';   

const manrope = Manrope({
    subsets:['latin'],
});

export default function Projects()
{
    const [projImageStates, setProjImageStates] = useState<boolean[]>([]);
    const projImageMap = useRef<{[key:string]:number}>({}); // change to array????

    const currentImage = useRef<number>(-1); 

    useEffect(() => {
        setProjImageStates(new Array<boolean>(ProjectData.projects.length).fill(false));
     }, []);

    const onHover = useCallback((projUrl: string) => {
        const newState = [...projImageStates];
        newState[projImageMap.current[projUrl]] = true;

        if(currentImage.current !== -1 && projImageMap.current[projUrl] !== currentImage.current) 
            newState[currentImage.current!] = false;

        setProjImageStates(newState);
        currentImage.current = projImageMap.current[projUrl];        
    }, [projImageStates, setProjImageStates, projImageMap, currentImage])

    return (
        <div className="holderWrapper overflow-x-hidden">
            <main className="contentHolder bg-bg-color/30 overflow-y-hidden overflow-x-hidden" style={{paddingTop:"4.75rem"}}>
                <div className='w-full h-full'>
                    <Heading style={{animation: FlyInLR("0ms")}}>Projects</Heading>
                    <div className='flex md:justify-between md:flex-row-reverse justify-start flex-wrap md:flex-nowrap h-[calc(100%-4.75rem-3.75rem)]'>
                        <ul className='list-none md:h-full md:flex-shrink-0 md:flex-grow-0 md:basis-1/2 md:w-auto h-full w-full'>
                            {
                                ProjectData.projects.map((proj:Project, idx:number) => {
                                    return (
                                        <li className='md:text-4xl text-3xl m-5 projlist' onMouseOver={() => {onHover(proj.url)}}
                                        style={{animation: FlyInRL(`${idx * 200}ms`)}}
                                        key={proj.url}>
                                            <Link href={`/projects/${proj.url}`}>{proj.name}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className='md:grid hidden w-1/2'>
                            {
                                ProjectData.projects.map((proj:Project, idx:number) => {
                                    projImageMap.current[proj.url] = idx;

                                    return (
                                        <img key={proj.url} src={proj.image} alt="display" 
                                        className="none md:block h-auto w-full object-cover col grid-rows-1 rounded-2xl" 
                                        style={{
                                            animation: projImageStates[idx] ? "480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards fadeIn" : 
                                            "480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards fadeOut",
                                            visibility: "hidden",
                                            opacity: 0,
                                            gridColumn: 1,
                                            gridRow: 1,
                                        }}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}