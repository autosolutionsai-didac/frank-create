import { createFileRoute } from "@tanstack/react-router";

import { StudioLayout } from "@/components/studio/StudioLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frank Body Image Studio" },
      {
        name: "description",
        content: "Frank Body Image Studio — brand-controlled AI image generation and editing.",
      },
      { property: "og:title", content: "Frank Body Image Studio" },
    ],
  }),
  component: Index,
});

function Index() {
  return <StudioLayout />;
}
