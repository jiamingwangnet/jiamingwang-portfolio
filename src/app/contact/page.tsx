import Heading from "@/components/Heading/Heading";
import OutboundLink from "@/components/OutboundLink/OutboundLink";
import { Metadata } from 'next';
import { FlyInRL } from "../Animations";

export const metadata:Metadata = {
    title: "Contact"
}

export default function Contact()
{
    return <>
        <div className="w-11/12 mr-auto ml-auto mt-3 trContent">
            <Heading style={{animation: FlyInRL()}}>Contact</Heading>
            <ul>
                <li style={{animation: FlyInRL("100ms"), transform:"translateX(100vw)"}}>Email: <OutboundLink href="mailto:jiamingwang.net@gmail.com">jiamingwang.net@gmail.com</OutboundLink></li>
                <li style={{animation: FlyInRL("150ms"), transform:"translateX(100vw)"}}>Github: <OutboundLink href="https://github.com/jiamingwangnet">github.com/jiamingwangnet</OutboundLink></li>
            </ul>
        </div>
    </>
}