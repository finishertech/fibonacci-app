import React, { useContext, useEffect } from "react";
import { Context } from "./index";
import { Item } from "./Item";

export function List() {
  const { state } = useContext(Context);
  const designingMode = { on: false, totalItems: 5 };

  /* For debugging purposes:
  useEffect(() => {
    console.log("List state changed!");
  }, [state]);
  */

  return designingMode.on ? (
    <div className="list">
      {[...Array(designingMode.totalItems)].map((_, i) => (
        <Item key={i} text={`This is text ${i}`} />
      ))}
    </div>
  ) : (
    state.map((item, id) => <Item key={id} id={id} text={item} />)
  );
}
