import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Navbar from "./Navbar";
import styles from "./RootLayout.module.css";
import { motion } from "framer-motion";

function RootLayout() {
  const [userMetadata, setUserMetadata] = useState(null);
  useEffect(() => {
    const fetchMetadata = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let { username } = user.user_metadata;
      setUserMetadata(username);
      console.log(username);
    };
    fetchMetadata();
  }, []);

  return (
    <>
      <Navbar metadata={userMetadata} />
      <motion.main className={styles.main}>
        <Outlet metadata={userMetadata} />
      </motion.main>
    </>
  );
}

export default RootLayout;
