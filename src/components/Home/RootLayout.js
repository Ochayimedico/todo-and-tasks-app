import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
