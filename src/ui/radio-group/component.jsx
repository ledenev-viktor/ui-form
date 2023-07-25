import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useState,
} from "react";
import cls from "./style.module.scss";
import cn from "classnames";

export const RadioSingle = ({
  label,
  onChange,
  name,
  checked,
  disabled,
  ...restProps
}) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event, { checked: event.target.checked, name });
    }
  };

  return (
    <label className={cls.component}>
      <input
        disabled={disabled}
        onChange={handleChange}
        className={cls.radio}
        type="radio"
        checked={checked}
        name={name}
        {...restProps}
      />
      <span className={cn(cls.box)}></span>
      <span className={cn(cls.label)}>{label}</span>
    </label>
  );
};

export const RadioGroup = ({ children, name, disabled, value, onChange }) => {
  const [stateValue, setStateValue] = useState("");

  const isChecked = (childValue) =>
    value !== null && (value || stateValue) === childValue;

  const handleChange = (event, childValue) => {
    setStateValue(childValue);
    if (onChange) {
      onChange(event, { name, value: childValue });
    }
  };

  const renderRadio = (child) => {
    const { value: childValue } = child.props;

    return cloneElement(child, {
      onChange: (event) => handleChange(event, childValue),
      disabled,
      ...child.props,
      checked: isChecked(childValue),
      name,
    });
  };

  return (
    <div>
      {children ? (
        <div>
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return renderRadio(child);
            }

            return null;
          })}
        </div>
      ) : null}
    </div>
  );
};
