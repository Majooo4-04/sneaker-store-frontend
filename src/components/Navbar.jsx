
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/css/Navbar.css';
import React, { useState, useEffect } from 'react';
import { obtenerUsuario, cerrarSesion } from "../services/authService";
import { obtenerCarrito } from "../services/carritoService";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const navigate = useNavigate();

  const usuario = obtenerUsuario();

const [profileOpen, setProfileOpen] = useState(false);

const logout = () => {

  cerrarSesion();

  navigate("/login");

};
const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  cargarCarrito();

  window.addEventListener("cart-updated", cargarCarrito);
  return () => window.removeEventListener("cart-updated", cargarCarrito);
}, [usuario]);

const cargarCarrito = async () => {
  try {
    if (!usuario) {
      setCartCount(0);
      return;
    }
    const data = await obtenerCarrito(usuario.id_usuario);
        console.log("Respuesta del carrito:", data); 
    setCartCount(data.detalles?.length || 0);
  } catch (err) {
    console.log(err);
  }
};

  const iconLinks = [
    { to: '/favorites', label: 'Favoritos', icon: HeartIcon },
    { to: '/cart', label: 'Carrito', icon: CartIcon }
    // { to: '/profile', label: 'Perfil', icon: UserIcon }
  ];

  return (
    <nav className="sneaker-navbar">
      {/* LOGO (Alineado a la izquierda) */}
      <button onClick={() => navigate('/')} className="sneaker-navbar-logo">
        SNEAKER<span>DROP</span>
      </button>

      {/* LINKS CENTRALES (Todos agrupados dentro del contenedor) */}
      <div className="sneaker-navbar-center">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "sneaker-navbar-link active" : "sneaker-navbar-link")}
        >
          Inicio
        </NavLink>

        {/* DROPDOWN CATÁLOGO */}
        <div className="sneaker-catalog-menu">
          <button
            className="sneaker-catalog-button"
            onClick={() => setCatalogOpen(!catalogOpen)}
          >
            Catálogo
            <span className="sneaker-catalog-arrow">{catalogOpen ? "▲" : "▼"}</span>
          </button>

          {catalogOpen && (
            <div className="sneaker-catalog-dropdown">
              <NavLink to="/catalog?brand=Nike" onClick={() => setCatalogOpen(false)}>
                Nike
              </NavLink>
              <NavLink to="/catalog?brand=Adidas" onClick={() => setCatalogOpen(false)}>
                Adidas
              </NavLink>
              <NavLink to="/catalog?brand=Puma" onClick={() => setCatalogOpen(false)}>
                Puma
              </NavLink>
              <NavLink to="/catalog" onClick={() => setCatalogOpen(false)}>
                Todos
              </NavLink>
            </div>
          )}
        </div>

        {/* NOSOTROS DENTRO DE NAVBAR-CENTER */}
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "sneaker-navbar-link active" : "sneaker-navbar-link")}
        >
          Nosotros
        </NavLink>
      </div>

      {/* ACCIONES (Derecha) */}
      <div className="sneaker-navbar-actions">
        {iconLinks.map(({ to, label, icon: Icon }) => (
  <NavLink
    key={to}
    to={to}
    title={label}
    className={({ isActive }) => (isActive ? "sneaker-icon-btn active" : "sneaker-icon-btn")}
    style={{ position: "relative" }}
  >
    <Icon />
    {to === "/cart" && cartCount > 0 && (
      <span
        style={{
          position: "absolute",
          top: -6,
          right: -6,
          background: "#F0E040",
          color: "#0A0A0A",
          fontSize: 11,
          fontWeight: 700,
          borderRadius: "50%",
          minWidth: 16,
          height: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 4px",
        }}
      >
        {cartCount}
      </span>
    )}
  </NavLink>
))}

        <div className="sneaker-divider"></div>

{usuario ? (

  <div className="sneaker-profile">

    <button
      className="sneaker-profile-btn"
      onClick={() => setProfileOpen(!profileOpen)}
    >
      Hola, {usuario.nombre}
      <span>▼</span>
    </button>

    {profileOpen && (

      <div className="sneaker-profile-menu">

        <button
          onClick={() => {
            navigate("/profile");
            setProfileOpen(false);
          }}
        >
          Mi perfil
        </button>

        <button
          onClick={() => {
            navigate("/orders");
            setProfileOpen(false);
          }}
        >
          Mis pedidos
        </button>

        <button
          className="logout"
          onClick={logout}
        >
          Cerrar sesión
        </button>

      </div>

    )}

  </div>

) : (

  <>

    <NavLink
      to="/login"
      className="sneaker-auth-link"
    >
      Entrar
    </NavLink>

    <NavLink
      to="/register"
      className="sneaker-register-btn"
    >
      Registro
    </NavLink>

  </>

)}
      </div>

      {/* BOTÓN MÓVIL */}
      <button className="sneaker-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* MENÚ MÓVIL (DRAWER) */}
      {menuOpen && (
        <div className="sneaker-drawer">
          <NavLink to="/" className="sneaker-drawer-link" onClick={() => setMenuOpen(false)}>
            Inicio
          </NavLink>

          <div className="sneaker-drawer-subtitle">Catálogo</div>

          <NavLink to="/catalog?brand=Nike" className="sneaker-drawer-sublink" onClick={() => setMenuOpen(false)}>
            Nike
          </NavLink>
          <NavLink to="/catalog?brand=Adidas" className="sneaker-drawer-sublink" onClick={() => setMenuOpen(false)}>
            Adidas
          </NavLink>
          <NavLink to="/catalog?brand=Puma" className="sneaker-drawer-sublink" onClick={() => setMenuOpen(false)}>
            Puma
          </NavLink>
          <NavLink to="/catalog" className="sneaker-drawer-sublink" onClick={() => setMenuOpen(false)}>
            Ver Todos
          </NavLink>

          <NavLink to="/about" className="sneaker-drawer-link" onClick={() => setMenuOpen(false)}>
            Nosotros
          </NavLink>

          <div className="sneaker-drawer-divider"></div>

          {iconLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className="sneaker-drawer-link" onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}

          <NavLink to="/login" className="sneaker-drawer-link" onClick={() => setMenuOpen(false)}>
            Entrar
          </NavLink>

          <NavLink to="/register" className="sneaker-drawer-link sneaker-register-mobile" onClick={() => setMenuOpen(false)}>
            Registro
          </NavLink>
        </div>
      )}
    </nav>
  );
}

/* --- ICONOS SVG --- */
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const UserIcon = () => (

<svg
width="20"
height="20"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
>

<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>

<circle cx="12" cy="7" r="4"/>

</svg>

);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
