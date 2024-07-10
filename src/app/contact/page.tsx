import Heading from "@/components/Heading/Heading";
import OutboundLink from "@/components/OutboundLink/OutboundLink";
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: "Contact"
}

export default function Contact()
{
    return <>
        <div className="w-11/12 mr-auto ml-auto mt-3">
            <Heading>Contact</Heading>
            <ul>
                <li>Email: <OutboundLink href="mailto:jiamingwang.net@gmail.com">jiamingwang.net@gmail.com</OutboundLink></li>
                <li>Github: <OutboundLink href="https://github.com/jiamingwangnet">github.com/jiamingwangnet</OutboundLink></li>
            </ul>
        </div>
    </>
}