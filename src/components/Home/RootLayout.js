import { Outlet } from "react-router-dom";
import { UserContext } from "../../utils/userContext";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Navbar from "./Navbar";
import styles from "./RootLayout.module.css";
import { motion } from "framer-motion";

function RootLayout() {
  const [username, setUsername] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const userMetadata = async () => {
    if (isUserLoggedIn) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        let { username } = user.user_metadata;
        if (username) {
          setUsername(username);
        } else {
          setUsername(null);
          return;
        }
      } catch (error) {
        console.error("Error fetching user metadata:", error);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setIsUserLoggedIn(true);
      } else if (event === "SIGNED_OUT") {
        setIsUserLoggedIn(false);
      }
    });
    //Unsubscribe on cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  const ctxValue = { username, userMetadata, isUserLoggedIn };
  return (
    <UserContext.Provider value={ctxValue}>
      <Navbar />
      <motion.main className={styles.main}>
        <Outlet />
      </motion.main>
    </UserContext.Provider>
  );
}

export default RootLayout;
