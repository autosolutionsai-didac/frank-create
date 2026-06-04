import { createFileRoute, redirect } from "@tanstack/react-router";

import { StudioLayout } from "@/components/studio/StudioLayout";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
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
  const { user } = Route.useRouteContext();
  return <StudioLayout userEmail={user?.email} />;
}
