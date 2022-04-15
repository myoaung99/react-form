import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameRef = useRef("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouch, setEnteredNameTouch] = useState(false);
  const [enteredName, setEnteredName] = useState("");

  const enterNameIsInvalid = enteredNameTouch && !enteredNameIsValid;

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouch(true);

    if (nameRef.current.value.trim() === "") {
      console.log("empty input");
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);
    console.log(nameRef.current.value);

    setEnteredName("");
    nameRef.current.value = "";
  };

  const nameInputClasses = enterNameIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameRef}
          type="text"
          id="name"
          onChange={nameChangeHandler}
        />
        {enterNameIsInvalid && <p className="error-text">Invalid Input</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
