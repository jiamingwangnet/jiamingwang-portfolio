import { Manrope } from 'next/font/google';
import { CSSProperties } from 'react';

const manrope = Manrope({
    subsets:['latin'],
});

export default function Heading({children, className, style, size="5xl"}:{children:string, className?:string, style?:CSSProperties, size?:string}) 
{
    return <h1 className={`text-${size} border-b w-full pb-3 mb-3 ${manrope.className} font-thin ${className}`} style={style}>{children}</h1>
}