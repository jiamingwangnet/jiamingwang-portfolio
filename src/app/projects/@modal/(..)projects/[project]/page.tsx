import Modal from "@/components/Modal/Modal";
import { notFound } from "next/navigation";
import Project from "../../../_data/interface";
import ProjectData from "../../../_data/projects.json";
import Heading from "@/components/Heading/Heading";
import { TitleFont } from "@/app/fonts";
import OutboundLink from "@/components/OutboundLink/OutboundLink";
import Typer from "@/components/Typer/Typer";
import { Metadata } from "next";
import RandomGlitchTyper from "@/components/RandomGlitchTyper/RandomGlitchTyper";



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
    };
}

export default function ProjModal({params}:Props)
{
    const proj:(Project | undefined) = ProjectData.projects.find((p:Project) => {return p.url === params.project;}); 

    if(proj === undefined) notFound();

    return <>
        <Modal>
            <>
                <img src={proj.image} className="object-cover w-full h-1/2 md:h-3/6 rounded-3xl ml-auto mr-auto"/>
                <Heading className="pt-4 md:text-5xl" size="4xl">
                    <Typer startDelay={300} typeDelay={50}>{proj.name}</Typer>
                </Heading>
                <table className="m-3">
                    <tbody>
                        <tr>
                            <th className={`text-xl pr-8 ${TitleFont.className} font-bold text-left`}>Date</th>
                            <td className="text-lg break-all"><Typer startDelay={400} typeDelay={10}>{proj.date}</Typer></td>
                        </tr>
                        <tr>
                            <th className={`text-xl pr-8 ${TitleFont.className} font-bold text-left`}>Link</th>
                            <td className="text-lg break-all">
                                <OutboundLink href={proj.link}>
                                    <Typer startDelay={400} typeDelay={10}>{proj.link}</Typer>
                                </OutboundLink>
                            </td>
                        </tr>
                        <tr>
                            <th className={`text-xl pr-8 ${TitleFont.className} font-bold text-left`}>Type</th>
                            <td className="text-lg break-word">
                                <Typer startDelay={400} typeDelay={10}>{proj.type.join(', ')}</Typer>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <RandomGlitchTyper startDelay={90} typeDelay={20} switchDelay={10} amount={7}>
                    {proj.description}
                    </RandomGlitchTyper>
                </p>
            </>
        </Modal>
    </>;
}