import { useState, useContext, createContext } from "react";

import styles from "./QuestionTextInput.module.css";

import Button from "lib/Button";
import { QuestionInfoContext, QuestionLayoutContext } from "./QuestionLayout";
import CardHint from "./CardHint";
import { CardContext } from "lib/card/Card";

export const QuestionTextInputContext = createContext();

export function InputWrapper({ btnClassName, children }) {
  const cardCtx = useContext(CardContext);
  const btn = (
    <Button className={btnClassName} onClick={() => cardCtx.setIsFront(false)}>
      Обратно
    </Button>
  );
  return cardCtx.isFrontInputRemoved ? btn : children;
}

function Input({ rightAnswers, answerValue, setAnswerValue }) {
  const qCtx = useContext(QuestionLayoutContext);
  const infoCtx = useContext(QuestionInfoContext);

  const submitAction = () => {
    const value = answerValue.toLocaleLowerCase().trim();
    if (value) {
      qCtx(rightAnswers.includes(value));
    }
  };

  return (
    <div className={styles["form"]}>
      <InputWrapper>
        <input
          className={styles["input"]}
          placeholder="Введите ответ"
          type="text"
          value={answerValue}
          onChange={(e) => setAnswerValue(e.target.value)}
        />
        <CardHint hint={infoCtx.hint} />
        <Button onClick={submitAction}>Отправить</Button>
      </InputWrapper>
    </div>
  );
}

function QuestionTextInput({ children, rightAnswers }) {
  const [answerValue, setAnswerValue] = useState("");

  return (
    <div className={styles["content-wrapper"]}>
      <QuestionTextInputContext.Provider
        value={{ answerValue, setAnswerValue }}
      >
        {children}
        <Input
          rightAnswers={rightAnswers}
          answerValue={answerValue}
          setAnswerValue={setAnswerValue}
        />
      </QuestionTextInputContext.Provider>
    </div>
  );
}

export default QuestionTextInput;
