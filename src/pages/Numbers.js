import React from "react";
import FibonacciNumbers from "../components/FibonacciNumbers";
import FibonacciGraph from "../components/FibonacciGraph";

export default function Numbers() {
  return (
    <>
      {false && <FibonacciGraph />}
      <FibonacciNumbers />
    </>
  );
}
