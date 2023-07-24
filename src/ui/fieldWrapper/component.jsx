import cn from "classnames";
import cls from "./style.module.scss";

export const FieldWrapper = ({
  offset = "m",
  children,
  htmlTitle,
  block = false,
  errorMessage,
  className,
  fieldClassName,
  labelClassName,
  disabled,
  readOnly,
  focused,
  filled,
  error,
}) => {
  const html = { __html: htmlTitle };
  return (
    <div
      className={cn(cls.fieldWrapper, cls[offset], {
        [cls.block]: block,
      })}
    >
      {htmlTitle && (
        <div className={cn(cls.htmlTitle)} dangerouslySetInnerHTML={html} />
      )}
      <div className={cls.field}>{children}</div>
      {errorMessage && <div className={cls.errorMessage}>{errorMessage}</div>}
    </div>
  );
};
