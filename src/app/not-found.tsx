import { Manrope } from "next/font/google";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: "404"
}

const manrope = Manrope({
    subsets: ["latin"]
});

export default function NotFound()
{
    return <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div>
            <h1 className={`text-9xl ${manrope.className}`}>404</h1>
            <p className="text-center text-xl">Page not found</p>
            <Link href="/" className="block w-full text-center text-highlight-2">Home</Link>
        </div>
    </div>;
}