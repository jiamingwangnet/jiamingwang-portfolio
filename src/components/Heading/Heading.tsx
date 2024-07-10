import { Manrope } from 'next/font/google';
import { CSSProperties } from 'react';

const manrope = Manrope({
    subsets:['latin'],
});

export default function Heading({children, className, style}:{children:string, className?:string, style?:CSSProperties}) 
{
    return <h1 className={`text-5xl border-b w-full pb-3 mb-3 ${manrope.className} font-thin ${className}`} style={style}>{children}</h1>
}