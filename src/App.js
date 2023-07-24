import { Fragment } from "react";
import "./App.scss";
import { Input } from "./ui/input";
import { LayoutPage } from "./layout";
import { Checkbox } from "./ui/checkbox";
import { SeparatorField } from "./ui/separator";
import { CheckGrup } from "./ui/checkbox-grop";
import { LayoutQuestionnaire } from "./layout/layout-questionnaire";
import { FormSteps } from "./wigets/multisteps-form";
import { Dadata } from "./wigets/dadata";
import { Attach } from "./ui/attach";

const html = `
<div class="b-fields-head">
    <div class="fields-head__title">
        1.1 Название ПО*
    </div>
    <div class="fields-head__description">
        текущее название ПО без номеров версий продукта
    </div>
</div>
`;

const htmlSeparator = `<h2>Separator</h2>`;

const checkLabel =
  "силами сторонней организации (указать наименование, ОГРН, сведения о цепочке бенефициаров, приложить документ-основание, количество)";

// checkbox-group
const arrayCheck = [
  {
    block: true,
    label: "Да",
    offset: "xs",
  },
  {
    block: true,
    label: "Нет",
    offset: "xs",
  },
  {
    block: true,
    label: "Не знаю",
    offset: "xs",
  },
];
// checkbox-group
function App() {
  return (
    // <Fragment>
    //   <LayoutPage>
    //     <Input htmlTitle={html} block type="text" />
    //     <SeparatorField htmlChild={htmlSeparator} block />
    //     <Checkbox block={true} label={checkLabel} />
    //     <SeparatorField htmlChild={htmlSeparator} block />
    //     <CheckGrup
    //       direction="gorizontal"
    //       htmlTitle={`<div class="b-group-title">А) Гарантийное обслуживание ПО осуществляется:</div>`}
    //       arrayCheckboxes={arrayCheck}
    //     />
    //   </LayoutPage>
    // </Fragment>

    <LayoutQuestionnaire>
      {/* <Input htmlTitle={html} block type="text" />
      <SeparatorField htmlChild={htmlSeparator} block />
      <Checkbox block={true} label={checkLabel} />
      <SeparatorField htmlChild={htmlSeparator} block />
      <CheckGrup
        direction="gorizontal"
        htmlTitle={`<div class="b-group-title">А) Гарантийное обслуживание ПО осуществляется:</div>`}
        arrayCheckboxes={arrayCheck}
      /> */}
      <FormSteps />
      <Dadata block />

      <Attach multiple buttonContent="Загрузить реквизиты" />
    </LayoutQuestionnaire>
  );
}

export default App;
