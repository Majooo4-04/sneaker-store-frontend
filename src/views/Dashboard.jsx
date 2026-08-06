import React from "react";
import {useNavigate} from "react-router-dom";
import {
FaChartPie,
FaBoxOpen,
FaTags,
FaUsers,
FaShoppingBag,
FaWarehouse,
FaCog,
FaSignOutAlt,
FaArrowUp,
FaArrowDown
} from "react-icons/fa";
import "../assets/css/Dashboard.css";

export default function Dashboard(){

const navigate=useNavigate();

const estadisticas=[
{
titulo:"Ventas",
valor:"$128,540",
porcentaje:"+18%",
positivo:true
},
{
titulo:"Pedidos",
valor:"184",
porcentaje:"+12%",
positivo:true
},
{
titulo:"Productos",
valor:"58",
porcentaje:"+4%",
positivo:true
},
{
titulo:"Usuarios",
valor:"241",
porcentaje:"-2%",
positivo:false
}
];

const pedidos=[
{
id:1205,
cliente:"María Flores",
total:"$2,450",
estado:"PENDIENTE"
},
{
id:1204,
cliente:"Juan Pérez",
total:"$1,980",
estado:"PAGADO"
},
{
id:1203,
cliente:"Luis Hernández",
total:"$3,220",
estado:"ENVIADO"
},
{
id:1202,
cliente:"Fernanda Ruiz",
total:"$1,450",
estado:"ENTREGADO"
}
];

const stock=[
{
nombre:"Nike Air Max",
stock:3
},
{
nombre:"Adidas Campus",
stock:5
},
{
nombre:"Jordan Retro",
stock:2
},
{
nombre:"Puma RS-X",
stock:1
}
];

return(

<div className="admin">

<aside className="sidebar">

<div className="logo">

TENIS
<span>ADMIN</span>

</div>

<nav>

<button
className="active"
onClick={()=>navigate("/admin")}
>

<FaChartPie/>

Dashboard

</button>

<button
onClick={()=>navigate("/admin/productos")}
>

<FaBoxOpen/>

Productos

</button>

<button
onClick={()=>navigate("/admin/marcas")}
>

<FaTags/>

Marcas

</button>

<button
onClick={()=>navigate("/admin/usuarios")}
>

<FaUsers/>

Usuarios

</button>

<button
onClick={()=>navigate("/admin/pedidos")}
>

<FaShoppingBag/>

Pedidos

</button>

<button
onClick={()=>navigate("/admin/inventario")}
>

<FaWarehouse/>

Inventario

</button>

<button>

<FaCog/>

Configuración

</button>

</nav>

<div className="sidebar-footer">

<button className="logout">

<FaSignOutAlt/>

Cerrar sesión

</button>

</div>

</aside>

<main className="content">

<header className="header">

<div>

<h1>Dashboard</h1>

<p>
Panel administrativo de la tienda
</p>

</div>

</header>

<section className="cards">

{estadisticas.map((item,index)=>(

<div
className="card"
key={index}
>

<div>

<h4>{item.titulo}</h4>

<h2>{item.valor}</h2>

</div>

<div
className={
item.positivo
?
"status positive"
:
"status negative"
}
>

{
item.positivo
?
<FaArrowUp/>
:
<FaArrowDown/>
}

{item.porcentaje}

</div>

</div>

))}

</section>
