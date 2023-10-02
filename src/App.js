import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo/Todo";
import Tasks from "./components/Tasks/Tasks";
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ErrorPage from "./components/Home/ErrorPage";
import RootLayout from "./components/Home/RootLayout";
import ConfirmationPage from "./components/Home/ConfirmationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "todos",
        element: <Todo />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  { path: "/confirmation-page", element: <ConfirmationPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
