import cn from "classnames";
import cls from "./style.module.scss";
import { FieldWrapper } from "../fieldWrapper/component";
import { forwardRef, useRef, useState } from "react";
import { AttachIcon } from "./attachIcon";
import { mergeRefs } from "react-merge-refs";
import { truncateFilename, pluralize } from "./utils";

const MULTIPLE_TEXTS = ["файл", "файла", "файлов"];

export const Attach = forwardRef(
  (
    {
      fieldWrapperProps = {},
      multiple,
      onChange,
      onClear,
      accept,
      buttonProps,
      maxFilenameLength,
      defaultValue,
      value,
      buttonContent = "Выберите файл",
      icon = <AttachIcon />,
      ...props
    },
    ref
  ) => {
    const uncontrolled = value === undefined;

    const [files, setFiles] = useState(defaultValue || []);

    const inputRef = useRef(null);
    const labelRef = useRef(null);
    const buttonRef = useRef(null);

    const handleInputChange = (event) => {
      const filesArray = event.target.files
        ? Array.from(event.target.files)
        : [];

      if (onChange) {
        onChange(event, { files: filesArray });
      }

      if (uncontrolled && event.target.files) {
        setFiles(filesArray);
      }

      if (inputRef.current) {
        inputRef.current.value = "";
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

    // const handleClearClick = (ev) => {
    //   if (uncontrolled) {
    //     setFiles([]);
    //   }

    //   if (onClear) {
    //     onClear(ev);
    //   }
    // };

    return (
      <FieldWrapper {...fieldWrapperProps}>
        <button
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
        </button>
        <label ref={labelRef}>
          <input
            {...props}
            multiple={multiple}
            tabIndex={-1}
            accept={accept}
            onChange={handleInputChange}
            ref={mergeRefs([ref, inputRef])}
            type="file"
            className={cn(cls.input)}
          />
        </label>
      </FieldWrapper>
    );
  }
);
