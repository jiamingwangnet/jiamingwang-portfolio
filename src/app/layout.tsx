import type { Metadata } from "next";
import "./palette.css";
import "./globals.css";
import Snake from "@/components/Snake/Snake";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Jiaming Wang",
  description: "Jiaming's Website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
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
