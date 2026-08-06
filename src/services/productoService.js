import api from "./api";


// ===============================
// OBTENER TODOS LOS PRODUCTOS
// ===============================

export const obtenerProductos = async () => {

    const response = await api.get("/productos");

    return response.data;

};


// ===============================
// OBTENER PRODUCTO POR ID
// ===============================

export const obtenerProducto = async (idProducto) => {

    const response = await api.get(
        `/productos/${idProducto}`
    );

    return response.data;

};


// ===============================
// CREAR PRODUCTO
// ===============================

export const crearProducto = async(producto)=>{

    const response = await api.post(
        "/productos",
        producto
    );

    return response.data;

};


// ===============================
// ACTUALIZAR PRODUCTO
// ===============================

export const actualizarProducto = async(id, producto)=>{

    const response = await api.put(
        `/productos/${id}`,
        producto
    );

    return response.data;

};


// ===============================
// ELIMINAR PRODUCTO
// ===============================

export const eliminarProducto = async(id)=>{

    const response = await api.delete(
        `/productos/${id}`
    );

    return response.data;

};