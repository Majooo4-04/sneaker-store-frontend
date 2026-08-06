import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import api from "../services/api";

export default function VincularDispositivo() {
  const [qrToken, setQrToken] = useState(null);
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const [generando, setGenerando] = useState(false);

  useEffect(() => {
    if (segundosRestantes <= 0) return;

    const intervalo = setInterval(() => {
      setSegundosRestantes(prev => {
        if (prev <= 1) {
          setQrToken(null);
          clearInterval(intervalo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [segundosRestantes]);

  const generarQR = async () => {
    setGenerando(true);
    try {
      const res = await api.post("/dispositivos/generar-qr");
      setQrToken(res.data.token);
      setSegundosRestantes(res.data.expira_en_segundos);
    } catch (err) {
      console.error("Error generando QR:", err);
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div className="vincular-dispositivo">
      <h3>Vincular smartwatch</h3>
      <p>Escanea o copia este código en la app de tu reloj.</p>

      {qrToken ? (
        <div className="qr-contenedor">
          <QRCodeSVG value={qrToken} size={180} />
          <p className="qr-token-texto">{qrToken}</p>
          <p className="qr-aviso">Expira en {segundosRestantes}s</p>
        </div>
      ) : (
        <button onClick={generarQR} disabled={generando}>
          {generando ? "Generando..." : "Generar código"}
        </button>
      )}
    </div>
  );
}