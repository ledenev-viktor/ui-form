import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../../ui/input";
import _ from "lodash";
import { getDadata } from "./services/services";
import cn from "classnames";
import cls from "./style.module.scss";
import { Suggestions } from "./ui/suggestions";
import { useFocus } from "../../hooks/useFocus";
import mergeRefs from "react-merge-refs";

export const Dadata = ({
  block,
  addressRef,
  innRef,
  idInn,
  idAddress,
  setFormValue,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState({});

  const SuggestionsRef = useRef(null);

  const onChangeInputData = (event) => {
    setValue(event.target.value);
    debounced(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useCallback(
    _.debounce((str) => getDadata(str, setData), 500),
    []
  );

  const inputDadataRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [focusedInputDadata] = useFocus(inputDadataRef, "mouse");

  const [inn, setInn] = useState("");

  const findInn = (data, id) => {
    const [elem] = data?.suggestions.filter(({ data: { hid } }) => id === hid);
    setInn(elem.data.inn);
    setValue(elem.value);
  };

  const onClick = useCallback(
    (id) => {
      findInn(data, id);
      setVisible(false);
    },
    [data]
  );

  useEffect(() => {
    if (focusedInputDadata) setVisible(focusedInputDadata);
  }, [focusedInputDadata]);

  useEffect(() => {
    if (!value) setInn("");
  }, [value]);

  const dadataContainer = useRef(null);
  useEffect(() => {
    window.addEventListener("click", function (event) {
      if (!dadataContainer.current?.contains(event.target)) setVisible(false);
      return () => window.removeEventListener("click");
    });
  }, []);

  const handleChangeInn = (event) => {
    setInn(event.target.value);
  };

  useEffect(() => {
    if (setFormValue) {
      setFormValue(idAddress, value);
      setFormValue(idInn, inn);
    }
  }, [value, inn]);

  return (
    <div ref={dadataContainer} className={cn(cls.dadata, {})}>
      <div className={cn(cls.dadataInput)}>
        <Input
          id={idAddress}
          name={idAddress}
          placeholder="Полное фирменное название юр. лица"
          ref={mergeRefs([inputDadataRef, addressRef])}
          block={block}
          offset={"null"}
          value={value}
          onChange={onChangeInputData}
        />
        {visible && (
          <Suggestions
            ref={SuggestionsRef}
            handleClick={onClick}
            data={data}
            inputProperty={{
              value,
            }}
          />
        )}
      </div>
      <Input
        id={idInn}
        block={block}
        placeholder="ИНН"
        onChange={handleChangeInn}
        value={inn}
        ref={innRef}
        name={idInn}
      />
    </div>
  );
};
