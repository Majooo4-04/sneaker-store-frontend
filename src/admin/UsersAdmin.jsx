import React, { useEffect, useState } from "react";

import "../assets/css/UsersAdmin.css";

import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

import {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    cambiarEstado,
    eliminarUsuario
} from "../services/usuarioService";


const emptyForm = {
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    telefono: "",
    direccion: "",
    ciudad: ""
};

export default function UsersAdmin() {

    const [users, setUsers] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Filtro: "activos" | "inactivos" | "todos"
    const [filtro, setFiltro] = useState("activos");

    const [formData, setFormData] = useState(emptyForm);
    const [editingUserId, setEditingUserId] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            setCargando(true);
            const data = await obtenerUsuarios();
            setUsers(data);
        } catch (err) {
            setError(err.response?.data?.mensaje || "Error al cargar usuarios");
        } finally {
            setCargando(false);
        }
    };

    // Usuarios visibles según el filtro seleccionado
    const usuariosFiltrados = users.filter((u) => {
        if (filtro === "activos") return u.activo;
        if (filtro === "inactivos") return !u.activo;
        return true; // "todos"
    });

    // --- MODAL CREAR ---
    const handleOpenCreateModal = () => {
        setEditingUserId(null);
        setFormData(emptyForm);
        setIsFormOpen(true);
    };

    // --- MODAL EDITAR ---
    const handleOpenEditModal = (user) => {
        setEditingUserId(user.id_usuario);
        setFormData({
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            password: "",
            telefono: user.telefono || "",
            direccion: user.direccion || "",
            ciudad: user.ciudad || ""
        });
        setIsFormOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveUser = async () => {
        if (!formData.nombre.trim() || !formData.correo.trim()) return;
        if (!editingUserId && !formData.password.trim()) return;

        try {
            setGuardando(true);

            if (editingUserId) {
                const { password, ...datosSinPassword } = formData;
                await actualizarUsuario(editingUserId, datosSinPassword);
            } else {
                await crearUsuario(formData);
            }

            setIsFormOpen(false);
            await cargarUsuarios();
        } catch (err) {
            setError(err.response?.data?.mensaje || "Error al guardar usuario");
        } finally {
            setGuardando(false);
        }
    };

    // --- TOGGLE SWITCH (ACTIVO / INACTIVO) ---
    const handleToggleStatus = async (id) => {
        try {
            await cambiarEstado(id);
            await cargarUsuarios();
        } catch (err) {
            setError(err.response?.data?.mensaje || "Error al cambiar estado");
        }
    };

    // --- MODAL ELIMINAR ---
    const handleOpenDeleteModal = (user) => {
        setUserToDelete(user);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;
        try {
            await eliminarUsuario(userToDelete.id_usuario);
            setUserToDelete(null);
            setIsConfirmOpen(false);
            await cargarUsuarios();
        } catch (err) {
            setError(err.response?.data?.mensaje || "Error al eliminar usuario");
        }
    };

    if (cargando) {
        return <p>Cargando usuarios...</p>;
    }

    return (
        <div className="admin-container">
            <div className="page-header">
                <div>
                    <h1>Usuarios</h1>
                    <p>Gestiona los usuarios registrados.</p>
                </div>
                <button className="btn-primary" onClick={handleOpenCreateModal}>
                    + Nuevo Administrador
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {/* FILTRO ACTIVOS / INACTIVOS / TODOS */}
            <div className="filtro-usuarios">
                <button
                    className={filtro === "activos" ? "filtro-btn active" : "filtro-btn"}
                    onClick={() => setFiltro("activos")}
                >
                    Activos
                </button>
                <button
                    className={filtro === "inactivos" ? "filtro-btn active" : "filtro-btn"}
                    onClick={() => setFiltro("inactivos")}
                >
                    Inactivos
                </button>
                <button
                    className={filtro === "todos" ? "filtro-btn active" : "filtro-btn"}
                    onClick={() => setFiltro("todos")}
                >
                    Todos
                </button>
            </div>

            <div className="users-grid">
                {usuariosFiltrados.length === 0 && (
                    <p>No hay usuarios en esta categoría.</p>
                )}

                {usuariosFiltrados.map((user) => (
                    <div className="user-card" key={user.id_usuario}>
                        <div className="avatar">
                            {user.nombre?.charAt(0).toUpperCase()}
                        </div>
                        <h3>{user.nombre} {user.apellido}</h3>
                        <p>{user.correo}</p>
                        <span className="role">
                            {user.rol === "ADMIN" ? "Administrador" : "Cliente"}
                        </span>

                        {/* SWITCH ACTIVO / INACTIVO */}
                        <div className="status-switch-container">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={user.activo}
                                    onChange={() => handleToggleStatus(user.id_usuario)}
                                />
                                <span className="slider round"></span>
                            </label>
                            <span className={`status-label ${user.activo ? "activo" : "inactivo"}`}>
                                {user.activo ? "Activo" : "Inactivo"}
                            </span>
                        </div>

                        <div className="buttons">
                            <button className="btn-edit" onClick={() => handleOpenEditModal(user)}>
                                Editar
                            </button>
                            {user.activo && (
                                <button className="btn-delete" onClick={() => handleOpenDeleteModal(user)}>
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL CREAR / EDITAR */}
            <Modal
                open={isFormOpen}
                title={editingUserId ? "Editar Usuario" : "Nuevo Administrador"}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveUser}
                saveText={guardando ? "Guardando..." : (editingUserId ? "Guardar Cambios" : "Crear")}
            >
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej. Juan"
                    />
                </div>

                <div className="form-group">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        placeholder="Ej. Pérez"
                    />
                </div>

                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleInputChange}
                        placeholder="ejemplo@correo.com"
                    />
                </div>

                {!editingUserId && (
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Ciudad:</label>
                    <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                    />
                </div>

                {!editingUserId && (
                    <p className="form-note">
                        Los usuarios creados aquí siempre son administradores
                        (el backend lo asigna automáticamente).
                    </p>
                )}
            </Modal>

            {/* MODAL ELIMINAR */}
            <ConfirmModal
                open={isConfirmOpen}
                title="¿Eliminar usuario?"
                message={`¿Estás seguro de que deseas eliminar a ${userToDelete?.nombre}? Podrás reactivarlo después desde el filtro "Inactivos".`}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
