import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Top } from "./shared/components/top.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/top",
    element: <Top />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
