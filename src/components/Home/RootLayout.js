import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./RootLayout.module.css";
function RootLayout() {
  return (
    <>
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
