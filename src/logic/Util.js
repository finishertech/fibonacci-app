import { maxFiboNumber } from "./Fibonacci"

export const randomInt = function(min = 0, max = maxFiboNumber) {
    if (max > maxFiboNumber)
        max = maxFiboNumber
    return min + Math.floor(Math.random() * (max - min + 1))
}

export function numberWithCommas(x) {
    x = typeof x !== String && '' + x
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}