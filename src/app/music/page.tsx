import Heading from "@/components/Heading/Heading";
import OutboundLink from "@/components/OutboundLink/OutboundLink";
import { Metadata } from 'next';
import { FlyInLR } from "../Animations";
import GlitchTyper from "@/components/GlitchTyper/GlitchTyper";
import "./style.css";


export const metadata:Metadata = {
    title: "Music",
    description: "Jiaming's music.",
    openGraph: {
        title: "Jiaming Wang | Music",
        description: "Jiaming's music.",
        url: "https://jiamingwang.net/music",
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

export default function Music()
{
    return (
        <div className="holderWrapper overflow-x-hidden">
            <main className="contentHolder bg-bg-color/30 overflow-y-hidden overflow-x-hidden" style={{paddingTop:"4.75rem"}}>
                <div className='w-11/12 h-full mr-auto ml-auto trContent'>
                    <Heading style={{animation: FlyInLR("0ms")}}><GlitchTyper startDelay={150} typeDelay={50} switchDelay={10}>Music</GlitchTyper></Heading>

                    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
                        <OutboundLink href="https://soundcloud.com/wgj1mg" className="text-3xl md:text-4xl" style={{color:"var(--text-color)"}}>
                            <GlitchTyper startDelay={350} typeDelay={50} switchDelay={10}>
                                {
                                    "Soundcloud".split('').map((item, idx) => {
                                        const func = (x:number) => 18 * Math.sin(x) * Math.cos(2 * x);

                                        return (
                                            <span key={idx} style={{
                                                position:"relative",
                                                bottom: `${func(idx)}px`,
                                            }} className="md:m-4 m-1 soundcloud-text">{item}</span>
                                        )
                                    })
                                }
                            </GlitchTyper>
                        </OutboundLink>
                    </div>
                </div>
            </main>
        </div>
    );
}