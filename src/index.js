import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./@components/commons/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App></App>
  </QueryClientProvider>
);
