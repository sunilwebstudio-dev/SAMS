import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import App from "./App.jsx";
import "./index.css";
import "./styles/auth.css";
import { Toaster } from "react-hot-toast";
import "./styles/auth-premium.css";
import { AuthProvider } from "./context/AuthContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

  <AuthProvider>

    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#111614",
          color: "#fff",
          border: "1px solid #c69b43",
          borderRadius: "14px",
        },
        success: {
          iconTheme: {
            primary: "#c69b43",
            secondary: "#111614",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff4d4f",
            secondary: "#111614",
          },
        },
      }}
    />

  </AuthProvider>

</BrowserRouter>
  </StrictMode>
);