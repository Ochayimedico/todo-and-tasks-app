import { useRef, useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import Card from "../UI/Card";
import AuthButton from "../UI/Button";
import styles from "./Register.module.css";
import LoadingState from "../States/LoadingState";
import CreationSuccess from "../States/CreationSuccess";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../utils/validation";

const Register = () => {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUserDataSent, setIsUserDataSent] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (evt) => {
    evt.preventDefault();
  };

  const registerHandler = async () => {
    const usernameInput = usernameRef.current.value;
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;

    const usernameError = validateUsername(usernameInput);
    const emailError = validateEmail(emailInput);
    const passwordError = validatePassword(passwordInput);

    if (usernameError || emailError || passwordError) {
      setUsernameError(usernameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    setIsLoading(true);
    let { data, error } = await supabase.auth.signUp({
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    });
    if (data) {
      setIsLoading(false);
      setIsUserDataSent(true);
      console.log("Account successfully created!");
    } else if (error) {
      console.log("Account could not be created, try again.");
    }
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const usernameChangeHandler = () => {
    setUsernameError("");
  };
  const emailChangeHandler = () => {
    setEmailError("");
  };
  const passwordChangeHandler = () => {
    setPasswordError("");
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isUserDataSent) {
        setIsUserDataSent(false);
      }
    }, 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, [isUserDataSent]);
  return (
    <div className={styles.width}>
      {isLoading && <LoadingState />}
      {isUserDataSent && <CreationSuccess />}
      <Card>
        <form onSubmit={submitHandler}>
          <h2 className={styles.title}>Create an Account</h2>
          <div className={styles.control}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              onChange={usernameChangeHandler}
            />
            <span>{usernameError}</span>
          </div>
          <div className={styles.control}>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              onChange={emailChangeHandler}
            />
            <span>{emailError}</span>
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              ref={passwordRef}
              onChange={passwordChangeHandler}
            />
            <span>{passwordError}</span>
          </div>

          <div className={styles.actions}>
            <AuthButton onAddHandler={registerHandler}>Register</AuthButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;