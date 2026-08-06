import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../services/api";
import VincularDispositivo from "./VincularDispositivo";
import "../assets/css/PerfilModal.css";

export default function PerfilModal({ onClose }) {
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState({});
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const res = await api.get("/usuarios/perfil");
        setPerfil(res.data);
        setForm(res.data);
      } catch (err) {
        setError(
          err.response?.data?.mensaje || "No se pudo cargar el perfil"
        );
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, []);

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    setExito(false);

    try {
      const res = await api.put("/usuarios/perfil", {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        telefono: form.telefono,
        direccion: form.direccion,
        ciudad: form.ciudad
      });

      setPerfil(res.data.usuario);
      setForm(res.data.usuario);
      setEditando(false);
      setExito(true);

      setTimeout(() => setExito(false), 2500);

    } catch (err) {
      setError(
        err.response?.data?.mensaje || "No se pudo actualizar el perfil"
      );
    } finally {
      setGuardando(false);
    }
  };

  const cancelarEdicion = () => {
    setForm(perfil);
    setEditando(false);
    setError(null);
  };

  return (
    <div className="perfil-overlay" onClick={onClose}>
      <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>

        <div className="perfil-header">
          <h2>Mi Perfil</h2>
          <button className="cerrar-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {cargando ? (
          <p className="perfil-estado">Cargando perfil...</p>
        ) : error && !perfil ? (
          <p className="perfil-estado error">{error}</p>
        ) : (
          <>
            <form onSubmit={guardarCambios} className="perfil-form">

              {exito && (
                <p className="perfil-mensaje exito">
                  Perfil actualizado correctamente.
                </p>
              )}

              {error && (
                <p className="perfil-mensaje error">{error}</p>
              )}

              <div className="perfil-avatar-grande">
                {form.nombre?.charAt(0)?.toUpperCase() || "A"}
              </div>

              <div className="perfil-campo">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre || ""}
                  onChange={manejarCambio}
                  disabled={!editando}
                  required
                />
              </div>

              <div className="perfil-campo">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={form.apellido || ""}
                  onChange={manejarCambio}
                  disabled={!editando}
                  required
                />
              </div>

              <div className="perfil-campo">
                <label>Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={form.correo || ""}
                  onChange={manejarCambio}
                  disabled={!editando}
                  required
                />
              </div>

              <div className="perfil-campo">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono || ""}
                  onChange={manejarCambio}
                  disabled={!editando}
                />
              </div>

              <div className="perfil-campo">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion || ""}
                  onChange={manejarCambio}
                  disabled={!editando}
                />
              </div>

              <div className="perfil-campo">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={form.ciudad || ""}
                  onChange={manejarCambio}
                  disabled={!editando}
                />
              </div>

              <div className="perfil-info-extra">
                <span>Rol: <strong>{perfil?.rol}</strong></span>
                <span>
                  Registrado desde:{" "}
                  {perfil?.fecha_registro &&
                    new Date(perfil.fecha_registro).toLocaleDateString()}
                </span>
              </div>

              <div className="perfil-acciones">
                {!editando ? (
                  <button
                    type="button"
                    className="btn-editar"
                    onClick={() => setEditando(true)}
                  >
                    Editar perfil
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn-cancelar"
                      onClick={cancelarEdicion}
                      disabled={guardando}
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="btn-guardar"
                      disabled={guardando}
                    >
                      {guardando ? "Guardando..." : "Guardar cambios"}
                    </button>
                  </>
                )}

              </div>

            </form>

            <VincularDispositivo />
          </>
        )}

      </div>
    </div>
  );
}