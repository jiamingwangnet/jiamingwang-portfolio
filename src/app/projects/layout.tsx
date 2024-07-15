import { Metadata } from 'next';

export const metadata:Metadata = {
    title: {
        default: "Projects",
        template: "Jiaming Wang | %s"
    },
    openGraph: {
        title: "Jiaming Wang | Projects",
        description: "Jiaming's projects.",
        url: "https://jiamingwang.net/projects",
        siteName: "Jiaming Wang",
        images: [
            {
                url:"https://jiamingwang.net/assets/logo.png",
                width: 2000,
                height: 2000,
                alt: "Logo",
            }
        ],
        locale: "en_AU",
        type: "website",
      },
}

export default function ProjectsLayout({children, modal}:{children:React.ReactNode,modal:React.ReactNode})
{
    return <>
        {modal}
        {children}
    </>
}