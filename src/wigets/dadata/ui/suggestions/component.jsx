import { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import { Hint } from "../hint";
import cn from "classnames";
import cls from "./styles.module.scss";

export const Suggestions = forwardRef(
  ({ data, onClick, handleClick, inputProperty: { value } }, ref) => {
    const isLength = (collection) => collection && collection.length > 0;

    return (
      <Fragment>
        {isLength(data.suggestions) && isLength(value) ? (
          <div onClick={onClick} ref={ref} className={cn(cls.suggestions)}>
            <div className={cn(cls.inner)}>
              <Hint text={"Выберите вариант или продолжите ввод"} />
              <div className={cn(cls.list)}>
                {data.suggestions.map(({ value, data: { address, hid } }) => (
                  <div
                    onClick={() => handleClick(hid)}
                    key={hid}
                    className={cn(cls.point)}
                  >
                    <div className={cn(cls.name)}>{value}</div>
                    <div className={cn(cls.address)}>{address.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          isLength(value) && <Hint text={"Неизвестная организация"} />
        )}
      </Fragment>
    );
  }
);
