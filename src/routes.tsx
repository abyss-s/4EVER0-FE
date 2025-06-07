import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import NaverMap from "./components/NaverMap/NaverMap";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/navermap",
        element: <NaverMap />,
      },
    ],
  },
]);

export default router;
