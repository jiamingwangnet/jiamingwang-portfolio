// import { Manrope } from 'next/font/google';
// import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

export const TitleFont = localFont({
    src: "./_fonts/Impasse/Impasse.otf"
});

export const MenuFont = localFont({
    src: "./_fonts/Project Space Font/Project Space.ttf"
});

export const TextFont = localFont({
    src: [
        {
            path: "./_fonts/Caskaydia Cove/fonts/ttf/CaskaydiaCove-Regular.ttf",
            weight: "400"
        },
        {
            path: "./_fonts/Caskaydia Cove/fonts/ttf/CaskaydiaCove-Light.ttf",
            weight: "300"
        },
        {
            path: "./_fonts/Caskaydia Cove/fonts/ttf/CaskaydiaCove-ExtraLight.ttf",
            weight: "200"
        },
        {
            path: "./_fonts/Caskaydia Cove/fonts/ttf/CaskaydiaCove-Medium.ttf",
            weight: "500"
        },
        {
            path: "./_fonts/Caskaydia Cove/fonts/ttf/CaskaydiaCove-Bold.ttf",
            weight: "700"
        },
        {
            path: "./_fonts/Caskaydia Cove/fonts/ttf/CaskaydiaCove-SemiBold.ttf",
            weight: "600"
        }
    ]
})