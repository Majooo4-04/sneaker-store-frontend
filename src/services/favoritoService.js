import api from "./api";


// ===============================
// OBTENER FAVORITOS DEL USUARIO
// ===============================

export const obtenerFavoritos = async (idUsuario) => {

    const response = await api.get(`/favoritos/${idUsuario}`);

    return response.data;

};


// ===============================
// AGREGAR A FAVORITOS
// ===============================

export const agregarFavorito = async (idUsuario, idProducto) => {

    const response = await api.post("/favoritos", {
        id_usuario: idUsuario,
        id_producto: idProducto,
    });

    return response.data;

};


// ===============================
// ELIMINAR DE FAVORITOS
// ===============================

export const eliminarFavorito = async (idFavorito) => {

    const response = await api.delete(`/favoritos/${idFavorito}`);

    return response.data;

};