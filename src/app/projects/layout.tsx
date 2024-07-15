import { Metadata } from 'next';

export const metadata:Metadata = {
    title: {
        default: "Projects",
        template: "Jiaming Wang | %s"
    }
}

export default function ProjectsLayout({children, modal}:{children:React.ReactNode,modal:React.ReactNode})
{
    return <>
        {modal}
        {children}
    </>
}