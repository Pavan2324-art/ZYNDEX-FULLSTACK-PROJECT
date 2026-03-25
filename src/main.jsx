import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes"; // Updated to point to src/app/routes.jsx
import "./styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. Check your index.html.");
}

createRoot(rootElement).render(
  <RouterProvider router={router} />
);