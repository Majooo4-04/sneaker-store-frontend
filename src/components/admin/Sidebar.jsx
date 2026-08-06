import {NavLink,useNavigate} from "react-router-dom";
import {
FaChartPie,
FaBoxOpen,
FaTags,
FaUsers,
FaShoppingBag,
FaWarehouse,
FaCog,
FaSignOutAlt
} from "react-icons/fa";
import "../../assets/css/AdminSidebar.css";

export default function Sidebar(){

const navigate=useNavigate();

const cerrarSesion=()=>{

localStorage.removeItem("token");
localStorage.removeItem("usuario");

navigate("/login");

};

return(

<aside className="sidebar">

<div className="sidebar-logo">

<h2>TENIS</h2>

<span>ADMIN</span>

</div>

<nav className="sidebar-menu">

<NavLink
to="/admin"
className={({isActive})=>isActive?"active":""}
>

<FaChartPie/>

<span>Dashboard</span>

</NavLink>

<NavLink
to="/admin/productos"
className={({isActive})=>isActive?"active":""}
>

<FaBoxOpen/>

<span>Productos</span>

</NavLink>

<NavLink
to="/admin/marcas"
className={({isActive})=>isActive?"active":""}
>

<FaTags/>

<span>Marcas</span>

</NavLink>

<NavLink
to="/admin/usuarios"
className={({isActive})=>isActive?"active":""}
>

<FaUsers/>

<span>Usuarios</span>

</NavLink>

<NavLink
to="/admin/pedidos"
className={({isActive})=>isActive?"active":""}
>

<FaShoppingBag/>

<span>Pedidos</span>

</NavLink>

<NavLink
to="/admin/inventario"
className={({isActive})=>isActive?"active":""}
>

<FaWarehouse/>

<span>Inventario</span>

</NavLink>

<NavLink
to="/admin/configuracion"
className={({isActive})=>isActive?"active":""}
>

<FaCog/>

<span>Configuración</span>

</NavLink>

</nav>

<div className="sidebar-footer">

<button
className="logout-btn"
onClick={cerrarSesion}
>

<FaSignOutAlt/>

Cerrar sesión

</button>

</div>

</aside>

);

}