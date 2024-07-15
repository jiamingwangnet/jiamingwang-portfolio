import { notFound } from "next/navigation";
import Project from "../_data/interface";
import ProjectData from "../_data/projects.json";
import Heading from "@/components/Heading/Heading";
import { Manrope } from "next/font/google";
import OutboundLink from "@/components/OutboundLink/OutboundLink";
import Typer from "@/components/Typer/Typer";
import { Metadata } from "next";

const manrope = Manrope({
    subsets:['latin'],
});

type Props = {
    params: {
        project: string;
    }
}

export function generateMetadata({params}:Props): Metadata
{
    const proj:(Project | undefined) = ProjectData.projects.find((p:Project) => {return p.url === params.project;}); 

    if(proj === undefined) return {title:"404"}

    return {
        title: proj.name,
        description: proj.description,
        openGraph: {
            title: `Jiaming Wang | ${proj.name}`,
            description: proj.description,
            url: `https://jiamingwang.net${proj.url}`,
            siteName: `Jiaming Wang | ${proj.name}`,
            images: [
                {
                    url: `https://jiamingwang.net${proj.image}`,
                    alt: `Image of ${proj.name}`,
                }
            ],
            locale: "en_AU",
            type: "website",
          }
    };
}


export default function ProjectPage({params}:Props)
{
    const proj:(Project | undefined) = ProjectData.projects.find((p:Project) => {return p.url === params.project;}); 

    if(proj === undefined) notFound();

    return (
        <div className="holderWrapper overflow-x-hidden">
            <main className="contentHolder bg-bg-color/90 overflow-y-auto overflow-x-hidden">
                <div className="h-full lg:w-2/3 md:w-10/12 w-full ml-auto mr-auto ">
                    <img src={proj.image} className="object-cover w-full h-[calc(100%*7/12)] rounded-3xl ml-auto mr-auto"/>
                    <Heading className="pt-4 md:text-5xl" size="4xl">
                        <Typer startDelay={300} typeDelay={50}>{proj.name}</Typer>
                    </Heading>
                    <table className="m-3">
                        <tbody>
                            <tr>
                                <th className={`text-xl pr-8 ${manrope.className} font-bold text-left`}>Date</th>
                                <td className="text-lg break-all"><Typer startDelay={400} typeDelay={10}>{proj.date}</Typer></td>
                            </tr>
                            <tr>
                                <th className={`text-xl pr-8 ${manrope.className} font-bold text-left`}>Link</th>
                                <td className="text-lg break-all">
                                    <OutboundLink href={proj.link}>
                                        <Typer startDelay={400} typeDelay={10}>{proj.link}</Typer>
                                    </OutboundLink>
                                </td>
                            </tr>
                            <tr>
                                <th className={`text-xl pr-8 ${manrope.className} font-bold text-left`}>Type</th>
                                <td className="text-lg break-words">
                                    <Typer startDelay={400} typeDelay={10}>{proj.type.join(', ')}</Typer>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p>{proj.description}</p>
                    </div>
            </main>
        </div>
    )
}