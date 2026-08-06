import api from "./api";

// ===============================
// REGISTRO
// ===============================

export const registrarUsuario = async (usuario) => {

    console.log("Servicio registro recibe:", usuario);

    const response = await api.post(
        "/usuarios/register",
        usuario
    );

    console.log("Respuesta axios:", response.data);

    return response.data;
};

// ===============================
// LOGIN
// ===============================

export const loginUsuario = async (datos) => {

    const response = await api.post(
        "/usuarios/login",
        datos
    );

    return response.data;
};

// ===============================
// ACTUALIZAR PERFIL
// ===============================

export const actualizarPerfil = async (datos) => {

    const response = await api.put(
        "/usuarios/perfil",
        datos
    );

    // Actualizar el usuario guardado en localStorage
    localStorage.setItem(
        "usuario",
        JSON.stringify(response.usuario)
    );

    return response.data;
};

// ===============================
// OBTENER PERFIL DESDE EL BACKEND
// ===============================

export const obtenerPerfil = async () => {

    const response = await api.get(
        "/usuarios/perfil"
    );

    localStorage.setItem(
        "usuario",
        JSON.stringify(response.data)
    );

    return response.data;
};

// ===============================
// GUARDAR SESIÓN
// ===============================

export const guardarSesion = (data) => {

    localStorage.setItem(
        "token",
        data.token
    );

    localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
    );
};

// ===============================
// OBTENER USUARIO
// ===============================

export const obtenerUsuario = () => {

    const usuario = localStorage.getItem("usuario");

    return usuario
        ? JSON.parse(usuario)
        : null;
};

// ===============================
// CERRAR SESIÓN
// ===============================

export const cerrarSesion = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
};