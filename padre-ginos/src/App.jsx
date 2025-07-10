import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { Providers } from "./Providers";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <RouterProvider router={router} />
        </Providers>
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");

const root = createRoot(container);

root.render(<App />);
