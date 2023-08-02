import { IntlPhoneInput } from "@alfalab/core-components-intl-phone-input";
import React from "react";

export const IntlInputTel = () => {
  const [value, setValue] = React.useState("+7");
  const [selectedCountry, setSelectedCountry] = React.useState("RU");
  const handleChange = React.useCallback(
    (newValue) => {
      setValue(newValue);
    },
    [setValue]
  );
  const handleCountryChange = React.useCallback((countryCode) => {
    setSelectedCountry(countryCode);
  });
  const handleClear = React.useCallback(() => setValue(""));
  return (
    <IntlPhoneInput
      inputProps={{
        clear: true,
        onClear: handleClear,
      }}
      value={value}
      onChange={handleChange}
      block={true}
      label="Номер телефона"
      defaultCountryIso2="RU"
      readOnly={Boolean("readOnly", false)}
      onCountryChange={handleCountryChange}
    />

    //   Код выбранной страны: <strong>{selectedCountry}</strong>
  );
};
