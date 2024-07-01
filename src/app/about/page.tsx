import "../globals.css"
import Image from "next/image";
import photo from "../../resources/IMG_2260-min-c.jpg";
import { Manrope } from 'next/font/google';

const manrope = Manrope({
    subsets:['latin'],
})

export default function About()
{
    return (
        <>
            <div className="holderWrapper">
                <main className="contentHolder bg-bg-color/90 flex items-center justify-center overflow-y-scroll">
                    <div className="relative w-fit flex flex-row-reverse items-center justify-center flex-wrap lg:flex-nowrap">
                        <div className="m-5 fly-in-r-l">
                            <Image src={photo} alt="Photo of my desk" 
                            className="lg:h-auto lg:w-full lg:max-h-none lg:max-w-[860px] w-auto h-full max-h-[650px] rounded-lg"/>
                        </div>
                        <div className="fly-in-l-r">
                            <h1 className={`lg:text-6xl text-5xl border-b w-full pb-3 mb-3 ${manrope.className} font-thin`}>About</h1>
                            <p className="lg:text-xl text-m font-thin">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae fugit rem quaerat totam voluptas ipsam laboriosam natus, soluta iure neque nostrum praesentium eaque molestias optio, recusandae sint, harum modi cum!</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}