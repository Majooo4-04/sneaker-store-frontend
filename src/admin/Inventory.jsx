import React, { useEffect, useState } from "react";
import "../assets/css/Inventory.css";
import Modal from "../components/Modal";
import {
    obtenerInventario,
    ajustarStock,
    obtenerHistorialProducto
} from "../services/inventarioService";

export default function Inventory() {

    const [inventario, setInventario] = useState([]);
    const [resumen, setResumen] = useState({ disponibles: 0, bajos: 0, agotados: 0 });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Modal de ajuste de stock
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [tipo, setTipo] = useState("entrada");
    const [cantidad, setCantidad] = useState("");
    const [guardando, setGuardando] = useState(false);

    // Modal de historial
    const [isHistorialOpen, setIsHistorialOpen] = useState(false);
    const [historial, setHistorial] = useState([]);
    const [cargandoHistorial, setCargandoHistorial] = useState(false);

    useEffect(() => {
        cargarInventario();
    }, []);

    const cargarInventario = async () => {
        try {
            setCargando(true);
            const data = await obtenerInventario();
            setInventario(data.inventario);
            setResumen(data.resumen);
        } catch (err) {
            setError(err.response?.data?.mensaje || "Error al cargar inventario");
        } finally {
            setCargando(false);
        }
    };

    // --- AJUSTE DE STOCK ---
    const abrirAjuste = (item) => {
        setProductoSeleccionado(item);
        setTipo("entrada");
        setCantidad("");
        setIsModalOpen(true);
    };

    const guardarAjuste = async () => {
        const cantidadNum = parseInt(cantidad, 10);
        if (!cantidadNum || cantidadNum <= 0) return;

        try {
            setGuardando(true);
            await ajustarStock(productoSeleccionado.id_producto, tipo, cantidadNum);
            setIsModalOpen(false);
            await cargarInventario();
        } catch (err) {
            setError(err.response?.data?.mensaje || "Error al ajustar stock");
        } finally {
            setGuardando(false);
        }
    };

    // --- HISTORIAL ---
    const abrirHistorial = async (item) => {
        setProductoSeleccionado(item);
        setIsHistorialOpen(true);
        setCargandoHistorial(true);
        try {
            const data = await obtenerHistorialProducto(item.id_producto);
            setHistorial(data);
        } catch (err) {
            setError(err.response?.data?.mensaje || "Error al cargar historial");
        } finally {
            setCargandoHistorial(false);
        }
    };

    if (cargando) {
        return <p>Cargando inventario...</p>;
    }

    return (
        <div>
            <h1 className="inventory-title">Inventario</h1>

            {error && <p className="error-message">{error}</p>}

            <div className="inventory-resumen">
                <div className="resumen-card green">
                    <span>Disponibles</span>
                    <strong>{resumen.disponibles}</strong>
                </div>
                <div className="resumen-card orange">
                    <span>Bajos</span>
                    <strong>{resumen.bajos}</strong>
                </div>
                <div className="resumen-card red">
                    <span>Agotados</span>
                    <strong>{resumen.agotados}</strong>
                </div>
            </div>

            <div className="inventory-grid">
                {inventario.map((item) => (
                    <div key={item.id_producto} className="inventory-card">
                        <h3>{item.nombre}</h3>
                        <p className="inventory-brand">{item.marca}</p>
                        <h2>{item.stock}</h2>
                        <span
                            className={
                                item.status === "Disponible"
                                    ? "green"
                                    : item.status === "Bajo"
                                    ? "orange"
                                    : "red"
                            }
                        >
                            {item.status}
                        </span>

                        <div className="inventory-actions">
                            <button
                                className="btn-ajustar-stock"
                                onClick={() => abrirAjuste(item)}
                            >
                                Ajustar stock
                            </button>
                            <button
                                className="btn-ver-historial"
                                onClick={() => abrirHistorial(item)}
                            >
                                Historial
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL AJUSTAR STOCK */}
            <Modal
                open={isModalOpen}
                title={`Ajustar stock: ${productoSeleccionado?.nombre || ""}`}
                onClose={() => setIsModalOpen(false)}
                onSave={guardarAjuste}
                saveText={guardando ? "Guardando..." : "Aplicar"}
            >
                <div className="form-group">
                    <label>Stock actual:</label>
                    <input type="text" value={productoSeleccionado?.stock ?? ""} disabled />
                </div>

                <div className="form-group">
                    <label>Tipo de movimiento:</label>
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="entrada">Entrada (sumar stock)</option>
                        <option value="salida">Salida (restar stock)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        placeholder="Ej. 10"
                    />
                </div>
            </Modal>

            {/* MODAL HISTORIAL */}
            <Modal
                open={isHistorialOpen}
                title={`Historial: ${productoSeleccionado?.nombre || ""}`}
                onClose={() => setIsHistorialOpen(false)}
                onSave={() => setIsHistorialOpen(false)}
                saveText="Cerrar"
            >
                {cargandoHistorial ? (
                    <p>Cargando historial...</p>
                ) : historial.length === 0 ? (
                    <p>Aún no hay movimientos registrados para este producto.</p>
                ) : (
                    <table className="historial-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Antes</th>
                                <th>Después</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((m) => (
                                <tr key={m.id_movimiento}>
                                    <td>{new Date(m.fecha).toLocaleString()}</td>
                                    <td className={m.tipo_movimiento === "entrada" ? "tipo-entrada" : "tipo-salida"}>
                                        {m.tipo_movimiento}
                                    </td>
                                    <td>{m.cantidad_anterior}</td>
                                    <td>{m.cantidad_nueva}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Modal>
        </div>
    );
}
