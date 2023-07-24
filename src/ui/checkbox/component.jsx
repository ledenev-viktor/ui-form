import { FieldWrapper } from "../fieldWrapper/component";
import cn from "classnames";
import cls from "./styles.module.scss";
import { Checmark } from "./checkmark";
import { forwardRef, useState } from "react";

export const Checkbox = forwardRef(
  (
    {
      value,
      offset,
      htmlTitle,
      disabled,
      checked,
      focused,
      block,
      label,
      error,
      errorMessage,
      onChange,
      ...restProps
    },
    ref
  ) => {
    return (
      <FieldWrapper
        offset={offset}
        errorMessage={errorMessage}
        htmlTitle={htmlTitle}
      >
        <label
          className={cn(cls.component, {
            [cls.disabled]: disabled,
            [cls.focused]: focused,
            [cls.block]: block,
          })}
        >
          <input
            value={value}
            ref={ref}
            className={cn(cls.input)}
            type="checkbox"
            onChange={onChange}
            defaultChecked={value}
            disabled={disabled}
            {...restProps}
          />
          <span className={cls.box}></span>
          {label && <span className={cn(cls.label)}>{label}</span>}
        </label>
      </FieldWrapper>
    );
  }
);
