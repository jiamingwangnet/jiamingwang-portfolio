import "./globals.css";
import { Manrope } from 'next/font/google';

const manrope = Manrope({
    subsets:['latin'],
})

export default function Home() {
    return (
      <>
          <header className="md:w-2/3 w-3/4 m-2 absolute bottom-5">
              <h1 className={`text-7xl font-thin m-3 ${manrope.className} fly-in-l-r`}>Jiaming Wang</h1>
              <p className={`lg:text-xl text-lg m-3 font-extralight ${manrope.className} fly-in-r-l`}>
                  Student developer in Australia.
              </p>
          </header>
      </>
    );
}
