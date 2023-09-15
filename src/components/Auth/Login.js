import { useRef } from "react";
import Card from "../UI/Card";
import AuthButton from "../UI/AuthButton";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (evt) => {
    evt.preventDefault();
  };

  const loginHandler = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
        const user = userCredential.user;
        // ...
        console.log(user);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
      });

    // console.log(email);
    // console.log(password);

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className={styles.width}>
      <Card>
        <form onSubmit={submitHandler}>
          <h2>Login to Your Account</h2>
          <div className={styles.control}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={emailRef} />
          </div>

          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" ref={passwordRef} />
          </div>

          <div className={styles.actions}>
            <AuthButton onAddHandler={loginHandler}>Login</AuthButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
