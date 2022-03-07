import React, { useContext } from "react";
import { FibonacciNumbersContext } from "../../contexts/FibonacciNumbersContext";

export const FibonacciResult = () => {
  const { result } = useContext(FibonacciNumbersContext);

  return (
    <div
      className={`Fibonacci-result${result.isFibo ? " Fibonacci-number" : ""}`}
    >
      {result.message}
    </div>
  );
};
