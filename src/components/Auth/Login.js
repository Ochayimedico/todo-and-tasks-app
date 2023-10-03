import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../utils/supabase";
import { validateEmail, validatePassword } from "../../utils/validation";
import { loadingVariants, linksVariants } from "../../utils/animationVariants";
import Card from "../UI/Card";
import AuthButton from "../UI/AuthButton";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import LoginError from "../States/LoginError";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (evt) => {
    evt.preventDefault();
  };

  const loginHandler = async () => {
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;

    const emailError = validateEmail(emailInput);
    const passwordError = validatePassword(passwordInput);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }
    setIsLoading(true);

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      if (data.user) {
        setIsLoading(false);
        console.log("logged in successfully");
        navigate("/");
      } else if (!data.user) {
        setIsLoading(false);
        navigate("");
        console.log("user not authenticated");
      } else if (error) {
        console.error("Error, could not log in.", error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <motion.div
      variants={linksVariants}
      initial="hidden"
      animate="visible"
      className={styles.width}
    >
      {emailError || passwordError ? <LoginError /> : ""}
      <Card>
        <form onSubmit={submitHandler}>
          <h2 className={styles.title}>Login to Your Account</h2>
          <div className={styles.control}>
            <label htmlFor="email">Email Address</label>
            <input type="text" id="email" ref={emailRef} />
          </div>

          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordRef} />
          </div>

          <div className={styles.actions}>
            <AuthButton onAddHandler={loginHandler}>
              {isLoading ? (
                <motion.span
                  variants={loadingVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.loggingIn}
                >
                  Logging in...
                </motion.span>
              ) : (
                "Login"
              )}
            </AuthButton>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default Login;
