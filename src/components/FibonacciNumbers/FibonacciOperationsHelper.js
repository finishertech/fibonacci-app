import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FibonacciNumbersContext } from "../../contexts/FibonacciNumbersContext";
import TeX from "@matejmazur/react-katex";
import "./FibonacciOperationsHelper.css";

export const FibonacciOperationsHelper = ({ byFibo, incDecFactor }) => {
  const { t } = useTranslation();
  const { result } = useContext(FibonacciNumbersContext);

  const showHelp = () =>
    byFibo()
      ? t("following-fibo")
      : `${t("increasing-decreasing-numbers-by")} ${incDecFactor}`;

  return (
    <div className="Fibonacci-operations-helper">
      {showHelp()}
      {!!result.isFibo && (
        <>
          <br />
          {t("fibonacci-number-found")}
          {/* prettier-ignore */}
          <div className="katex-fibo">
            <TeX block>{String.raw`                                                          
              \begin{aligned}
              f(x)=\begin{cases}
              x & x = 0, 1\\
              f(x -2) + f(x - 1) & x > 1\\
              \dots\\
              ${result.message} & x = ${result.index}
              \end{cases}
              \end{aligned}
            `}</TeX>
          </div>
        </>
      )}
    </div>
  );
};
