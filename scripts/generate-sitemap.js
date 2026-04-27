import fs from "fs";
import path from "path";

const BASE_URL = "https://www.intexa.in";

const routes = [
  "/",
  "/about",
  "/services",
  "/spaces",
  "/process",
  "/pricing",
  "/contact",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

const distPath = path.resolve("dist");

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

fs.writeFileSync(path.join(distPath, "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml generated");