import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.content}>
      <h1>Welcome to Todos and Tasks Home Page</h1>

      <p>
        You can navigate to either one of Todos or Tasks page to add a todo or
        task.
      </p>

      <div className={styles.links}>
        <Link to="todos">
          <button className={styles.button}> Todos Page</button>
        </Link>
        <Link to="tasks">
          <button className={styles.button}>Tasks Page</button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
