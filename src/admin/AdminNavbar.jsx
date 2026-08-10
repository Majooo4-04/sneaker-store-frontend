// import React, { useState, useRef, useEffect } from "react";
// import { Bell,  ChevronDown, User, LogOut } from "lucide-react";
// import PerfilModal from "./PerfilModal";
// import "../assets/css/AdminNavbar.css";

// export default function AdminNavbar() {
//   const [menuAbierto, setMenuAbierto] = useState(false);
//   const [perfilAbierto, setPerfilAbierto] = useState(false);
//   const menuRef = useRef(null);

//   // Cerrar el menú si se hace clic afuera
//   useEffect(() => {
//     const manejarClicAfuera = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuAbierto(false);
//       }
//     };

//     document.addEventListener("mousedown", manejarClicAfuera);
//     return () => document.removeEventListener("mousedown", manejarClicAfuera);
//   }, []);

//   const abrirPerfil = () => {
//     setPerfilAbierto(true);
//     setMenuAbierto(false);
//   };

//   const cerrarSesion = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login"; // ajusta a tu ruta real de login
//   };

//   return (
//     <header className="admin-navbar">

      

//       <div className="navbar-right">

        

//         <div className="admin-user-wrapper" ref={menuRef}>

//           <div
//             className="admin-user"
//             onClick={() => setMenuAbierto(!menuAbierto)}
//           >
//             <div className="avatar">A</div>

//             <div>
//               <h4>Administrador</h4>
//               <span>Online</span>
//             </div>

//             <ChevronDown
//               size={16}
//               className={`chevron ${menuAbierto ? "rotado" : ""}`}
//             />
//           </div>

//           {menuAbierto && (
//             <div className="admin-dropdown">
//               <button onClick={abrirPerfil}>
//                 <User size={16} />
//                 Mi Perfil
//               </button>

//               <button onClick={cerrarSesion} className="logout">
//                 <LogOut size={16} />
//                 Cerrar sesión
//               </button>
//             </div>
//           )}

//         </div>

//       </div>

//       {perfilAbierto && (
//         <PerfilModal onClose={() => setPerfilAbierto(false)} />
//       )}

//     </header>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { Bell,  ChevronDown, User, LogOut } from "lucide-react";
import PerfilModal from "./PerfilModal";
import { cerrarSesion as cerrarSesionService } from "../services/authService";
import "../assets/css/AdminNavbar.css";

export default function AdminNavbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [perfilAbierto, setPerfilAbierto] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú si se hace clic afuera
  useEffect(() => {
    const manejarClicAfuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener("mousedown", manejarClicAfuera);
    return () => document.removeEventListener("mousedown", manejarClicAfuera);
  }, []);

  const abrirPerfil = () => {
    setPerfilAbierto(true);
    setMenuAbierto(false);
  };

  const cerrarSesion = () => {
    cerrarSesionService(); // borra token Y usuario, en un solo lugar
    window.location.href = "/login";
  };

  return (
    <header className="admin-navbar">

      

      <div className="navbar-right">

        

        <div className="admin-user-wrapper" ref={menuRef}>

          <div
            className="admin-user"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <div className="avatar">A</div>

            <div>
              <h4>Administrador</h4>
              <span>Online</span>
            </div>

            <ChevronDown
              size={16}
              className={`chevron ${menuAbierto ? "rotado" : ""}`}
            />
          </div>

          {menuAbierto && (
            <div className="admin-dropdown">
              <button onClick={abrirPerfil}>
                <User size={16} />
                Mi Perfil
              </button>

              <button onClick={cerrarSesion} className="logout">
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          )}

        </div>

      </div>

      {perfilAbierto && (
        <PerfilModal onClose={() => setPerfilAbierto(false)} />
      )}

    </header>
  );
}
