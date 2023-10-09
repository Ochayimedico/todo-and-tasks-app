import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthState } from "../../utils/authState";
import { supabase } from "../../utils/supabase";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/animationVariants";
// import { useEffect, useState } from "react";

const Navbar = ({ metadata }) => {
  const { isUserLoggedIn } = useAuthState();
  // const [userMetadata, setUserMetadata] = useState(null);

  const logoutHandler = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log("logout error", error);
    }
  };
  // useEffect(() => {
  //   const fetchUserMetadata = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     let metadata = user.user_metadata;

  //     setUserMetadata(metadata);
  //   };
  //   fetchUserMetadata();
  // }, []);
  return (
    <header className={styles.header}>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={styles.content}
      >
        <div className={styles["home-and-links"]}>
          <NavLink to="/">
            <motion.h3>Todos & Tasks App</motion.h3>
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
          {!isUserLoggedIn && (
            <li className={styles["login-link"]}>
              <NavLink
                to="/login"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
          )}

          {!isUserLoggedIn && (
            <li>
              <NavLink
                to="/register"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Register
              </NavLink>
            </li>
          )}

          {isUserLoggedIn && (
            <div className={styles.username}>Hi, {metadata}</div>
          )}
          {isUserLoggedIn && (
            <li onClick={logoutHandler} className={styles["logout-button"]}>
              Logout
            </li>
          )}
        </div>
      </motion.nav>
    </header>
  );
};
export default Navbar;
