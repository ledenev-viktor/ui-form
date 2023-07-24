import cn from "classnames";
import cls from "./styles.module.scss";

export const Hint = ({ text }) => {
  return <div className={cn(cls.hint)}>{text}</div>;
};
