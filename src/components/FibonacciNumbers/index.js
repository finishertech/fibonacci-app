import React, { useEffect, useContext } from "react";
import "../Fibonacci.css";
import { fiboSeq, maxFiboNumber } from "../../logic/Fibonacci";
import { numberWithCommas } from "../../logic/Util";
import { useTranslation } from "react-i18next";
import { FibonacciInput } from "./FibonacciInput";
import { FibonacciOperations } from "./FibonacciOperations";
import { FibonacciResult } from "./FibonacciResult";
import { FibonacciNumbersContext } from "../../contexts/FibonacciNumbersContext";
import NumberValues from "./NumberValues";

const FibonacciNumbers = () => {
  const { i18n } = useTranslation();
  const { number, setResult, inputRef } = useContext(FibonacciNumbersContext);

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
          message: `${numberWithCommas(number, i18n)}`,
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
    console.log("FibonacciNumbers: useEffect-2");
  }, [number, i18n, inputRef, setResult]);

  return (
    <>
      <div className="Fibonacci-numbers">
        <FibonacciInput />
        <FibonacciResult />
        <FibonacciOperations />
      </div>
      <NumberValues />
    </>
  );
};

export default FibonacciNumbers;
