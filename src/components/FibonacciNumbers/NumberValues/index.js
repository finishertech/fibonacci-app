import React, { useContext, useReducer } from "react";
import { FibonacciNumbersContext } from "../../../contexts/FibonacciNumbersContext";
import { Form } from "./Form";
import { List } from "./List";

export const Context = React.createContext();

function reduce(state, action) {
  switch (action.type) {
    case "add": {
      const text = action.payload;
      console.log(`reducer:add called. text=${text}`);
      const result = [...state, text];
      //console.log(result);
      console.log(`reducer:add ended.`);
      return result;
    }
    case "remove": {
      const id = action.payload;
      console.log(`reducer:remove called. id=${id}`);
      const result = [...state];
      result.splice(id, 1);
      //console.log(result);
      console.log(`reducer:delete ended.`);
      return result;
    }
    default:
      console.log("reducer:default called");
      return state;
  }
}

export default function NumberValues() {
  const { result, numberValuesOn } = useContext(FibonacciNumbersContext);

  const [state, dispatch] = useReducer(reduce, []);

  return (
    <Context.Provider value={{ dispatch, state, readOnly: !result.isFibo }}>
      {numberValuesOn && (
        <Form
          className="Fibonacci-number-values"
          onSubmit={(text) => dispatch({ type: "add", payload: text })}
        >
          <List />
        </Form>
      )}
    </Context.Provider>
  );
}
