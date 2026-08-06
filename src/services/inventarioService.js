import api from "./api";

// Obtener inventario completo (con resumen de disponibles/bajos/agotados)
export const obtenerInventario = async () => {
    const response = await api.get("/inventario");
    return response.data;
};

// Ajustar stock: tipo "entrada" o "salida"
export const ajustarStock = async (id, tipo, cantidad) => {
    const response = await api.patch(
        `/inventario/${id}/stock`,
        { tipo, cantidad }
    );
    return response.data;
};

// Historial de movimientos de un producto específico
export const obtenerHistorialProducto = async (id) => {
    const response = await api.get(`/inventario/${id}/movimientos`);
    return response.data;
};

// Historial general (últimos 50 movimientos, todos los productos)
export const obtenerHistorialGeneral = async () => {
    const response = await api.get("/inventario/movimientos");
    return response.data;
};