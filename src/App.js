import "./assets/scss/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const isLoggedIn = false;

const PrivateRoute = () => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/landing" />;
};

const AuthRoute = () => {
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Home />,
          },
        ],
      },

      {
        path: "",
        element: <AuthRoute />,
        children: [
          {
            path: "landing",
            element: <LandingPage />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
