import React, { useRef, useState, useEffect, useCallback } from "react";
import "./Fibonacci.css";
import {
  fiboSeq,
  maxFiboNumber,
  lastFiboNumberBefore,
  firstFiboNumberAfter,
  randomToMaxFiboNumber,
} from "../logic/Fibonacci";
import { numberWithCommasIntl } from "../logic/Util";
import { useTranslation } from "react-i18next";
import NumberInput from "./NumberInput";

const generateRandom = (inputRef) => {
  const random = randomToMaxFiboNumber();
  console.log(`generateRandom: random number (${random}) was generated`);
  inputRef.current?.setInputText("" + random, true);
};

const FibonacciInput = ({ inputRef, t, i18n, number, setNumber }) => {
  return (
    <NumberInput
      ref={inputRef}
      className="Fibonacci-input"
      initialValue={"" + number}
      setNumber={setNumber}
      isInvalid={useCallback(
        (n) => n < 0 || n > maxFiboNumber,
        []
      )}
      placeholder={`${t("write-a-number-between-0-and")} ${numberWithCommasIntl(
        i18n,
        maxFiboNumber
      )}`}
    >
      <button onClick={() => generateRandom(inputRef)}>{t("random")}</button>
    </NumberInput>
  );
};

const FibonacciOperations = ({ t, i18n, number, setNumber, result, inputRef }) => {
  const [incDecFactor, setIncDecFactor] = useState("1");

  const byFibo = useCallback(() => incDecFactor === "Fibo", [incDecFactor]);

  useEffect(() => {
    console.log(`FibonacciOperations: Increment/Decrement was set to "by ${incDecFactor}"`);
  }, [incDecFactor]);

  const incDecFactorNumber = useCallback(
    () => parseInt(incDecFactor.replace(/[,.]/g, "")),
    [incDecFactor]
  );

  const increment = useCallback(() => {
    if (!byFibo()) {
      console.log(`FibonacciOperations: increment ${number} by ${incDecFactorNumber()} was called`);
      setNumber(number + incDecFactorNumber());
    } else if (number <= maxFiboNumber) {
      const value = firstFiboNumberAfter(number);
      console.log(`FibonacciOperations: next fibo value is ${value}`);
      setNumber(value);
    }
  }, [number, byFibo, incDecFactorNumber, setNumber]);

  const decrement = useCallback(() => {
    if (!byFibo()) {
      console.log(`FibonacciOperations: decrementing ${number} by ${incDecFactorNumber()} was called`);
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
  }, [decrement, increment, toogleIncDecOperation, inputRef]);

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
      </div>
      <div className="Fibonacci-operations-helper">
        {!byFibo() ? (
          <>
            {t("increasing-decreasing-numbers-by")} {incDecFactor}
          </>
        ) : (
          <>{t("following-fibo")}</>
        )}
        {!!result.isFibo && (
          <>
            <br />
            Fibonacci({result.index}) = {result.message}
          </>
        )}
      </div>
    </>
  );
};

const FibonacciResult = ({ result }) => {
  return (
    <div
      className={`Fibonacci-result${result.isFibo ? " Fibonacci-number" : ""}`}
    >
      {result.message}
    </div>
  );
};

const FibonacciNumbers = () => {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState({});
  const { t, i18n } = useTranslation();

  const inputRef = useRef(null);

  useEffect(() => {
    console.log(`FibonacciNumbers: useEffect-1`);
    console.log(`FibonacciNumbers: fiboSeq.length: ${fiboSeq.length}`);
    console.log(`FibonacciNumbers: maxFiboNumber: ${maxFiboNumber}`);
  }, []);

  useEffect(() => {
    if (number >= 0) {
      if (number <= maxFiboNumber) {
        inputRef.current?.setInputText("" + number);
        const index = fiboSeq.indexOf(number);
        setResult({
          isFibo: index >= 0,
          message: `${numberWithCommasIntl(i18n, number)}`,
          number,
          index,
        });
      } else {
        setResult({
          isFibo: false,
          message: `Number is above ${maxFiboNumber}!`,
        });
      }
    } else {
      setResult({ isFibo: false, message: "Invalid number!" });
    }
    console.log("FibonacciNumbers: useEffect-2")
  }, [number, i18n]);

  return (
    <div className="Fibonacci-numbers">
      <FibonacciInput
        inputRef={inputRef}
        t={t}
        i18n={i18n}
        number={number}
        setNumber={setNumber}
      />
      <FibonacciResult result={result} />
      <FibonacciOperations
        t={t}
        i18n={i18n}
        number={number}
        setNumber={setNumber}
        result={result}
      />
    </div>
  );
};

export default FibonacciNumbers;
