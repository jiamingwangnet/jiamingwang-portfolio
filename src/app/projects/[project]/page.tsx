import { notFound } from "next/navigation";
import Project from "../_data/interface";
import ProjectData from "../_data/projects.json";
import Heading from "@/components/Heading/Heading";
import { Manrope } from "next/font/google";
import OutboundLink from "@/components/OutboundLink/OutboundLink";

const manrope = Manrope({
    subsets:['latin'],
});

// static website
export async function generateStaticParams()
{
    return ProjectData.projects.map((p:Project) => {
        return {
            project: p.url
        }
    })
}

type Props = {
    params: {
        project: string;
    }
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
                    <Heading className="pt-4 md:text-5xl" size="4xl">{proj.name}</Heading>
                    <table className="m-3">
                        <tbody>
                            <tr>
                                <th className={`text-xl pr-8 ${manrope.className} font-bold text-left`}>Date</th>
                                <td className="text-lg">{proj.date}</td>
                            </tr>
                            <tr>
                                <th className={`text-xl pr-8 ${manrope.className} font-bold text-left`}>Link</th>
                                <td className="text-lg">
                                    <OutboundLink href={proj.link}>{proj.link}</OutboundLink>
                                </td>
                            </tr>
                            <tr>
                                <th className={`text-xl pr-8 ${manrope.className} font-bold text-left`}>Type</th>
                                <td className="text-lg">
                                    {proj.type.join(', ')}
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