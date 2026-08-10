import React, { useState, useEffect } from "react";
import { obtenerEstadisticasLighthouse } from "../services/lighthouseService";
import "./../assets/css/LighthouseStats.css";

const CATEGORIES = [
  { key: "performance", label: "Rendimiento" },
  { key: "accessibility", label: "Accesibilidad" },
  { key: "bestPractices", label: "Buenas Prácticas" },
  { key: "seo", label: "SEO" },
];

function scoreColor(score) {
  if (score == null) return "#444";
  if (score >= 90) return "#2ECC71"; // verde
  if (score >= 50) return "#F0E040"; // naranja/amarillo (paleta del sitio)
  return "#E74C3C"; // rojo
}

function ScoreGauge({ score, label }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = score == null ? circumference : circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className="ls-gauge-card">
      <svg width="110" height="110" viewBox="0 0 110 110" className="ls-gauge-svg">
        <circle cx="55" cy="55" r={radius} fill="none" stroke="#1E1E1E" strokeWidth="8" />
        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
          className="ls-gauge-progress"
        />
        <text x="55" y="61" textAnchor="middle" className="ls-gauge-number" fill={color}>
          {score == null ? "—" : score}
        </text>
      </svg>
      <span className="ls-gauge-label">{label}</span>
    </div>
  );
}

export default function LighthouseStats() {
  const [device, setDevice] = useState("mobile");
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        const resultado = await obtenerEstadisticasLighthouse(device);
        if (!cancelado) setData(resultado);
      } catch (err) {
        if (!cancelado) setError(err.message || "No se pudo obtener el análisis");
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargar();

    return () => {
      cancelado = true;
    };
  }, [device]);

  return (
    <div>
      <div className="ls-header">
        <div>
          <h1 className="dashboard-title">Estadísticas Lighthouse</h1>
          <p className="dashboard-subtitle">
            Rendimiento y calidad de tu sitio, medidos con Google Lighthouse.
          </p>
        </div>

        <div className="ls-device-toggle">
          <button
            className={device === "mobile" ? "ls-toggle-btn active" : "ls-toggle-btn"}
            onClick={() => setDevice("mobile")}
            disabled={cargando}
          >
            Móvil
          </button>
          <button
            className={device === "desktop" ? "ls-toggle-btn active" : "ls-toggle-btn"}
            onClick={() => setDevice("desktop")}
            disabled={cargando}
          >
            Escritorio
          </button>
        </div>
      </div>

      {cargando && (
        <div className="ls-loading">
          Analizando tu sitio con Lighthouse… esto puede tardar 15–30 segundos.
        </div>
      )}

      {!cargando && error && (
        <div className="ls-error">
          No se pudo obtener el análisis: {error}
        </div>
      )}

      {!cargando && !error && data && (
        <>
          <div className="ls-gauges">
            {CATEGORIES.map((cat) => (
              <ScoreGauge key={cat.key} score={data[cat.key]} label={cat.label} />
            ))}
          </div>

          <div className="ls-vitals">
            <h2>Core Web Vitals</h2>
            <div className="ls-vitals-grid">
              <div className="ls-vital-item">
                <span className="ls-vital-key">LCP</span>
                <strong className="ls-vital-val">{data.metrics.lcp}</strong>
                <span className="ls-vital-desc">Largest Contentful Paint</span>
              </div>
              <div className="ls-vital-item">
                <span className="ls-vital-key">CLS</span>
                <strong className="ls-vital-val">{data.metrics.cls}</strong>
                <span className="ls-vital-desc">Cumulative Layout Shift</span>
              </div>
              <div className="ls-vital-item">
                <span className="ls-vital-key">TBT</span>
                <strong className="ls-vital-val">{data.metrics.tbt}</strong>
                <span className="ls-vital-desc">Total Blocking Time</span>
              </div>
              <div className="ls-vital-item">
                <span className="ls-vital-key">FCP</span>
                <strong className="ls-vital-val">{data.metrics.fcp}</strong>
                <span className="ls-vital-desc">First Contentful Paint</span>
              </div>
            </div>
          </div>

          <p className="ls-footnote">Última medición: {data.fetchedAt}</p>
        </>
      )}
    </div>
  );
}
