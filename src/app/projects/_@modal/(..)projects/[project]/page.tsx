import Modal from "@/components/Modal/Modal";
import { notFound } from "next/navigation";
import Project from "../../../_data/interface";
import ProjectData from "../../../_data/projects.json";
import Heading from "@/components/Heading/Heading";
import { Manrope } from "next/font/google";
import OutboundLink from "@/components/OutboundLink/OutboundLink";

// static website
export async function generateStaticParams()
{
    return ProjectData.projects.map((p:Project) => ({
        project: p.url
    }));
}

const manrope = Manrope({
    subsets:['latin'],
});

type Props = {
    params: {
        project: string;
    }
}

export default function ProjModal({params}:Props)
{
    const proj:(Project | undefined) = ProjectData.projects.find((p:Project) => {return p.url === params.project;}); 

    if(proj === undefined) notFound();

    return <>
        <Modal>
            <>
                <img src={proj.image} className="object-cover w-full h-1/2 md:h-3/6 rounded-3xl ml-auto mr-auto"/>
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
            </>
        </Modal>
    </>;
}