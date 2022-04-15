import { useState } from "react";

const useInput = (validate) => {
  const [enterValue, setEnterValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // component mount တာနဲ့ validate တန်းလုပ်တော့ isValid က error တန်းထွက်တယ်
  const valueIsValid = validate(enterValue);
  // ဒါမဲ့ user က input field ကို touch လုပ်မထားရသေး(စ ဝင်ဝင်ချင်မို့)လို့ isInvalid က false နေတာ
  const hasError = isTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    setEnterValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const resetForm = () => {
    setEnterValue("");
    isTouched(false);
  };

  return {
    value: enterValue,
    hasError,
    valueIsValid,
    valueChangeHandler,
    valueBlurHandler,
    resetForm,
  };
};

export default useInput;
