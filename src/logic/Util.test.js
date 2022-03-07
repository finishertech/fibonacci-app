import { numberWithCommas, randomInt, isNumber, isNonNegative } from "./Util";
import { fiboSeq, maxFiboNumber } from "./Fibonacci";

describe("isNumber function", () => {
  it("should return false if no argument is passed", () => {
    expect(isNumber()).toBeFalsy();
  });

  it("should return true if a number is passed", () => {
    expect(isNumber(1)).toBeTruthy();
    expect(isNumber("1")).toBeFalsy();
  });
});

describe("isNonNegative function", () => {
  it("should return false if no argument is passed", () => {
    expect(isNonNegative()).toBeFalsy();
  });

  it("should return true if a number is passed and is not negative", () => {
    expect(isNonNegative("a")).toBeFalsy();
    expect(isNonNegative(-1)).toBeFalsy();
    expect(isNonNegative(0)).toBeTruthy();
    expect(isNonNegative(1)).toBeTruthy();
  });
});

describe("randomInt function", () => {
  it("should thrown an Error if receive no arguments or invalid numbers", () => {
    expect(randomInt).toThrow(Error);
    expect(() => randomInt()).toThrow(Error);
    [-1, "a"].forEach((v) => expect(() => randomInt(v)).toThrow(Error));
  });

  it("should thrown an Error if min is negative or greather than max", () => {
    expect(() => randomInt(1, -1)).toThrowError();
    expect(() => randomInt(1, 2)).toThrowError();
  });

  it("should be less than or equal to the last number in fiboSeq", () => {
    const max = maxFiboNumber;
    expect(randomInt(max)).toBeLessThanOrEqual(max);
  });

  it("should be greater than a minimum value if it specified", () => {
    const min = 8;
    const max = fiboSeq[fiboSeq.length - 2];
    const number = randomInt(max, min);
    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });
});

describe("numberWithCommas", () => {
  /* prettier-ignore */
  const inputNumbers =    [  0,   13,   144,   1597,    10946,    121393,    1346269,     14930352,     102334155,     1134903170 ];
  /* prettier-ignore */
  const expectedNumbers = [ "0", "13", "144", "1,597", "10,946", "121,393", "1,346,269", "14,930,352", "102,334,155", "1,134,903,170" ];
  /* prettier-ignore */
  const expectedPtNumbers = expectedNumbers.map((number) => number.replace(/,/g, "."));

  it("should get each number with commas", () => {
    inputNumbers.forEach((n, i) =>
      expect(numberWithCommas(n)).toBe(expectedNumbers[i])
    );
  });

  it("should get each number with dots if language is pt", () => {
    inputNumbers.forEach((n, i) =>
      expect(numberWithCommas(n, { language: "pt" })).toBe(expectedPtNumbers[i])
    );
  });

  it("should get each number with commas if language is not defined", () => {
    inputNumbers.forEach((n, i) =>
      expect(numberWithCommas(n, {})).toBe(expectedNumbers[i])
    );
  });

  it("should get each number with commas if language is not pt", () => {
    inputNumbers.forEach((n, i) =>
      expect(numberWithCommas(n, { language: "de" })).toBe(expectedNumbers[i])
    );
  });
});
