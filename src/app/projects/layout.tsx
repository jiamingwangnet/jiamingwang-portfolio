import { Metadata } from 'next';

export const metadata:Metadata = {
    title: "Projects"
}

export default function ProjectsLayout({children}:{children:React.ReactNode})
{
    return <>
        {children}
    </>
}

// SLOTS ROUTES DOES NOT WORK WITH STATIC SERVER
// export default function ProjectsLayout({children, modal}:{children:React.ReactNode,modal:React.ReactNode})
// {
//     return <>
//         {modal}
//         {children}
//     </>
// }