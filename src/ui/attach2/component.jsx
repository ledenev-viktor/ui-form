import cn from "classnames";
import cls from "./style.module.scss";
import { FieldWrapper } from "../fieldWrapper/component";
import { forwardRef, useRef, useState } from "react";
import { AttachIcon } from "./attachIcon";
import mergeRefs from "react-merge-refs";
import { truncateFilename, pluralize } from "./utils";

const MULTIPLE_TEXTS = ["файл", "файла", "файлов"];

export const Attach2 = forwardRef(
  (
    {
      id,
      name,
      fieldWrapperProps = {},
      multiple,
      onChange,
      onClear,
      accept,
      error,
      buttonProps,
      maxFilenameLength,
      defaultValue,
      setFormData,
      buttonContent = "Выберите файл",
      icon = <AttachIcon />,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState("");
    const [files, setFiles] = useState(defaultValue || []);

    const labelRef = useRef(null);
    const buttonRef = useRef(null);

    const handleInputChange = (event) => {
      const filesArray = event.target.files
        ? Array.from(event.target.files)
        : [];

      setFormData(name, event.target.files);

      setValue(event.target.value);

      if (event.target.files) {
        setFiles(filesArray);
      }
    };

    const handleButtonClick = (event) => {
      if (labelRef.current) {
        labelRef.current.click();
      }
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    };

    const statusTextContent =
      files.length === 1 ? (
        truncateFilename(files[0].name, maxFilenameLength)
      ) : (
        <span title={files.map((file) => file.name).join()}>
          {files.length} {pluralize(files.length, ...MULTIPLE_TEXTS)}
        </span>
      );

    const handleClear = () => {
      setFiles([]);
      setFormData(name, null);
    };

    return (
      <FieldWrapper {...fieldWrapperProps}>
        <div
          className={cn(cls.attachButton)}
          onClick={handleButtonClick}
          ref={buttonRef}
        >
          <span className={cn(cls.attachIcon)}>{icon}</span>
          <span className={cn(cls.attachText)}>
            {files && files.length > 0 ? (
              <div>{statusTextContent}</div>
            ) : (
              <div>{buttonContent}</div>
            )}
          </span>
          {files.length > 0 && <span onClick={handleClear}>x</span>}
          {error && <div>{error}</div>}
        </div>
        <label ref={labelRef}>
          <input
            id={id}
            ref={ref}
            name={name}
            tabIndex={-1}
            accept={accept}
            className={cn(cls.input)}
            multiple={multiple}
            type="File"
            onChange={handleInputChange}
            value={value}
            {...props}
          />
        </label>
      </FieldWrapper>
    );
  }
);
