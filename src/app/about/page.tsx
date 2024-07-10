import "../globals.css"
import Image from "next/image";
import photo from "../../resources/IMG_2429.JPG";
import { Manrope } from 'next/font/google';
import Heading from "@/components/Heading/Heading";
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: "About"
}

const manrope = Manrope({
    subsets:['latin'],
})

export default function About()
{
    return (
        <>
            <div className="holderWrapper overflow-x-hidden">
                <main className="contentHolder bg-bg-color/90 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                    <div className="relative w-fit flex flex-row-reverse items-center justify-center flex-wrap md:flex-nowrap md:h-full">
                        <div className="m-5 fly-in-r-l lg:w-1/3 md:w-1/2 w-full h-1/2 md:h-auto">
                            <Image src={photo} alt="Photo of my piano" 
                            className="md:w-full md:max-h-[550px] h-full rounded-lg object-cover" priority/>
                        </div>
                        <div className="fly-in-l-r lg:w-2/3 md:w-1/2 h-2/6 md:h-auto">
                            <Heading>About</Heading>
                            <p className="lg:text-xl text-m font-thin m-1">
                                Hello, my name is Jiaming Wang. I am currently a high school student in Australia aiming for a future career in software engineering. I am also a pianist with around 7 years of experience.
                                 Other than software development, I am also interested in music composition as I have experience on the piano. I am a curious person and always prepared to take on new challenges.
                            </p>
                            <a className="m-4 text-lg text-highlight-2 underline underline-offset-4" 
                            href="/assets/files/Resume-Jiaming Wang.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}