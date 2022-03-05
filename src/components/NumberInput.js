import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { isMobile } from "react-device-detect";

const NumberInput = forwardRef(
  ({ className, initialValue, setNumber, isInvalid, children, ...rest }, ref) => {
    const [value, setValue] = useState(initialValue);

    useImperativeHandle(ref, () => ({
      setInputText(text, forceKeyPress = false) {
        console.log(`NumberInput: setInputText("${text}, ${forceKeyPress}")`);
        
        inputRef.current.value = text;

        /* on Mobile we will focused on use buttons! */
        if (!isMobile) {
          inputRef.current.focus();
        }

        if (forceKeyPress) {
          /* Dispatch an Enter does not work due security restrictions
          setTimeout(() => {
            document.body.dispatchEvent(
              new KeyboardEvent("keypress", { key: "Enter", which: 13 })
            );
          }, 200);
          */
        }
      },
    }));

    const inputRef = useRef(null);

    useEffect(() => {
      console.log("NumberInput: componentDidMount()")
      return () => {
        console.log('NumberInput: componentWillUnmount()')
      }
    }, [])

    useEffect(() => {
      const intValue = parseInt(value);
      const result = isNaN(intValue) || isInvalid(intValue) ? -1 : intValue;
      console.log(`NumberInput: componentDidUpdate() - Value = "${value}"`);
      setNumber(result);
    }, [value, isInvalid, setNumber]);

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        const value = inputRef.current.value;
        console.log(`NumberInput: handleKeyPress<Enter>. Value = "${value}"`);
        setValue(value);
      }
    };

    return (
      <div className={className}>
        <input
          ref={inputRef}
          onKeyPress={(event) => handleKeyPress(event)}
          {...rest}
        />
        {children}
      </div>
    );
  }
);

export default NumberInput;
