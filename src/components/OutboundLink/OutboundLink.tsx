import Link from "next/link";
import { CSSProperties } from "react";
import "@/app/globals.css";
import "./style.css";

export default function OutboundLink(
    {children, className="", style={}, href}:
    {children:string|React.ReactNode, className?:(string|undefined), style?:(CSSProperties|undefined), href:string})
{
    return <a className={`${className ?? ""} linkt`} style={style} target="_blank" href={href} rel="noopener noreferrer">{children}<span className="arrow inline-block"></span></a>
}