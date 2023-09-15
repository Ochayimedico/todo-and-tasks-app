import React from "react";
import styles from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={props.onAddHandler}
    >
      {props.children}
    </button>
  );
};

export default Button;
