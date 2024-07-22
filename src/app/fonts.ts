import { Manrope } from 'next/font/google';
import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

export const TitleFont = localFont({
    src: "./_fonts/Impasse/Impasse.otf"
});

export const MenuFont = localFont({
    src: "./_fonts/Project Space Font/Project Space.ttf"
});

export const TextFont = Manrope({
    subsets:['latin'],
});