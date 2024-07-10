import "../globals.css"
import Image from "next/image";
import photo from "../../resources/IMG_2094C.jpg";
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
                    <div className="relative w-fit flex flex-row-reverse items-center justify-center flex-wrap md:flex-nowrap h-full">
                        <div className="m-5 fly-in-r-l lg:w-1/3 md:w-1/2 w-full h-1/2 md:h-auto">
                            <Image src={photo} alt="Photo of my piano" 
                            className="md:w-full md:max-h-[550px] h-full rounded-lg object-cover" priority/>
                        </div>
                        <div className="fly-in-l-r lg:w-2/3 md:w-1/2 h-2/6 md:h-auto">
                            <Heading>About</Heading>
                            <p className="lg:text-xl text-m font-thin">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae fugit rem quaerat totam voluptas ipsam laboriosam natus, soluta iure neque nostrum praesentium eaque molestias optio, recusandae sint, harum modi cum!</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}