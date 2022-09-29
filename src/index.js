import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./@components/commons/App";
import CachingClientProvider from "./@components/commons/CachingClientProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <CachingClientProvider>
      <App></App>
    </CachingClientProvider>
  </QueryClientProvider>
);
