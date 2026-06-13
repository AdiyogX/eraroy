import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Era Roy - Interactive Developer Portfolio" },
      {
        name: "description",
        content:
          "Era Roy is a Full Stack Developer, AI Automation Expert, Workflow Automation Specialist, and creative engineer building cinematic web, CRM, ERP, and automation experiences.",
      },
      { property: "og:title", content: "Era Roy - Interactive Developer Portfolio" },
      {
        property: "og:description",
        content:
          "A cinematic cartoon-inspired developer portfolio for Era Roy, featuring AI automation, web development, CRM, ERP, and interactive storytelling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@500;700;800;900&family=Poppins:wght@700;800;900&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
