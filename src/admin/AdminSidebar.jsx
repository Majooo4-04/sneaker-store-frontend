import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  LogOut,
  Gauge
} from "lucide-react";

import { cerrarSesion as cerrarSesionService } from "../services/authService";
import "../assets/css/AdminSidebar.css";



export default function AdminSidebar(){


const cerrarSesion = () => {

  cerrarSesionService(); // borra token Y usuario, en un solo lugar

  window.location.href="/login";

};


const menu=[

{
name:"Dashboard",
icon:<LayoutDashboard size={20}/>,
link:"/admin"
},

{
name:"Productos",
icon:<Package size={20}/>,
link:"/admin/products"
},

{
name:"Inventario",
icon:<Boxes size={20}/>,
link:"/admin/inventory"
},

{
name:"Pedidos",
icon:<ShoppingCart size={20}/>,
link:"/admin/orders"
},

{
name:"Usuarios",
icon:<Users size={20}/>,
link:"/admin/users"
},
{
  name:"Estadísticas de Lighthouse",
  icon:<Gauge size={20}/>,
  link:"/admin/lighthouse"
}

];


return(

<aside className="sidebar">


<div className="logo">

<h2>

SNEAKER
<span>DROP</span>

</h2>

<p>Administrador</p>

</div>



<nav>

{

menu.map(item=>(

<NavLink

key={item.link}

to={item.link}

end={item.link === "/admin"}

className={({ isActive }) =>
isActive ? "menu active" : "menu"
}

>

{item.icon}

<span>{item.name}</span>

</NavLink>

))

}

</nav>




<div className="sidebar-footer">


<p>
Administrador
</p>


<button
className="logout-btn"
onClick={cerrarSesion}
>

<LogOut size={18}/>

<span>
Cerrar sesión
</span>

</button>


</div>


</aside>

)

}
