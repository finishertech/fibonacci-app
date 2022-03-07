import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FibonacciNumbersContext } from "../../contexts/FibonacciNumbersContext";
import { maxFiboNumber } from "../../logic/Fibonacci";
import { numberWithCommas } from "../../logic/Util";
import NumberInput from "../NumberInput";

export const FibonacciInput = () => {
  const { t, i18n } = useTranslation();
  const { inputRef, number, setNumber, generateRandom } = useContext(
    FibonacciNumbersContext
  );

  return (
    <NumberInput
      ref={inputRef}
      className="Fibonacci-input"
      initialValue={"" + number}
      setNumber={setNumber}
      isInvalid={useCallback((n) => n < 0 || n > maxFiboNumber, [])}
      placeholder={`${t("write-a-number-between-0-and")} ${numberWithCommas(
        maxFiboNumber,
        i18n
      )}`}
    >
      <button onClick={() => generateRandom(inputRef)}>{t("random")}</button>
    </NumberInput>
  );
};
