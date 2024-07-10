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
    const [hasHovered, setHasHovered] = useState<boolean>(false);
    const projImageMap = useRef<{[key:string]:number}>({}); // change to array????

    const currentImage = useRef<number>(-1); 

    // sort projects
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    ProjectData.projects.sort((a:Project, b:Project) => {
        const dstringA = a.date.split('/');
        const dstringB = b.date.split('/');
        
        return - new Date(`${dstringA[0]} ${months[parseInt(dstringA[1])-1]} ${dstringA[2]}`).getTime()
             + new Date(`${dstringB[0]} ${months[parseInt(dstringB[1])-1]} ${dstringB[2]}`).getTime();
    });

    useEffect(() => {
        setProjImageStates(new Array<boolean>(ProjectData.projects.length).fill(false));
     }, []);
     

    const onHover = useCallback((projUrl: string) => {
        setHasHovered(true);

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
                <div className='w-11/12 h-full mr-auto ml-auto'>
                    <Heading style={{animation: FlyInLR("0ms")}}>Projects</Heading>
                    <div className='flex md:justify-between md:flex-row-reverse justify-start flex-wrap md:flex-nowrap h-[calc(100%-4.75rem)]'>
                        <div className='overflow-hidden md:h-full md:flex-shrink-0 md:flex-grow-0 md:basis-1/2 md:w-auto h-full w-full'>
                            <ul className='list-none  h-full w-full overflow-y-auto overflow-x-hidden 
                                            pr-[20px] box-content'>
                                {
                                    ProjectData.projects.map((proj:Project, idx:number) => {
                                        return (
                                            <li className='md:text-4xl text-3xl m-5 projlist transition-all hover:tracking-widest' onMouseOver={() => {onHover(proj.url)}}
                                            style={{animation: FlyInRL(`${idx * 100}ms`),transform:"translateX(100vw)"}}
                                            key={proj.url}>
                                                <Link href={`/projects/${proj.url}`}>{proj.name}
                                                    <div className='text-lg relative'>{proj.type[0]}</div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className='md:grid hidden w-1/2'>
                            {
                                ProjectData.projects.map((proj:Project, idx:number) => {
                                    projImageMap.current[proj.url] = idx;

                                    return (
                                        <img key={proj.url} src={proj.image} alt="display" 
                                        className="md:block h-full w-full object-cover col grid-rows-1 rounded-2xl" 
                                        style={{
                                            animation: projImageStates[idx] ? "480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards fadeIn" : 
                                            (hasHovered ? "480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards fadeOut" : ""),
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