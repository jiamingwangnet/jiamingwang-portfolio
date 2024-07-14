"use client"

import Link, {LinkProps} from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props extends LinkProps {
    children: React.ReactNode;
    href: string;
    elements: string[]; // id
    useClass?: boolean;
    onClick?: (event:React.MouseEvent<HTMLAnchorElement,MouseEvent>) => void;
    animations: {name: string, duration:number}[];
}

const sleep = (duration:number):Promise<void> => {
    return new Promise(resolve => setTimeout(() => {
                resolve()
        }, duration));
};

export default function TransitionLink({
    children, href, elements, animations, onClick, useClass=false, ...props
}: Props)
{
    const router = useRouter();
    const path = usePathname();

    const click = useCallback(async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        if(path === href) return;

        if(elements.length !== animations.length) throw new Error("TransitionLink: elements length does not match animations.");

        for(let i = 0; i < elements.length; i++)
        {
            document.querySelector(`${useClass ? "." : "#"}${elements[i]}`)?.classList.add(animations[i].name);
        }

        await sleep(Math.max(...animations.map(anim => anim.duration)));

        router.push(href);
    }, [router, path]);

    return (
        <Link 
            onClick={e => {click(e); if(onClick)onClick(e);}}
            href={href} {...props}>
            {children}
        </Link>
    )
}