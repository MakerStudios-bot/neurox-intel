import * as cheerio from 'cheerio';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchHTML(url, timeout = 10000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;
    return await response.text();
  } catch (error) {
    return null;
  }
}

async function scrapeWebsite(website) {
  if (!website) return { precios: [], promociones: [], productosNuevos: [] };

  const html = await fetchHTML(`https://${website}`);
  if (!html) return { precios: [], promociones: [], productosNuevos: [] };

  const $ = cheerio.load(html);

  // Buscar precios (regex de moneda chilena)
  const preciosText = $.html();
  const preciosMatch = preciosText.match(/\$\s*[\d,.]+/g) || [];
  const precios = [...new Set(preciosMatch)].slice(0, 5);

  // Buscar promociones
  const promociones = [];
  $('*').each((i, elem) => {
    const text = $(elem).text().toLowerCase();
    if (text.includes('promoción') || text.includes('oferta') || text.includes('descuento')) {
      const html = $(elem).html();
      if (html && html.length < 200) {
        promociones.push($(elem).text());
      }
    }
  });

  // Buscar productos nuevos (en titulos)
  const productosNuevos = [];
  $('h1, h2, h3, h4').each((i, elem) => {
    const text = $(elem).text().toLowerCase();
    if (text.includes('nuevo') || text.includes('lanzamiento')) {
      productosNuevos.push($(elem).text());
    }
  });

  return {
    precios: precios.slice(0, 5),
    promociones: promociones.slice(0, 3),
    productosNuevos: productosNuevos.slice(0, 3),
  };
}

async function scrapeInstagram(handle) {
  if (!handle) return { ultimaPublicacion: null, fecha: null };

  const igUrl = `https://www.instagram.com/${handle}/`;
  const html = await fetchHTML(igUrl);

  if (!html) return { ultimaPublicacion: null, fecha: null };

  const match = html.match(/"content":\s*"([^"\\]*(\\.[^"\\]*)*)"/);
  if (!match) return { ultimaPublicacion: null, fecha: null };

  return {
    ultimaPublicacion: match[1].substring(0, 200),
    fecha: new Date().toISOString().split('T')[0],
  };
}

async function scrapeGoogleMaps(query) {
  if (!query) return { rating: null, resenas: [] };

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  const html = await fetchHTML(mapsUrl);

  if (!html) return { rating: null, resenas: [] };

  // Google Maps es difícil de scrapear (JS pesado), simplemente notamos que intentamos
  return {
    rating: null,
    resenas: [],
    notaScrapeo: 'Google Maps requiere JS, considera usar Google Places API',
  };
}

export async function scrapeCompetitors(competidores) {
  const datos = [];

  for (const comp of competidores) {
    console.log(`    • ${comp.nombre}`);

    const [website, instagram, maps] = await Promise.all([
      scrapeWebsite(comp.website),
      scrapeInstagram(comp.instagram),
      scrapeGoogleMaps(comp.google_maps_query),
    ]);

    datos.push({
      nombre: comp.nombre,
      fecha: new Date().toISOString(),
      website,
      instagram,
      maps,
    });

    await delay(1000); // Rate limit
  }

  return datos;
}
