"use client"

import { TextFont, TitleFont } from "@/app/fonts";
import ProjectData from "./_data/projects.json";
import Link from 'next/link';
import "./style.css";
import "../globals.css"
import { useCallback, useState, useRef, RefObject, useEffect, Fragment } from 'react';
import Project from './_data/interface';
import Heading from '@/components/Heading/Heading';
import { FlyInRL, FlyInLR } from '../Animations';   
import GlitchTyper from "@/components/GlitchTyper/GlitchTyper";



export default function Projects()
{
    const [projImageStates, setProjImageStates] = useState<boolean[]>([]);
    const [hasHovered, setHasHovered] = useState<boolean>(false);
    const projImageMap = useRef<{[key:string]:number}>({}); // change to array????

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

        const newState = new Array(ProjectData.projects.length).fill(false);
        newState[projImageMap.current[projUrl]] = true;

        setProjImageStates(newState);  
    }, [projImageStates, setProjImageStates, projImageMap])

    return (
        <div className="holderWrapper overflow-x-hidden">
            <main className="contentHolder bg-bg-color/30 overflow-y-hidden overflow-x-hidden" style={{paddingTop:"4.75rem"}}>
                <div className='w-11/12 h-full mr-auto ml-auto trContent'>
                    <Heading style={{animation: FlyInLR("0ms")}}><GlitchTyper startDelay={150} typeDelay={50} switchDelay={10}>Projects</GlitchTyper></Heading>
                    <div className='flex md:justify-between md:flex-row-reverse justify-start flex-wrap md:flex-nowrap h-[calc(100%-4.75rem)]'>
                        <div className='overflow-hidden md:h-full md:flex-shrink-0 md:flex-grow-0 md:basis-7/12 md:w-auto h-full w-full'>
                            <div className="overflow-y-auto overflow-x-hidden 
                                            pr-[20px] box-content md:ml-8 h-full w-full"
                                            style={{perspective: "33rem",}}
                                            >
                                <ul className='list-none w-[98%]'
                                    style={{
                                        transform: "rotateY(-15deg) translateX(-5%)",
                                        transformStyle: 'preserve-3d',
                                        perspectiveOrigin: "170%",
                                        transformOrigin: "80%"
                                    }}
                                >
                                    {
                                        ProjectData.projects.map((proj:Project, idx:number) => {
                                            return (
                                                <li className='lg:text-6xl md:text-5xl sm:text-4xl text-3xl m-5 projlist transition-all hover:tracking-widest whitespace-nowrap text-right' onMouseOver={() => {onHover(proj.url)}}
                                                style={{animation: FlyInRL(`${idx * 50}ms`),transform:"translateX(100vw)"}}
                                                key={proj.url}>
                                                    <Link href={`/projects/${proj.url}`} className={`${TextFont.className}`}>{proj.name}
                                                        <div className={`text-lg relative ${TextFont.className}`}>{proj.type[0]}</div>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                    
                            </div>
                        </div>
                        <div className='md:grid hidden w-5/12 overflow-visible'>
                            {
                                ProjectData.projects.map((proj:Project, idx:number) => {
                                    projImageMap.current[proj.url] = idx;

                                    return (
                                        <Fragment key={proj.url}>
                                            <img src={proj.image} alt="display" 
                                                className="md:block relative top-[-5px] left-[-5px] h-[calc(100%+10px)] min-w-[calc(100%+10px)] object-cover col grid-rows-1 rounded-2xl blur-[10px]" 
                                                style={{
                                                    animation: projImageStates[idx] ? "480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards fadeIn" : 
                                                    (hasHovered ? "480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards fadeOut" : ""),
                                                    visibility: "hidden",
                                                    opacity: 0,
                                                    gridColumn: 1,
                                                    gridRow: 1,
                                                    transform: "translate3d(0,0,0)", // force gpu acceleration
                                                    backfaceVisibility: "hidden",
                                                    perspective: "1000",
                                            }}/>
                                            <img src={proj.image} alt="display" 
                                                className="md:block h-full w-full object-cover col grid-rows-1 rounded-2xl" 
                                                style={{
                                                    animation: projImageStates[idx] ? "480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards fadeIn" : 
                                                    (hasHovered ? "480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards fadeOut" : ""),
                                                    visibility: "hidden",
                                                    opacity: 0,
                                                    gridColumn: 1,
                                                    gridRow: 1,
                                                    transform: "translate3d(0,0,0)", // force gpu acceleration
                                                    backfaceVisibility: "hidden",
                                                    perspective: "1000",
                                            }}/>
                                        </Fragment>
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