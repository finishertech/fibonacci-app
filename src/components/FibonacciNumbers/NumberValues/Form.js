import React, { useContext } from "react";
import { FibonacciNumbersContext } from "../../../contexts/FibonacciNumbersContext";
import { Context } from "./index";
import { useInputValue } from "./useInputValue";

export function Form({ onSubmit, className, children }) {
  const { result } = useContext(FibonacciNumbersContext)
  const { readOnly } = useContext(Context);
  const { resetValue, ...text } = useInputValue("");

  return (
    <div className={className}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(text.value);
          resetValue();
        }}
      >
        {!readOnly && <input placeholder={`Enter a description for the Fibonacci number "${result.message}"`} {...text} />}
        <div>Here are your Fibonacci numbers values/descriptions:</div>
        {children}
      </form>
    </div>
  );
}
