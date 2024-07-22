import { TitleFont } from "@/app/fonts";
import "../../app/globals.css";
import GlitchTyper from "../GlitchTyper/GlitchTyper";

export default function LoadScrn({loading}:{loading:boolean}) {
    return (
        <div className="fixed w-screen h-screen loading z-50 top-0 left-0 flex justify-center items-center" 
                style={{animation: loading ? "" : "fadeOut 480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards"}}>
                <div>
                    <h1 className={`md:text-5xl text-4xl font-thin ${TitleFont.className}`}><span className="font-light">J</span>iaming <span className="font-light">W</span>ang</h1>
                    <p className={`font-thin md:text-xl text-sm ${TitleFont.className} text-center m-2`}>Loading...</p>
                </div>
            </div>
    );
}