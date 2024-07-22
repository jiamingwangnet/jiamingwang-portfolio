import { TitleFont } from "@/app/fonts";
import { CSSProperties } from 'react';



export default function Heading({children, className, style, size="5xl"}:{children:string|React.ReactNode, className?:string, style?:CSSProperties, size?:string}) 
{
    return <h1 className={`text-${size} border-b w-full pb-3 mb-3 ${TitleFont.className} font-thin ${className}`} style={style}>{children}</h1>
}