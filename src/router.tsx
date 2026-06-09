import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      // Server data (sessions, conversations) is invalidated explicitly after
      // mutations; this just avoids refetch storms on every window focus while
      // keeping signed image URLs (6h TTL) reliably fresh.
      queries: { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
