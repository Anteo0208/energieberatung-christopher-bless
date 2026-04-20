import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.planungsbuero-bless.de";

  return [
    {
      url: base,
      lastModified: new Date("2026-04-20"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/leistungen`,
      lastModified: new Date("2026-04-20"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/leistungen/heizlastberechnung`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/leistungen/hydraulischer-abgleich`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/leistungen/sanierungsfahrplan`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/leistungen/einzelmassnahmen`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/leistungen/effizienzhaus`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/leistungen/waermeschutznachweis`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/leistungen/lebenszyklusanalyse`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/leistungen/waermebruecken`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/ueber-uns`,
      lastModified: new Date("2026-04-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/kontakt`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
