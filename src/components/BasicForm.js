import { useState } from "react";
import useInput from "../hooks/useInput";
import Modal from "./Modal";

const BasicForm = (props) => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
    inputClasses: firstNameClasses,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
    inputClasses: lastNameClasses,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
    inputClasses: emailClasses,
  } = useInput((value) => value.includes("@"));

  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  let formIsValid = false;

  // if all the input fields are correct
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const http = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://react-5826f-default-rtdb.firebaseio.com/user-forms.json",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const response_data = await response.json();
      console.log(response_data.name);
    } catch (err) {
      setIsModalShow(true);
      console.log(err.message);
      console.log("Cought Error");
    }

    setIsLoading(false);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("Submitted");
    console.log(firstName, lastName, email);

    const user = {
      firstName,
      lastName,
      email,
    };

    http(user);

    // reset to default {clear fields, make unTouch}
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const modalHandler = () => {
    setIsModalShow((prev) => !prev);
  };

  const modal = isModalShow && (
    <Modal onClose={modalHandler}>
      <p>Something went wrong</p>
      <button onClick={modalHandler}>Ok</button>
    </Modal>
  );

  return (
    <form onSubmit={formSubmitHandler}>
      {modal}
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">First Name must not empty.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            value={lastName}
            type="text"
            id="name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name must not empty.</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
        />
        {emailHasError && <p className="error-text">E-mail is not correct.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
