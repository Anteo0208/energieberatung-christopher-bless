import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "*",
          "GPTBot",
          "OAI-SearchBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Amazonbot",
          "anthropic-ai",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/portal/",
          "/login/",
          "/erfassungsbogen/",
        ],
      },
    ],
    sitemap: "https://www.planungsbuero-bless.de/sitemap.xml",
  };
}
