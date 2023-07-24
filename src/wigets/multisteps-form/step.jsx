import cn from "classnames";
import cls from "./step.module.scss";
import { Fragment } from "react";

export const Step = ({ count, countLength, visible, step }) => {
  const fields = step.fields ? step.fields : [];
  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className={cn(cls.step, { [cls.visible]: visible })}>
          <Fragment>{field}</Fragment>
        </div>
      ))}
    </>
  );
};
