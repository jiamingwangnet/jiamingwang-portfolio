import "../globals.css"
import Image from "next/image";
import photo from "@/resources/IMG_2429.png";
import Heading from "@/components/Heading/Heading";
import { Metadata } from 'next';
import GlitchTyper from "@/components/GlitchTyper/GlitchTyper";
import RandomGlitchTyper from "@/components/RandomGlitchTyper/RandomGlitchTyper";
import SpotifyPlaying from "@/components/SpotifyPlaying/SpotifyPlaying";

export const metadata:Metadata = {
    title: "About",
    description: "About Jiaming.",
    openGraph: {
        title: "Jiaming Wang | About",
        description: "About Jiaming.",
        url: "https://jiamingwang.net/about",
        siteName: "Jiaming Wang",
        images: [
            {
                url:"https://jiamingwang.net/assets/logo.png",
                width: 2000,
                height: 2000,
                alt: "Logo",
            }
        ],
        locale: "en_AU",
        type: "website",
      },
}

export default function About()
{
    return (
        <>
            <div className="holderWrapper overflow-x-hidden">
                <main className="contentHolder bg-bg-color/90 flex items-center justify-center overflow-y-auto overflow-x-hidden opacity-100 fadeOutContent">
                    <div className="relative w-fit flex flex-row-reverse items-center justify-center flex-wrap md:flex-nowrap md:h-full trContent">
                        <div className="m-5 fly-in-r-l lg:w-1/3 md:w-1/2 w-full h-1/2 md:h-auto">
                            <Image src={photo} alt="Photo of my laptop" 
                            className="md:w-full md:max-h-[550px] h-full rounded-lg object-cover object-bottom" priority/>
                        </div>
                        <div className="fly-in-l-r lg:w-2/3 md:w-1/2 h-2/6 md:h-auto">
                            <Heading><GlitchTyper startDelay={150} typeDelay={50} switchDelay={10}>About</GlitchTyper></Heading>
                            <p className="lg:text-lg text-sm font-thin m-1 overflow-hidden">
                                <RandomGlitchTyper startDelay={5} typeDelay={5} switchDelay={5} amount={8}>
                                Hello, my name is Jiaming Wang. I am currently a high school student in Australia aiming for a future career in software engineering. I am also a pianist with around 7 years of experience.
                                Besides software development, I am likewise interested in music composition as I have experience on the piano. I am a curious person and always prepared to take on new challenges.
                                </RandomGlitchTyper>
                            </p>
                            <a className="m-4 text-base text-highlight-2 underline underline-offset-4" 
                            href="/assets/files/Resume-Jiaming Wang.pdf" target="_blank" rel="noopener noreferrer">Resume</a>

                            <SpotifyPlaying/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}