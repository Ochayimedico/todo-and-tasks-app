import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../utils/supabase";
import Card from "../UI/Card";
import AuthButton from "../UI/AuthButton";
import styles from "./Register.module.css";
import LoadingState from "../States/LoadingState";
import CreationSuccess from "../States/CreationSuccess";
import { useNavigate } from "react-router-dom";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../utils/validation";
import { linksVariants } from "../../utils/animationVariants";

const Register = () => {
  const navigate = useNavigate();
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
    try {
      let { data, error } = await supabase.auth.signUp({
        email: emailInput,
        password: passwordInput,
        options: {
          data: {
            username: usernameInput,
          },
        },
      });
      if (data) {
        setIsLoading(false);

        navigate("/confirmation-page");

        // Now insert a record into your custom 'users' table
        //   await supabase.from("users").upsert([
        //     {
        //       username: usernameInput,
        //       email: emailInput,
        //       password: passwordInput,

        //     },
        //   ]);
      } else if (error) {
        console.log("Account could not be created, try again.");
      }
    } catch (error) {
      console.log(error);
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
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [isUserDataSent]);
  return (
    <motion.div
      variants={linksVariants}
      initial="hidden"
      animate="visible"
      className={styles.width}
    >
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
            <p className={styles.error}>{usernameError}</p>
          </div>
          <div className={styles.control}>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              onChange={emailChangeHandler}
            />
            <p className={styles.error}>{emailError}</p>
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              ref={passwordRef}
              onChange={passwordChangeHandler}
            />
            <p className={styles.error}>{passwordError}</p>
          </div>

          <div>
            <AuthButton onAddHandler={registerHandler}>Register</AuthButton>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default Register;
