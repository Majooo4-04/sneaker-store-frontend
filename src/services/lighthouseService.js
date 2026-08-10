// ─── Servicio de estadísticas Lighthouse (PageSpeed Insights API) ─────────
// Documentación: https://developers.google.com/speed/docs/insights/v5/get-started

// URL de tu sitio a analizar. Cámbiala si tu dominio cambia.
const SITE_URL = "https://frontend-pi.vercel.app";

// Si más adelante sacas una API key de Google Cloud, pégala aquí.
// Sin key, la API funciona igual pero con una cuota diaria más baja.
const API_KEY = "AIzaSyD9ArMyuqqkFPn16yHD6WP6K8LuxHxFysc"; // ej: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

const BASE_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

/**
 * Corre un análisis de Lighthouse (vía PageSpeed Insights) para una URL y
 * dispositivo dados, y devuelve los datos en el mismo formato que usa
 * el componente LighthouseStats.
 *
 * @param {"mobile"|"desktop"} strategy
 * @param {string} url - URL a analizar (por defecto, tu sitio)
 */
export async function obtenerEstadisticasLighthouse(strategy = "mobile", url = SITE_URL) {
  const params = new URLSearchParams();
  params.set("url", url);
  params.set("strategy", strategy);
  CATEGORIES.forEach((cat) => params.append("category", cat));
  if (API_KEY) params.set("key", API_KEY);

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const mensaje = errorBody?.error?.message || `Error ${response.status} al consultar PageSpeed Insights`;
    throw new Error(mensaje);
  }

  const json = await response.json();
  const lr = json.lighthouseResult;

  if (!lr) {
    throw new Error("La respuesta de la API no incluyó resultados de Lighthouse");
  }

  const scoreDe = (categoria) => {
    const raw = lr.categories?.[categoria]?.score;
    return raw == null ? null : Math.round(raw * 100);
  };

  const valorAudit = (id) => lr.audits?.[id]?.displayValue ?? "—";

  return {
    performance: scoreDe("performance"),
    accessibility: scoreDe("accessibility"),
    bestPractices: scoreDe("best-practices"),
    seo: scoreDe("seo"),
    metrics: {
      lcp: valorAudit("largest-contentful-paint"),
      cls: valorAudit("cumulative-layout-shift"),
      tbt: valorAudit("total-blocking-time"),
      fcp: valorAudit("first-contentful-paint"),
    },
    fetchedAt: new Date().toLocaleString("es-MX"),
  };
}
