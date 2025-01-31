import { StrictMode } from "react";
// didnt come imported from vite but seems to be necessary
// import  React  from "react";
// import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
