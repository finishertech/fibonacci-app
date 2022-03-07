import { createContext, useState, useRef } from "react";
import { randomToMaxFiboNumber } from "../logic/Fibonacci";

export const FibonacciNumbersContext = createContext();

export function FibonacciNumbersContextProvider({ children }) {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState({});
  const inputRef = useRef(null);
  const [numberValuesOn, setNumberValuesOn] = useState(false);

  const generateRandom = (inputRef) => {
    const random = randomToMaxFiboNumber();
    console.log(`generateRandom: random number (${random}) was generated`);
    inputRef.current?.setInputText("" + random, true);
  };

  return (
    <FibonacciNumbersContext.Provider
      value={{
        number,
        setNumber,
        result,
        setResult,
        inputRef,
        generateRandom,
        numberValuesOn,
        setNumberValuesOn,
      }}
    >
      {children}
    </FibonacciNumbersContext.Provider>
  );
}
