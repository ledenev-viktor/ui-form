import cls from "./style.module.scss";
import cn from "classnames";

export const LayoutPage = ({ children }) => {
  return (
    <div className={cls.layout}>
      <header className={cn(cls.header)}>header</header>
      <main className={cn(cls.main)}>{children}</main>
      <footer className={cn(cls.footer)}>footer</footer>
    </div>
  );
};
