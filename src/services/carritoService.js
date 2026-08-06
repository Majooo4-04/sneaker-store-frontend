import api from "./api";


// ===============================
// OBTENER CARRITO DEL USUARIO
// ===============================

export const obtenerCarrito = async (idUsuario) => {

    const response = await api.get(
        `/carritos/${idUsuario}`
    );

    return response.data;

};


// ===============================
// AGREGAR PRODUCTO AL CARRITO
// ===============================

export const agregarProducto = async (idUsuario, idProducto, cantidad = 1) => {

    const response = await api.post(
        "/carritos",
        {
            id_usuario: idUsuario,
            id_producto: idProducto,
            cantidad,
        }
    );

    return response.data;

};


// ===============================
// ACTUALIZAR CANTIDAD
// ===============================

export const actualizarCantidad = async (id, cantidad) => {

    const response = await api.put(
        `/carritos/${id}`,
        {
            cantidad,
        }
    );

    return response.data;

};


// ===============================
// ELIMINAR PRODUCTO DEL CARRITO
// ===============================

export const eliminarProducto = async (id) => {

    const response = await api.delete(
        `/carritos/${id}`
    );

    return response.data;

};