import api from "./api";

// ===============================
// CREAR PEDIDO
// ===============================

export const crearPedido = async (idUsuario) => {

    const response = await api.post(
        `/pedidos`,
        { id_usuario: idUsuario }
    );

    return response.data;

};
// ===============================
// OBTENER PEDIDOS DEL USUARIO
// ===============================

export const obtenerPedidosUsuario = async (idUsuario) => {

    const response = await api.get(
        `/pedidos/usuario/${idUsuario}`
    );

    return response.data;

};


// ===============================
// OBTENER DETALLE DEL PEDIDO
// ===============================

export const obtenerPedido = async (idPedido) => {

    const response = await api.get(
        `/pedidos/${idPedido}`
    );

    return response.data;

};
// ===============================
// OBTENER TODOS LOS PEDIDOS (ADMIN)
// ===============================

export const obtenerPedidos = async () => {

    const response = await api.get("/pedidos");

    return response.data;

};


// ===============================
// ACTUALIZAR ESTADO DEL PEDIDO
// ===============================

export const actualizarEstadoPedido = async (id, estado) => {

    const response = await api.put(

        `/pedidos/estado/${id}`,

        {
            estado
        }

    );

    return response.data;

};

// ===============================
// EXPORTAR TODOS LOS PEDIDOS
// ===============================

export const exportarPedidos = async () => {

    const response = await api.get(
        "/pedidos/exportar",
        {
            responseType: "blob"
        }
    );

    return response.data;

};
export const obtenerVentasPorMes = async () => {
    const response = await axios.get(`${API_URL}/ventas-mensuales`);
    return response.data;
};