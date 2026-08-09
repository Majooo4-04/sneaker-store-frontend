import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Navbar.css';
import React, { useState, useEffect, useRef } from 'react';
import { obtenerUsuario, cerrarSesion } from "../services/authService";
import { obtenerCarrito } from "../services/carritoService";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Acordeones dentro del drawer móvil (independientes de los dropdowns de desktop)
  const [drawerCatalogOpen, setDrawerCatalogOpen] = useState(false);
  const [drawerProfileOpen, setDrawerProfileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const usuario = obtenerUsuario();

  const catalogRef = useRef(null);
  const profileRef = useRef(null);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  const logout = () => {
    cerrarSesion();
    setMenuOpen(false);
    setProfileOpen(false);
    navigate("/login");
  };

  // Cierra todos los menús cada vez que cambias de página
  useEffect(() => {
    setMenuOpen(false);
    setCatalogOpen(false);
    setProfileOpen(false);
    setDrawerCatalogOpen(false);
    setDrawerProfileOpen(false);
  }, [location.pathname]);

  // Bloquea el scroll del body mientras el drawer móvil está abierto (overlay pantalla completa)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Cierra los dropdowns si haces clic/touch afuera de ellos
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catalogOpen && catalogRef.current && !catalogRef.current.contains(event.target)) {
        setCatalogOpen(false);
      }
      if (profileOpen && profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        menuOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [catalogOpen, profileOpen, menuOpen]);

  useEffect(() => {
    cargarCarrito();

    window.addEventListener("cart-updated", cargarCarrito);
    return () => {
      window.removeEventListener("cart-updated", cargarCarrito);
    };
  }, [usuario]);

  const cargarCarrito = async () => {
    try {
      if (!usuario) {
        setCartCount(0);
        return;
      }
      const data = await obtenerCarrito(usuario.id_usuario);
      setCartCount(data.detalles?.length || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const iconLinks = [
    { to: '/favorites', label: 'Favoritos', icon: HeartIcon, count: 0 },
    { to: '/cart', label: 'Carrito', icon: CartIcon, count: cartCount },
  ];

  return (
    <nav className="sneaker-navbar">
      {/* LOGO */}
      <button onClick={() => navigate('/')} className="sneaker-navbar-logo">
        SNEAKER<span>DROP</span>
      </button>

      {/* LINKS CENTRALES (desktop) */}
      <div className="sneaker-navbar-center">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "sneaker-navbar-link active" : "sneaker-navbar-link")}
        >
          Inicio
        </NavLink>

        <div className="sneaker-catalog-menu" ref={catalogRef}>
          <button
            className="sneaker-catalog-button"
            onClick={() => setCatalogOpen(!catalogOpen)}
          >
            Catálogo
            <span className="sneaker-catalog-arrow">{catalogOpen ? "▲" : "▼"}</span>
          </button>

          {catalogOpen && (
            <div className="sneaker-catalog-dropdown">
              <NavLink to="/catalog?brand=Nike" onClick={() => setCatalogOpen(false)}>Nike</NavLink>
              <NavLink to="/catalog?brand=Adidas" onClick={() => setCatalogOpen(false)}>Adidas</NavLink>
              <NavLink to="/catalog?brand=Puma" onClick={() => setCatalogOpen(false)}>Puma</NavLink>
              <NavLink to="/catalog" onClick={() => setCatalogOpen(false)}>Todos</NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "sneaker-navbar-link active" : "sneaker-navbar-link")}
        >
          Nosotros
        </NavLink>
      </div>

      {/* ACCIONES (desktop) */}
      <div className="sneaker-navbar-actions">
        {iconLinks.map(({ to, label, icon: Icon, count }) => (
          <NavLink
            key={to}
            to={to}
            title={label}
            className={({ isActive }) => (isActive ? "sneaker-icon-btn active" : "sneaker-icon-btn")}
            style={{ position: "relative" }}
          >
            <Icon />
            {count > 0 && (
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
                {count}
              </span>
            )}
          </NavLink>
        ))}

        <div className="sneaker-divider"></div>

        {usuario ? (
          <div className="sneaker-profile" ref={profileRef}>
            <button className="sneaker-profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
              Hola, {usuario.nombre}
              <span>▼</span>
            </button>

            {profileOpen && (
              <div className="sneaker-profile-menu">
                <button onClick={() => { navigate("/profile"); setProfileOpen(false); }}>Mi perfil</button>
                <button onClick={() => { navigate("/orders"); setProfileOpen(false); }}>Mis pedidos</button>
                <button className="logout" onClick={logout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login" className="sneaker-auth-link">Entrar</NavLink>
            <NavLink to="/register" className="sneaker-register-btn">Registro</NavLink>
          </>
        )}
      </div>

      {/* BOTÓN MÓVIL */}
      <button className="sneaker-hamburger" ref={hamburgerRef} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* MENÚ MÓVIL (DRAWER) */}
      {menuOpen && (
        <div className="sneaker-drawer" ref={drawerRef}>
          <NavLink to="/" className="sneaker-drawer-link" onClick={() => setMenuOpen(false)}>
            Inicio
          </NavLink>

          <button
            className="sneaker-drawer-subtitle sneaker-drawer-accordion-btn"
            onClick={() => setDrawerCatalogOpen(!drawerCatalogOpen)}
          >
            Catálogo
            <span className="sneaker-drawer-arrow">{drawerCatalogOpen ? "▲" : "▼"}</span>
          </button>

          {drawerCatalogOpen && (
            <>
              <NavLink to="/catalog?brand=Nike" className="sneaker-drawer-sublink" onClick={() => setMenuOpen(false)}>Nike</NavLink>
              <NavLink to="/catalog?brand=Adidas" className="sneaker-drawer-sublink" onClick={() => setMenuOpen(false)}>Adidas</NavLink>
              <NavLink to="/catalog?brand=Puma" className="sneaker-drawer-sublink" onClick={() => setMenuOpen(false)}>Puma</NavLink>
              <NavLink to="/catalog" className="sneaker-drawer-sublink" onClick={() => setMenuOpen(false)}>Ver Todos</NavLink>
            </>
          )}

          <NavLink to="/about" className="sneaker-drawer-link" onClick={() => setMenuOpen(false)}>
            Nosotros
          </NavLink>

          <div className="sneaker-drawer-divider"></div>

          {/* Favoritos / Carrito CON badge, ahora también en móvil */}
          {iconLinks.map(({ to, label, icon: Icon, count }) => (
            <NavLink
              key={to}
              to={to}
              className="sneaker-drawer-link"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon />
                {label}
              </span>
              {count > 0 && (
                <span
                  style={{
                    background: "#F0E040",
                    color: "#0A0A0A",
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: "50%",
                    minWidth: 18,
                    height: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 5px",
                  }}
                >
                  {count}
                </span>
              )}
            </NavLink>
          ))}

          <div className="sneaker-drawer-divider"></div>

          {/* Sesión: acordeón, cerrado por defecto */}
          {usuario ? (
            <>
              <button
                className="sneaker-drawer-subtitle sneaker-drawer-accordion-btn"
                onClick={() => setDrawerProfileOpen(!drawerProfileOpen)}
              >
                Hola, {usuario.nombre}
                <span className="sneaker-drawer-arrow">{drawerProfileOpen ? "▲" : "▼"}</span>
              </button>

              {drawerProfileOpen && (
                <>
                  <button
                    className="sneaker-drawer-link"
                    style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}
                    onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                  >
                    Mi perfil
                  </button>
                  <button
                    className="sneaker-drawer-link"
                    style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}
                    onClick={() => { navigate("/orders"); setMenuOpen(false); }}
                  >
                    Mis pedidos
                  </button>
                  <button className="sneaker-drawer-logout" onClick={logout}>
                    Cerrar sesión
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" className="sneaker-drawer-link" onClick={() => setMenuOpen(false)}>
                Entrar
              </NavLink>
              <NavLink to="/register" className="sneaker-drawer-link sneaker-register-mobile" onClick={() => setMenuOpen(false)}>
                Registro
              </NavLink>
            </>
          )}
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
