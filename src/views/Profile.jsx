import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerPerfil,
  cerrarSesion,
  actualizarPerfil
} from "../services/authService";

export default function Profile() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    ciudad: "",
    direccion: ""
  });

  useEffect(() => {

    const cargarPerfil = async () => {

        try {

            const data = await obtenerPerfil();

            console.log("PERFIL BACKEND:", data);

            setUsuario(data);

            setForm({
                nombre: data.nombre || "",
                apellido: data.apellido || "",
                correo: data.correo || "",
                telefono: data.telefono || "",
                ciudad: data.ciudad || "",
                direccion: data.direccion || ""
            });


        } catch(error) {

            console.log(
                "Error obteniendo perfil:",
                error
            );

        }

    };


    cargarPerfil();


}, []);

  const logout = () => {

    cerrarSesion();

    navigate("/login");

  };

  const guardarCambios = async () => {
    console.log("FORM:", form);

    try {

      const data = await actualizarPerfil(form);

      const usuarioActualizado = {
        ...usuario,
        ...form
      };

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioActualizado)
      );

      setUsuario(usuarioActualizado);

      setEditando(false);

      alert(data.mensaje);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.mensaje ||
        "No se pudo actualizar el perfil."
      );

    }

  };

  if (!usuario) {

    return (

      <div style={styles.container}>

        <div style={styles.card}>

          <h2>No hay sesión iniciada</h2>

          <button
            style={styles.orders}
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>

        </div>

      </div>

    );

  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Mi Perfil
        </h1>

        <p style={styles.subtitle}>
          Información de tu cuenta
        </p>

        <div style={styles.info}>

          {/* NOMBRE */}

          <div style={styles.row}>

            <span>Nombre</span>

            {
              editando ?

                <input
                  value={form.nombre}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nombre: e.target.value
                    })
                  }
                  style={styles.input}
                />

                :

                <strong>{usuario.nombre}</strong>

            }

          </div>

          {/* APELLIDO */}

          <div style={styles.row}>

            <span>Apellido</span>

            {
              editando ?

                <input
                  value={form.apellido}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      apellido: e.target.value
                    })
                  }
                  style={styles.input}
                />

                :

                <strong>{usuario.apellido}</strong>

            }

          </div>

          {/* CORREO */}

<div style={styles.row}>

    <span>Correo</span>

    {editando ? (

        <input
            type="email"
            value={form.correo}
            onChange={(e) =>
                setForm({
                    ...form,
                    correo: e.target.value
                })
            }
            style={styles.input}
        />

    ) : (

        <strong>{usuario.correo}</strong>

    )}

</div>

          {/* TELÉFONO */}

          <div style={styles.row}>

            <span>Teléfono</span>

            {
              editando ?

                <input
                  value={form.telefono}
                  maxLength={10}
                  onChange={(e) => {

                    const value = e.target.value;

                    if (/^\d*$/.test(value)) {

                      setForm({
                        ...form,
                        telefono: value
                      });

                    }

                  }}
                  style={styles.input}
                />

                :

                <strong>{usuario.telefono}</strong>

            }

          </div>

          {/* CIUDAD */}

          <div style={styles.row}>

            <span>Ciudad</span>

            {
              editando ?

                <input
                  value={form.ciudad}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ciudad: e.target.value
                    })
                  }
                  style={styles.input}
                />

                :

                <strong>{usuario.ciudad}</strong>

            }

          </div>

          {/* DIRECCIÓN */}

          <div style={styles.row}>

            <span>Dirección</span>

            {
              editando ?

                <input
                  value={form.direccion}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      direccion: e.target.value
                    })
                  }
                  style={styles.input}
                />

                :

                <strong>{usuario.direccion}</strong>

            }

          </div>

        </div>

        {
          editando ?

            <button
              style={styles.save}
              onClick={guardarCambios}
            >
              Guardar cambios
            </button>

            :

            <button
              style={styles.edit}
              onClick={() => setEditando(true)}
            >
              Editar perfil
            </button>

        }

        <button
          style={styles.orders}
          onClick={() => navigate("/orders")}
        >
          Mis pedidos
        </button>

        <button
          style={styles.logout}
          onClick={logout}
        >
          Cerrar sesión
        </button>

      </div>

    </div>

  );

}

const styles = {

  container: {
    minHeight: "calc(100vh - 56px)",
    background: "#0A0A0A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    width: "500px",
    background: "#0F0F0F",
    border: "1px solid #1E1E1E",
    padding: "35px",
    color: "#F5F5F0",
    borderRadius: "10px"
  },

  title: {
    margin: 0,
    fontSize: 32
  },

  subtitle: {
    color: "#777",
    marginBottom: 30
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: 18
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #222",
    paddingBottom: "10px"
  },

 input: {
    width: "220px",
    padding: "8px 10px",
    background: "#181818",
    color: "#F5F5F0",
    border: "1px solid #333",
    outline: "none",
    borderRadius: "4px",
    fontSize: "14px"
},

  edit: {
    width: "100%",
    marginTop: "30px",
    padding: "13px",
    background: "#1A1A1A",
    color: "#F0E040",
    border: "1px solid #F0E040",
    fontWeight: "700",
    cursor: "pointer",
    borderRadius: "5px"
  },

  save: {
    width: "100%",
    marginTop: "30px",
    padding: "13px",
    background: "#00C853",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    borderRadius: "5px"
  },

  orders: {
    width: "100%",
    marginTop: "15px",
    padding: "13px",
    background: "#F0E040",
    color: "#0A0A0A",
    border: "none",
    fontWeight: "800",
    cursor: "pointer",
    borderRadius: "5px"
  },

  logout: {
    width: "100%",
    marginTop: "15px",
    padding: "13px",
    background: "#181818",
    color: "#F5F5F0",
    border: "1px solid #333",
    cursor: "pointer",
    borderRadius: "5px"
  }

};