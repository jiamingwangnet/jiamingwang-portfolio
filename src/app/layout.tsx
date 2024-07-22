import type { Metadata, Viewport } from "next";
import "./palette.css";
import "./globals.css";
import Snake from "@/components/Snake/Snake";
import Navbar from "@/components/Navbar/Navbar";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import {TextFont} from "@/app/fonts";

export const metadata: Metadata = {
  title: {
    default: "Jiaming Wang",
    template: "Jiaming Wang | %s"
  },
  authors: [{name:"Jiaming Wang", url:"https://jiamingwang.net"}],
  creator: "Jiaming Wang",
  keywords: ["Jiaming", "Wang", "Jiaming Wang", "Developer", "C++", "C++ developer", "Nextjs developer", "cpp", "SnekOS", "SnakeAI", "WontonEngine", "Lights Out", "jiamingwangnet", "jiamingwang"],
  description: "Hello, I'm Jiaming. I am currently a high school student in Australia aiming for a future career in software engineering.",
  openGraph: {
    title: "Jiaming Wang",
    description: "Hello, I'm Jiaming. I am currently a high school student in Australia aiming for a future career in software engineering.",
    url: "https://jiamingwang.net",
    siteName: "Jiaming Wang",
    images: [
        {
            url:"https://jiamingwang.net/assets/logo.png",
            width: 2000,
            height: 2000,
            alt: "Logo",
        }
    ],
    locale: "en_AU",
    type: "website",
  },
};

export const viewport: Viewport = {
    themeColor: "#3276AE",
    colorScheme: "dark"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <GoogleAnalytics/>
            <body className={`${TextFont.className}`}>
                <div className="holderWrapper">
                    <div className="contentHolder"  
                          style={{boxShadow: "inset 0 0 37px 12px rgba(0,0,0,.7)", backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))"}}>
                        <Navbar/>
                        
                        {children}
                    </div>
                </div>

                <Snake/>
            </body>
        </html>
    );
}
