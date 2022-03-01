import fibonacci, { fiboSeq, maxFiboNumber, lastFiboNumberBefore, firstFiboNumberAfter, fiboSeqInitialLength } from './Fibonacci'

// sample lists of fibonacci numbers
const first10FiboNumbers = [0,1,1,2,3,5,8,13,21,34]

describe('Fibonacci function', () => {
    it('should receive a numeric param', () => {
        const msg = `You must provide a number` 
        expect(fibonacci).toThrow(msg)
        expect(() => fibonacci("a")).toThrow(msg)
    })

    it('should throw an error if the passed param is lower then 0', () => {
       expect(() => fibonacci(-1)).toThrowError()
    })

    it('should return 1 if the passed param was 0 or 1', () => {
        const numbers = [0,1]
        numbers.forEach(n => expect(fibonacci(n)).toBe(n))
    })

    it('should return the correct values for a sample list', () => {
        first10FiboNumbers.forEach((n, i) => expect(fibonacci(i)).toBe(n))
    })
})

describe('fiboSeq array', () => {
    it('should be pre filled with the first 20 fibonacci numbers in sequence', () => {
        expect(fiboSeqInitialLength).toBe(fiboSeq.length)
        first10FiboNumbers.forEach((n, i) => expect(fibonacci(i)).toBe(n))
    })

    it('should countains the maximum number less than Number.MAX_SAFE_INTEGER', () => {
        expect(fiboSeq[fiboSeqInitialLength - 1]).toBeLessThan(Number.MAX_SAFE_INTEGER)
    })
})

describe('lastFiboNumberBefore', () => {
    it('should retreive the last fibonacci number before a specified number', () => {
        const sampleList   = [0, 1, 2, 3, 5, 6, 7, 8, 21, 34, 35]
        const expectedList = [0, 0, 1, 2, 3, 5, 5, 5, 13, 21, 34]
        sampleList.forEach((n, i) => expect(lastFiboNumberBefore(n)).toBe(expectedList[i]))
    })
})

describe('fistFiboNumberAfter', () => {
    it('should retreive the first fibonacci number after a specified number', () => {
        const sampleList   = [0, 1, 3, 5, 6, 7,  8, 20, 21, 30, 34, 50, maxFiboNumber, maxFiboNumber + 1]
        const expectedList = [1, 2, 5, 8, 8, 8, 13, 21, 34, 34, 55, 55, maxFiboNumber, maxFiboNumber]
        sampleList.forEach((n, i) => expect(firstFiboNumberAfter(n)).toBe(expectedList[i]))
    })
})