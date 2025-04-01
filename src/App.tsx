import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout component wraps all routes
    children: [
      {
        path: "/:categories", // Dynamic route for categories
        element: <MainPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
