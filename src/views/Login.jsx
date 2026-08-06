import React, { useState } from "react";
import "../assets/css/Login.css";

import {
  loginUsuario,
  guardarSesion
} from "../services/authService";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email.includes("@") || password.length < 6) {

      const mensaje =
        "Credenciales inválidas. La contraseña debe tener mínimo 6 caracteres.";

      setError(mensaje);

      toast.error(mensaje, {
        position: "top-right",
        autoClose: 3000,
      });

      return;
    }

    try {

      const data = await loginUsuario({

        correo: email,

        password

      });

      console.log("RESPUESTA LOGIN:", data);

      guardarSesion(data);

      setError("");

      toast.success("¡Inicio de sesión exitoso!", {
        position: "top-right",
        autoClose: 2500,
      });

      // Espera un momento antes de redireccionar
      setTimeout(() => {

        if (data.usuario.rol === "ADMIN") {

          navigate("/admin");

        } else {

          navigate("/");

        }

      }, 1200);

    } catch (error) {

      console.log("ERROR LOGIN:", error);

      const mensaje =
        error.response?.data?.mensaje ||
        "Correo o contraseña incorrectos";

      setError(mensaje);

      toast.error(mensaje, {
        position: "top-right",
        autoClose: 3000,
      });

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">
          SNEAKER
          <span>DROP</span>
        </div>

        <h1 className="login-title">
          Iniciar Sesión
        </h1>

        <p className="login-subtitle">
          Ingresa a tu cuenta y descubre nuevos modelos
        </p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {
            error &&
            <div className="login-error">
              {error}
            </div>
          }

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />

          </div>

          <div className="input-group">

            <label>Contraseña</label>

            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />

          </div>

          <button
            className="login-button"
            type="submit"
          >
            Ingresar
          </button>

          <div className="login-register">

            ¿No tienes cuenta?

            <Link to="/register">
              Regístrate
            </Link>

          </div>

        </form>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </div>

  );

}