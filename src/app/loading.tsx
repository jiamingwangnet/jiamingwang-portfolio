import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import "./globals.css"

export default function Loading()
{
    return (
        <>
            <div className="h-5/6 flex justify-center items-center">
                <Image 
                    priority
                    src={Logo}
                    alt={"Logo"}
                    className="m-3 infinite-spin"
                    width={100}
                    height={100}
                />
            </div>
        </>
    )
}