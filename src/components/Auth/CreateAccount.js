import { useRef, useState } from "react";
import Card from "../UI/Card";
import AuthButton from "../UI/Button";
import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const [isError, setIsError] = useState("");

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const emptyErrorMsg = "Input field cannot be empty!";
  const emailErrorMsg = "Invalid Email Address!";
  const passwordErrorMsg = "Password should be more than 5 characters long!";

  const submitHandler = (evt) => {
    evt.preventDefault();
  };

  const createAccountHandler = () => {
    const usernameInput = usernameRef.current.value;
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;

    console.log(usernameInput, emailInput, passwordInput);

    if (usernameInput.trim() === "") {
      setIsError(emptyErrorMsg);
    } else {
      setIsError("");
    }

    if (!emailInput.includes("@")) {
      setIsError(emailErrorMsg);
    }
    if (passwordInput.length <= 5) {
      setIsError(passwordErrorMsg);
    }
    if (
      usernameInput.trim().length > 0 ||
      emailInput.trim().length > 0 ||
      passwordInput.trim().length > 0
    ) {
      setIsError("");
    }

    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className={styles.width}>
      <Card>
        <form onSubmit={submitHandler}>
          <h2>Create an Account</h2>
          <div className={styles.control}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={usernameRef} />
            <span>{isError}</span>
          </div>
          <div className={styles.control}>
            <label htmlFor="email">Email Address</label>
            <input type="text" id="email" ref={emailRef} />
            <span>{isError}</span>
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" ref={passwordRef} />
            <span>{isError}</span>
          </div>

          <div className={styles.actions}>
            <AuthButton onAddHandler={createAccountHandler}>
              Create Account
            </AuthButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateAccount;
