import React, { useEffect, useState } from "react";
import api from "../services/api"; // ajusta la ruta a donde tengas tu archivo axios.js
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setData(res.data);
      } catch (err) {
        setError(
          err.response?.data?.mensaje || "No se pudo cargar el dashboard"
        );
      } finally {
        setCargando(false);
      }
    };

    cargarDashboard();
  }, []);

  if (cargando) {
    return <p className="dashboard-subtitle">Cargando dashboard...</p>;
  }

  if (error) {
    return <p className="dashboard-subtitle">Error: {error}</p>;
  }

  const cards = [
    { title: "Ventas", value: `$${Number(data.cards.ventas).toLocaleString()}`, color: "#FFD600" },
    { title: "Productos", value: data.cards.productos, color: "#111" },
    { title: "Pedidos", value: data.cards.pedidos, color: "#2ECC71" },
    { title: "Usuarios", value: data.cards.usuarios, color: "#3498DB" }
  ];

  const ventasPorMes = data.ventasPorMes || [];

  return (
    <div>
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">Bienvenido al panel administrativo.</p>

      <div className="cards">
        {cards.map((card, index) => (
          <div className="card" key={index} style={{ "--card-color": card.color }}>
            <h3>{card.title}</h3>
            <h2>{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="sales">
          <h2>Ventas del Mes</h2>
          <div className="chart">
            {ventasPorMes.length === 0 ? (
              <p className="chart-empty">Aún no hay ventas registradas.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={ventasPorMes} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" />
                  <XAxis dataKey="mes" tick={{ fill: "#666", fontSize: 11 }} axisLine={{ stroke: "#1E1E1E" }} tickLine={false} />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={{ stroke: "#1E1E1E" }} tickLine={false} />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Ventas"]}
                    contentStyle={{ background: "#111", border: "1px solid #1E1E1E", fontSize: 12 }}
                    labelStyle={{ color: "#F5F5F0" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total_ventas"
                    stroke="#F0E040"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#F0E040" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="top-products">
          <h2>Productos más vendidos</h2>
          {data.masVendidos.length === 0 ? (
            <p className="dashboard-subtitle">Aún no hay ventas registradas.</p>
          ) : (
            data.masVendidos.map((item, index) => (
              <div className="top-item" key={index}>
                <span>{item.producto}</span>
                <strong>{item.ventas} ventas</strong>
              </div>
            ))
          )}
        </div>

        <div className="orders">
          <h2>Últimos pedidos</h2>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimosPedidos.map((p) => (
                <tr key={p.id_pedido}>
                  <td>{p.cliente}</td>
                  <td>{p.producto}</td>
                  <td><span className="status">{p.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stock">
          <h2>Stock Bajo</h2>
          {data.stockBajo.map((item) => (
            <div className="stock-item" key={item.id_producto}>
              <span>{item.nombre}</span>
              <strong>{item.stock}</strong>
            </div>
          ))}
        </div>

        <div className="activity">
          <h2>Actividad Reciente</h2>
          <ul>
            {data.actividadReciente.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}