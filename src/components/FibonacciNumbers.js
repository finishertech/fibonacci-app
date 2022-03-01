import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Fibonacci.css";
import {
  fiboSeq,
  maxFiboNumber,
  lastFiboNumberBefore,
  firstFiboNumberAfter,
} from "../logic/Fibonacci";
import { randomInt, numberWithCommas } from "../logic/Util";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

const FibonacciNumbers = () => {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState({});
  const [consoleLog, setConsoleLog] = useState(false);
  const [incDecFactor, setIncDecFactor] = useState("1");
  const { t, i18n } = useTranslation();

  const inputRef = useRef(null);

  const numberWithCommasIntl = useCallback(
    (n) => {
      const result = numberWithCommas(n);
      return i18n.language === "pt" ? result.replace(/,/g, ".") : result;
    },
    [i18n.language]
  );

  useEffect(() => {
    if (consoleLog) {
      console.log("Console log was turned on");
      console.log(`fiboSeq.length: ${fiboSeq.length}`);
      console.log(`maxFiboNumber: ${maxFiboNumber}`);
    } else {
      console.log(
        "Console log was turned off. Click the <Turn log on> button to see log messages"
      );
    }
  }, [consoleLog]);

  useEffect(() => {
    consoleLog &&
      console.log(`Increment/Decrement is set to "by ${incDecFactor}"`);
  }, [consoleLog, incDecFactor]);

  useEffect(() => {
    if (number >= 0) {
      if (number <= maxFiboNumber) {
        inputRef.current.value = number;
        const index = fiboSeq.indexOf(number);
        setResult({
          isFibo: index >= 0,
          message: `${numberWithCommasIntl(number)}`,
          number,
          index,
        });
      }
    } else {
      setResult({ isFibo: false, message: "Invalid number!" });
    }
  }, [number, numberWithCommasIntl]);

  const byFibo = useCallback(() => incDecFactor === "Fibo", [incDecFactor]);

  const incDecFactorNumber = useCallback(
    () => parseInt(incDecFactor.replace(/[,.]/g, "")),
    [incDecFactor]
  );

  const increment = useCallback(() => {
    if (!byFibo()) {
      setNumber(number + incDecFactorNumber());
    } else if (number <= maxFiboNumber) {
      setNumber(firstFiboNumberAfter(number));
    }
  }, [number, byFibo, incDecFactorNumber]);

  const decrement = useCallback(() => {
    if (!byFibo()) {
      const n = number - incDecFactorNumber();
      setNumber(n > 0 ? n : 0);
    } else if (number > 0) {
      setNumber(lastFiboNumberBefore(number));
    }
  }, [number, byFibo, incDecFactorNumber]);

  const onChange = (event) => {
    const value = parseInt(event.target.value);
    setNumber(
      !isNaN(value) && value >= 0 && value <= maxFiboNumber ? value : -1
    );
  };

  const generateRandom = useCallback(() => {
    const randomNumber = randomInt();
    consoleLog && console.log(`generating a random number (${randomNumber})`);
    inputRef.current.value = randomNumber;
    setNumber(randomNumber);
  }, [consoleLog]);

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
          generateRandom();
          break;
        case "+":
          increment();
          break;
        case "-":
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
  }, [decrement, generateRandom, increment, toogleIncDecOperation]);

  const FibonacciInput = () => {
    return (
      <div className="Fibonacci-input">
        <input
          placeholder={`${t(
            "write-a-number-between-0-and"
          )} ${numberWithCommasIntl(maxFiboNumber)}`}
          onChange={onChange}
          ref={inputRef}
        ></input>
        <button onClick={generateRandom}>{t("random")}</button>
      </div>
    );
  };

  const FibonacciResult = () => {
    return (
      <div
        className={`Fibonacci-result${
          result.isFibo ? " Fibonacci-number" : ""
        }`}
      >
        {result.message}
      </div>
    );
  };

  const FibonacciOperations = () => {
    return (
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
        {!isMobile && (
          <button onClick={() => setConsoleLog(!consoleLog)}>
            Turn log {consoleLog ? "off" : "on"}
          </button>
        )}
      </div>
    );
  };

  const FibonacciOperationsHelper = () => {
    return (
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
    );
  };

    return (
      <div className="Fibonacci-numbers">
        <FibonacciInput />
        <FibonacciResult />
        <FibonacciOperations />
        <FibonacciOperationsHelper />
      </div>
    );
};

export default FibonacciNumbers;
