import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frank Create" },
      { name: "description", content: "Frank Create — a simple hello world site." },
      { property: "og:title", content: "Frank Create" },
      { property: "og:description", content: "Frank Create — a simple hello world site." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-5xl font-bold text-foreground">Hello, World!</h1>
    </div>
  );
}
