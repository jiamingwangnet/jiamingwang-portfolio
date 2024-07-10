import "./globals.css";

const beizer = "cubic-bezier(.26,.84,.4,1.01)";

export const FlyInLR = (delay:string="0ms",duration:string="480ms"):string => {
    return `a-fly-in-l-r ${duration} ${beizer} ${delay} forwards`;
}

export const FlyInRL = (delay:string="0ms",duration:string="480ms"):string => {
    return `a-fly-in-r-l ${duration} ${beizer} ${delay} forwards`;
}

export const FlyOutLR = (delay:string="0ms",duration:string="480ms"):string => {
    return `a-fly-out-l-r ${duration} ${beizer} ${delay} forwards`;
}

export const FlyOutRL = (delay:string="0ms",duration:string="480ms"):string => {
    return `a-fly-out-r-l ${duration} ${beizer} ${delay} forwards`;
}