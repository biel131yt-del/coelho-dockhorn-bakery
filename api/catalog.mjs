import { neon } from "@neondatabase/serverless";

export default async function handler(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).json({ error: "Método não permitido." });
  }

  try {
    const query = neon(process.env.DATABASE_URL);
    const products = await query`
      SELECT
        slug AS id, name, summary AS short, description AS "desc", badge AS tag,
        image_key AS "imageKey"
      FROM bakery.products
      WHERE published
      ORDER BY position, slug
    `;

    response.setHeader("Cache-Control", "public, max-age=0");
    response.setHeader("Vercel-CDN-Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return response.status(200).json({ products });
  } catch {
    return response.status(503).json({ error: "Catálogo temporariamente indisponível." });
  }
}
