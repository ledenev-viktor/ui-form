import { forwardRef, useCallback, useRef, useState } from "react";
import cls from "./style.module.scss";
import cn from "classnames";
import { FieldWrapper } from "../fieldWrapper";
import { useFocus } from "../../hooks/useFocus";
import mergeRefs from "react-merge-refs";

export const Input = forwardRef(
  (
    {
      id,
      type = "text",
      disabled,
      readOnly,
      classname,
      error,
      succes,
      block,
      value,
      defaultValue,
      htmlTitle,
      placeholder,
      offset = "m",
      onChange,
      onBlur,
      onFocus,
      label,
      ...restProps
    },
    ref
  ) => {
    const uncontrolled = value === undefined;

    const [stateValue, setStateValue] = useState(defaultValue || "");

    const inputRef = useRef(null);
    const [focusVisible] = useFocus(inputRef, "keyboard");

    const filled = Boolean(uncontrolled ? stateValue : value);

    const [focused, setFocused] = useState(restProps.autoFocus);

    const handleBlur = useCallback(
      (event) => {
        setFocused(false);

        if (onBlur) {
          onBlur(event);
        }
      },
      [onBlur]
    );

    const handleInputFocus = useCallback(
      (event) => {
        if (!readOnly) {
          setFocused(true);
        }

        if (onFocus) {
          onFocus(event);
        }
      },
      [onFocus]
    );

    const handleInputChange = useCallback(
      (event) => {
        if (onChange) {
          onChange(event);
        }

        if (uncontrolled) {
          setStateValue(event.target.value);
        }
      },
      [onChange, uncontrolled]
    );

    const handleClear = useCallback((event) => {}, []);

    return (
      <FieldWrapper offset={offset} htmlTitle={htmlTitle}>
        <div className={cn(cls.inputWrapper)}>
          {label && (
            <div
              className={cn(cls.label, {
                [cls.filled]: filled || focused,
              })}
            >
              <span>{label}</span>
            </div>
          )}
          <input
            ref={mergeRefs([ref, inputRef])}
            id={id}
            className={cn(cls.input, {
              [cls.error]: error,
              [cls.succes]: succes,
              [cls.block]: block,
              [cls.focusVisible]: focusVisible,
            })}
            type={type}
            disabled={disabled}
            onBlur={handleBlur}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            value={uncontrolled ? stateValue : value}
            readOnly={readOnly}
            placeholder={placeholder}
            {...restProps}
          />
        </div>
        {error && <div>{error}</div>}
      </FieldWrapper>
    );
  }
);
