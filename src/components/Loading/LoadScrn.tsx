import { Manrope } from 'next/font/google';

const manrope = Manrope({
    subsets:['latin'],
})

export default function LoadScrn({loading}:{loading:boolean}) {
    return (
        <div className="fixed w-screen h-screen loading z-50 top-0 left-0 flex justify-center items-center" 
                style={{animation: loading ? "" : "fadeOut 480ms cubic-bezier(.26,.84,.4,1.01) 0ms forwards"}}>
                <div>
                    <h1 className={`md:text-7xl text-4xl font-thin ${manrope.className}`}><span className="font-normal">J</span>iaming <span className="font-normal">W</span>ang</h1>
                    <p className={`font-thin md:text-2xl text-sm ${manrope.className} text-center m-2`}>Loading...</p>
                </div>
            </div>
    );
}