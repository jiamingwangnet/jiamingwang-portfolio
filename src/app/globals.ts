export const ORIGINAL_RATE = 50;
export let SNAKE_RATE = [ORIGINAL_RATE];
export const NEW_RATE = 250;

export function SetRate(rate:number)
{
    SNAKE_RATE[0] = rate;
}