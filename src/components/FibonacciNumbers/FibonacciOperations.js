import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  maxFiboNumber,
  lastFiboNumberBefore,
  firstFiboNumberAfter,
} from "../../logic/Fibonacci";
import { FibonacciOperationsHelper } from "./FibonacciOperationsHelper";
import { useTranslation } from "react-i18next";
import { FibonacciNumbersContext } from "../../contexts/FibonacciNumbersContext";

export const FibonacciOperations = () => {
  const { i18n } = useTranslation();
  const { number, setNumber, inputRef, generateRandom, numberValuesOn, setNumberValuesOn } = useContext(
    FibonacciNumbersContext
  );
  const [incDecFactor, setIncDecFactor] = useState("1");
  const [helperOn, setHelperOn] = useState(false);

  const byFibo = useCallback(() => incDecFactor === "Fibo", [incDecFactor]);

  useEffect(() => {
    console.log(
      `FibonacciOperations: Increment/Decrement was set to "by ${incDecFactor}"`
    );
  }, [incDecFactor]);

  const incDecFactorNumber = useCallback(
    () => parseInt(incDecFactor.replace(/[,.]/g, "")),
    [incDecFactor]
  );

  const increment = useCallback(() => {
    if (!byFibo()) {
      console.log(
        `FibonacciOperations: increment ${number} by ${incDecFactorNumber()} was called`
      );
      setNumber(number + incDecFactorNumber());
    } else if (number <= maxFiboNumber) {
      const value = firstFiboNumberAfter(number);
      console.log(`FibonacciOperations: next fibo value is ${value}`);
      setNumber(value);
    }
  }, [number, byFibo, incDecFactorNumber, setNumber]);

  const decrement = useCallback(() => {
    if (!byFibo()) {
      console.log(
        `FibonacciOperations: decrementing ${number} by ${incDecFactorNumber()} was called`
      );
      const n = number - incDecFactorNumber();
      setNumber(n > 0 ? n : 0);
    } else if (number > 0) {
      const value = lastFiboNumberBefore(number);
      console.log(`FibonacciOperations: previous fibo value is ${value}`);
      setNumber(value);
    }
  }, [number, byFibo, incDecFactorNumber, setNumber]);

  const toogleIncDecOperation = useCallback(() => {
    const incDecFactors = ["1", "10", "100", "1,000", "10,000", "Fibo"].map(
      (i) => (i18n.language === "pt" ? i.replace(/,/g, ".") : i)
    );
    const index = incDecFactors.indexOf(incDecFactor);
    setIncDecFactor(
      index === incDecFactors.length - 1
        ? incDecFactors[0]
        : incDecFactors[index + 1]
    );
  }, [incDecFactor, i18n.language]);

  useEffect(() => {
    /* Code temporarily disabled: */
    if (false) {
      const handleKeyDown = (e) => {
        switch (e.key.toLowerCase()) {
          case "r":
            generateRandom(inputRef);
            break;
          case "i":
            increment();
            break;
          case "d":
            decrement();
            break;
          case "t":
            toogleIncDecOperation();
            break;
          default:
            break;
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [decrement, increment, toogleIncDecOperation, generateRandom, inputRef]);

  return (
    <>
      <div className="Fibonacci-operations">
        <button
          onClick={increment}
          disabled={number < 0 || number >= maxFiboNumber}
        >
          +
        </button>
        <button onClick={decrement} disabled={number <= 0}>
          -
        </button>
        <button onClick={toogleIncDecOperation}>{incDecFactor}</button>
        <button onClick={() => setHelperOn(!helperOn)}>{`Helper ${
          helperOn ? "Off" : "On"
        }`}</button>
        <button onClick={() => setNumberValuesOn(!numberValuesOn)}>{`Values ${
          numberValuesOn ? "Off" : "On"
        }`}</button>
      </div>
      {helperOn && (
        <FibonacciOperationsHelper
          byFibo={byFibo}
          incDecFactor={incDecFactor}
        />
      )}
    </>
  );
};
