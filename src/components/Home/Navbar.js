import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.content}>
        <div className={styles["home-and-links"]}>
          <NavLink to="/">
            <h3>Todos & Tasks App</h3>
          </NavLink>

          <div className={styles.links}>
            <li>
              <NavLink
                to="/todos"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Tasks
              </NavLink>
            </li>
          </div>
        </div>
        <div className={styles.auth}>
          <li>
            <NavLink
              to="/login"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Login
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Logout
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/create-account"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Create Account
            </NavLink>
          </li>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
