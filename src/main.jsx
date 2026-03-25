import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes"; // Matches your 'routes.jsx' file in the sidebar
import "./styles/index.css";

// Ensure the 'root' element exists in your index.html
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. Check your index.html.");
}

// Render the application using the Data Router
createRoot(rootElement).render(
  <RouterProvider router={router} />
);