import { TitleFont } from "@/app/fonts";
import Link from "next/link";
import { Metadata } from 'next';
import GlitchTyper from "@/components/GlitchTyper/GlitchTyper";

export const metadata:Metadata = {
    title: "404"
}

export default function NotFound()
{
    return <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div>
            <p className="text-center text-lg"><GlitchTyper startDelay={0} typeDelay={0} switchDelay={10} endless>___________________</GlitchTyper></p>
            <h1 className={`text-9xl ${TitleFont.className}`}>404</h1>
            <p className="text-center text-xl">Page not found</p>
            <Link href="/" className="block w-full text-center text-highlight-2">Home</Link>
        </div>
    </div>;
}