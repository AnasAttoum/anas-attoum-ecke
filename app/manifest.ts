import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anas Attoum – Ecke",
    short_name: "Anas Attoum",
    description:
      "Developer dashboard for managing and showcasing projects, skills, and experience, built with Next.js, TypeScript, and Tailwind CSS.",
    start_url: "/",
    display: "standalone",
    background_color: "#a886e4",
    theme_color: "#a886e4",
    icons: [
      {
        src: "/logo-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
