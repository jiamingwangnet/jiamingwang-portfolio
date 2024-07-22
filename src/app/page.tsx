import dynamic from "next/dynamic";
import "./globals.css";
import {TitleFont} from "@/app/fonts";
import GlitchTyper from "@/components/GlitchTyper/GlitchTyper";

export default function Home() {
    return (
      <>
          <header className="w-10/12 m-2 absolute bottom-5 trContent">
              <h1 className={`overflow-hidden lg:text-7xl md:text-6xl sm:text-6xl text-5xl font-thin m-3 ${TitleFont.className} fly-in-l-r`}>
              <GlitchTyper startDelay={100} typeDelay={35} switchDelay={10}>Jiaming Wang</GlitchTyper>
            </h1>
              <p className={`overflow-hidden lg:text-xl md:text-lg sm:text-sm text-xs m-3 font-extralight ${TitleFont.className} fly-in-r-l`}>
                  <GlitchTyper startDelay={80} typeDelay={20} switchDelay={10}>Student developer in Australia.</GlitchTyper>
              </p>
          </header>
      </>
    );
}
