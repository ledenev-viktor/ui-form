import { useState } from "react";
import { Step } from "./step";
import cls from "./steps.module.scss";
import cn from "classnames";

export const Steps = ({ steps, trigger, reset, errors, onSubmit }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const currentStep = steps
    .map(
      (item, index) => (
        // currentPage == index && (
        <Step
          visible={currentPage === index}
          key={`step${index}`}
          step={steps[index]}
          count={index + 1}
          countLength={steps.length}
        />
      )
      // )
    )
    .filter(Boolean);

  const nextStep = (e) => {
    e.preventDefault();
    const checkFields = steps
      .map((item, index) => {
        if (currentPage == index && item.nameFields) {
          return item.nameFields;
        }
      })
      .filter(Boolean);

    const validStep = (async () => {
      try {
        return await trigger(...checkFields);
      } catch (e) {
        console.error(e);
      }
    })();
    validStep.then((res) => {
      if (!res) return;
      if (currentPage === steps.length - 1) return;
      setCurrentPage((prev) => prev + 1);
    });
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (currentPage === 0) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  const [showResultPage, setShowResultPage] = useState(false);
  const onSubmitForm = (event) => {
    onSubmit(event);

    setShowResultPage(true);
  };

  const onClickResultPageButton = (event) => {
    event.preventDefault();
    reset();
    setShowResultPage(false);
    setCurrentPage(0);
  };

  return (
    <>
      {showResultPage ? (
        <div>
          <div>Спасибо! Данные приняты!</div>
          <button onClick={onClickResultPageButton}>назад</button>
        </div>
      ) : (
        <form className="b-steps" onSubmit={onSubmitForm}>
          <div className="steps__inner">
            <div className={cn(cls.head)}>
              <div className={cls.title}>Заголовок</div>
              <div className={cls.counter}>{`${currentPage + 1} / ${
                steps.length
              }`}</div>
            </div>
            <div className={cn(cls.header)}>
              для подготовки и подачи заявления о включении сведений о
              программном обеспечении (ПО) в Единый реестр российских программ
              для ЭВМ и баз данных (Реестр)
            </div>

            <div className="steps__list">{currentStep}</div>

            <div className={cn(cls.buttons)}>
              {currentPage !== 0 && (
                <button onClick={(e) => prevStep(e)}>Назад</button>
              )}
              {currentPage !== steps.length - 1 && (
                <button onClick={(e) => nextStep(e)}>Далее</button>
              )}
              {/* <button onClick={(e) => handleReset(e)}>Очистить</button> */}

              {currentPage === steps.length - 1 && (
                <button type="submit">Отправить</button>
              )}
            </div>

            <div className={cn(cls.footer)}>
              [1] На основании чего у вас возникло исключительное право: в силу
              создания (собственной разработки) или в силу приобретения (по
              договору отчуждения, при вкладе в уставной капитал и т.п.).
            </div>
          </div>
        </form>
      )}
    </>
  );
};
