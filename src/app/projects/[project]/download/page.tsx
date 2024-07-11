import Heading from "@/components/Heading/Heading";
import Downloads from "./_download-data/downloads.json";
import IDownload from "./_download-data/interface";
import ProjectData from "@/app/projects/_data/projects.json";
import Project from "@/app/projects/_data/interface";
import { notFound } from "next/navigation";

type Props = {
    params: {
        project: string;
    }
}

// static website
export async function generateStaticParams()
{
    return ProjectData.projects.map((p:Project) => {
        return {
            project: p.url
        }
    })
}

export default function Download({params}:Props)
{
    // if(ProjectData.projects.find((proj:Project) => {
    //     return proj.url === params.project;
    // }) === undefined) notFound();

    return (
        <>
            <div className="lg:w-2/3 md:w-10/12 w-full ml-auto mr-auto">
                <Heading>{`Downloads for ${
                    ProjectData.projects.find((proj:Project) => {
                        return proj.url === params.project;
                    })?.name
                }`}</Heading>
                <ul>
                    {
                        Downloads.downloads.find((dl:IDownload) => {
                            return dl.url === params.project;
                        })?.downloads.map(dltype => {
                            return <li key={dltype.type}>{dltype.type}: <a className="m-4 text-lg text-highlight-2 underline underline-offset-4" 
                            href={dltype.download} target="_blank" rel="noopener noreferrer">{dltype.name}</a></li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}