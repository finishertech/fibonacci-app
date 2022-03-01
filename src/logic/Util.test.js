import { numberWithCommas, randomInt } from './Util'
import { fiboSeq, maxFiboNumber } from './Fibonacci'

describe('randomInt function', () => {
    it('can receive no arguments and return a non negative number', () => {
        expect(`${randomInt()}`).toMatch(/[0-9]+/)
    })
    it('should be less than or equal to the last number in fiboSeq', () => {
        const max = maxFiboNumber
        expect(randomInt(max)).toBeLessThanOrEqual(max)
    })
    it('should be greater than a minimum value if it specified', () => {
        const min = 8
        const max = fiboSeq[fiboSeq.length - 2]
        const number = randomInt(min, max)
        expect(number).toBeGreaterThanOrEqual(min)
        expect(number).toBeLessThanOrEqual(max)
    })
})

describe('numberWithCommas', () => {
    const inputNumbers =    [ 0 ,  13 ,  144 ,  1597  ,  10946  ,  121393  ,  1346269   ,  14930352   ,  102334155   ,  1134903170]
    const expectedNumbers = ["0", "13", "144", "1,597", "10,946", "121,393", "1,346,269", "14,930,352", "102,334,155", "1,134,903,170"]
    inputNumbers.forEach((n, i) => expect(numberWithCommas(n)).toBe(expectedNumbers[i]))
})