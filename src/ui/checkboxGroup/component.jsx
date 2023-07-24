import { cloneElement, Children, isValidElement, Fragment } from "react";
import { FieldWrapper } from "../fieldWrapper/component";
import cn from "classnames";
import cls from "./style.module.scss";

export const CheckboxGroup = ({
  children,
  direction = "vertical",
  offset = "m",
  htmlTitle,
  block = false,
  errorMessage,
}) => {
  const renderCheckbox = (child) => {
    return cloneElement(child, {
      ...child.props,
    });
  };

  return (
    <FieldWrapper
      offset={offset}
      children={children}
      htmlTitle={htmlTitle}
      block={block}
      errorMessage={errorMessage}
    >
      <div className={cn(cls.checkboxesList, cls[direction])}>
        {children ? (
          <Fragment>
            {Children.map(children, (child) => {
              if (isValidElement(child)) {
                return renderCheckbox(child);
              }

              return null;
            })}
          </Fragment>
        ) : null}
      </div>
    </FieldWrapper>
  );
};
