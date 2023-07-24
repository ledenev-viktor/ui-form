import cn from "classnames";
import cls from "./style.module.scss";
import { Checkbox } from "../checkbox/component";
import { FieldWrapper } from "../fieldWrapper";

export const CheckGrup = ({
  value,
  onChange,
  arrayCheckboxes,
  direction = "vertical",
  offset = "m",
  children,
  htmlTitle,
  block = false,
  errorMessage,
}) => {
  return (
    <FieldWrapper
      offset={offset}
      children={children}
      htmlTitle={htmlTitle}
      block={block}
      errorMessage={errorMessage}
    >
      <div className={cn(cls.checkboxesList, cls[direction])}>
        {arrayCheckboxes.map(
          ({
            id,
            offset,
            disabled,
            checked,
            focused,
            block,
            label,
            error,
            errorMessage,
            ...restProps
          }) => (
            <Checkbox
              id={id}
              value={value}
              onChange={onChange}
              offset={offset}
              disabled={disabled}
              checked={checked}
              focused={focused}
              block={block}
              label={label}
              error={error}
              errorMessage={errorMessage}
              {...restProps}
            />
          )
        )}
      </div>
    </FieldWrapper>
  );
};
