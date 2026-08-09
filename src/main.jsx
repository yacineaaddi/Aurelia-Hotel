import { ErrorBoundary } from "react-error-boundary";
import ReactDOM from "react-dom/client";
import React from "react";

import ErrorFallback from "./ui/ErrorFallback.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
