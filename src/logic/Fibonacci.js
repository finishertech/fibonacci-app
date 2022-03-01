// TODO: if we want more than this quantity of elements,
//       it's needed to change the fibonacci function implementation (to use BigDecimal)
export const fiboSeqInitialLength = 79

// An array with the first fibonacci numbers
export let fiboSeq = [...Array(fiboSeqInitialLength).keys()].map(n => fibonacci(n))

// TODO: fix the encapsulation (this variable should not be changed outside this file)
//       the same occurs for the variable fiboSeq declared above
export let maxFiboNumber = fiboSeq[fiboSeq.length - 1]

function searchInFiboSeq(number, lower = true) {
    let low = 0
    let high = fiboSeq.length - 1
    while (low <= high) {
        let middle = Math.floor((low + high) / 2)
        const comparison = lower ? fiboSeq[middle] < number : fiboSeq[middle] <= number
        if (comparison)
            low = middle + 1
        else
            high = middle - 1
    }
    const index = lower ? low - 1 : low
    if (index < 0) return 0
    if (index >= fiboSeq.length) return maxFiboNumber
    return fiboSeq[index]
}

export function lastFiboNumberBefore(number) {
    return searchInFiboSeq(number)
}

export function firstFiboNumberAfter(number) {
    return searchInFiboSeq(number, false)
}

export default function fibonacci(number) {
    if (number === undefined || typeof number !== 'number')
        throw new Error("You must provide a number")
    if (number < 0)
        throw new Error("Fibonacci can't be calculated to a negative number")
    if (number < 2) return number 
    let count = 2
    let low = 0
    let high = 1
    let fibo
    do {
        fibo = low + high
        low = high
        high = fibo
    } while (count++ < number)
    return fibo
}