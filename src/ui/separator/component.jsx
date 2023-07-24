import cn from "classnames";
import cls from "./style.module.scss";

export const SeparatorField = ({ htmlChild, block }) => {
  const html = { __html: htmlChild };

  return (
    <div
      className={cn(cls.separator, {
        [cls.block]: block,
      })}
    >
      {htmlChild && <div dangerouslySetInnerHTML={html} />}
    </div>
  );
};
