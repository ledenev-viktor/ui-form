import cls from "./style.module.scss";
import cn from "classnames";

export const LayoutQuestionnaire = ({ children }) => {
  return (
    <div className={cn(cls.layoutWrapper)}>
      <div className={cn(cls.layoutInner)}>
        <div className={cn(cls.layoutContent)}>{children}</div>
      </div>
    </div>
  );
};
