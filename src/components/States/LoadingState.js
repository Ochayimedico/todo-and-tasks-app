import styles from "./LoadingState.module.css";

const LoadingState = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingState;
