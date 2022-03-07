import React, { useContext } from "react";
import { Context } from "./index";

export function Item({ id, text }) {
  const { readOnly, dispatch } = useContext(Context);
  return (
    /* Remove (or forget) the type of the button bellow and you will create a bug! */
    <div className="item">
      {!readOnly && <button
        type="button"
        onClick={(e) => dispatch({ type: "remove", payload: id })} >
        Delete
      </button>}
      <div>{text}</div>
    </div>
  );
}
