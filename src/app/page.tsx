import "./globals.css";
import {TextFont, TitleFont} from "@/app/fonts";

export default function Home() {
    return (
      <>
          <header className="md:w-10/12 w-3/4 m-2 absolute bottom-5 trContent">
              <h1 className={`lg:text-7xl md:text-6xl sm:text-6xl text-5xl font-thin m-3 ${TitleFont.className} fly-in-l-r`}>Jiaming Wang</h1>
              <p className={`lg:text-xl md:text-lg sm:text-sm text-xs m-3 font-extralight ${TitleFont.className} fly-in-r-l`}>
                  Student developer in Australia.
              </p>
          </header>
      </>
    );
}
