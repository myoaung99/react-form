import { useState, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouch, setEnteredNameTouch] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouch, setEnterEmailTouch] = useState(false);

  // component mount တာနဲ့ validate တန်းလုပ်တော့ isValid က error တန်းထွက်တယ်
  const enteredNameIsValid = enteredName.trim() !== "";
  // ဒါမဲ့ user က input field ကို touch လုပ်မထားရသေး(စ ဝင်ဝင်ချင်မို့)လို့ isInvalid က false နေတာ
  const enteredNameIsInvalid = enteredNameTouch && !enteredNameIsValid;

  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInvalid = enteredEmailTouch && !enteredEmailIsValid;

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouch(true);
  };

  const emailInputBlurHandler = (event) => {
    setEnterEmailTouch(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouch(true);

    if (enteredName.trim() === "") {
      return;
    }

    setEnteredName(" ");
    setEnteredNameTouch(false);

    setEnteredEmail(" ");
    setEnterEmailTouch(false);
  };

  const nameInputClasses = enteredNameIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredName}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {enteredNameIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          value={enteredEmail}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Email is incorrect.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
