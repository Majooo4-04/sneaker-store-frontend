import api from "./api";

// Obtener usuarios
export const obtenerUsuarios = async () => {
    const response = await api.get("/usuarios");
    return response.data;
};

// Crear administrador (el backend fuerza rol: "ADMIN" siempre)
export const crearUsuario = async (usuario) => {
    const response = await api.post(
        "/usuarios",
        usuario
    );
    return response.data;
};

// Actualizar
export const actualizarUsuario = async (id, usuario) => {
    const response = await api.put(
        `/usuarios/${id}`,
        usuario
    );
    return response.data;
};

// Activar / desactivar (toggle)
export const cambiarEstado = async (id) => {
    const response = await api.patch(
        `/usuarios/${id}/estado`
    );
    return response.data;
};

// Eliminar (baja lógica: pone activo en false)
export const eliminarUsuario = async (id) => {
    const response = await api.delete(
        `/usuarios/${id}`
    );
    return response.data;
};