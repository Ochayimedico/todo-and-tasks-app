import { useRef, useState } from "react";
import { supabase } from "../../utils/supabase";
import Card from "../UI/Card";
import AuthButton from "../UI/AuthButton";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validation";
import LoginError from "../States/LoginError";
// import LoadingState from "../States/LoadingState";

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
        // setIsLoggedIn(true);

        console.log("logged in successfully", data.user);
        console.log(data.session);
        navigate("/");
      }
      if (!data.user) {
        navigate("");
        console.log(supabase.auth.signInWithPassword);

        return console.log("user not authenticated", data.user);
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
    <div className={styles.width}>
      {/* {isLoading && <LoadingState />} */}
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
            <input type="text" id="password" ref={passwordRef} />
          </div>

          <div className={styles.actions}>
            <AuthButton onAddHandler={loginHandler}>
              {isLoading ? "Logging in..." : "Login"}
            </AuthButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
