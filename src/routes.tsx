import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import DesignSystemTest from "./pages/Test/DesignSystemTest";
import NaverMap from "./components/NaverMap/NaverMap";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/design_system",
        element: <DesignSystemTest />,
      },
      {
        path: "/navermap",
        element: <NaverMap />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
