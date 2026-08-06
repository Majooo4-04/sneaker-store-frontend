import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

import {obtenerUsuario} from "../services/authService";
import {obtenerPedidosUsuario,obtenerPedido} from "../services/pedidoService";

import "../assets/css/Orders.css";

export default function Orders(){

const navigate=useNavigate();

const[pedidos,setPedidos]=useState([]);
const[loading,setLoading]=useState(true);

const[pedidoSeleccionado,setPedidoSeleccionado]=useState(null);
const[mostrarModal,setMostrarModal]=useState(false);

useEffect(()=>{
cargarPedidos();
},[]);

const cargarPedidos=async()=>{

try{

const usuario=obtenerUsuario();

if(!usuario){
navigate("/login");
return;
}

const data=await obtenerPedidosUsuario(usuario.id_usuario);

setPedidos(data);

}catch(error){

console.error(error);

}finally{

setLoading(false);

}

};

const verDetalle=async(idPedido)=>{

try{

const data=await obtenerPedido(idPedido);

setPedidoSeleccionado(data);

setMostrarModal(true);

}catch(error){

console.error(error);

}

};

const colorEstado=(estado)=>{

switch(estado){

case "PENDIENTE":
return "#4EA8FF";

case "PAGADO":
return "#F0E040";

case "ENVIADO":
return "#FF9800";

case "ENTREGADO":
return "#32D583";

case "CANCELADO":
return "#FF5A5A";

default:
return "#888";

}

};

const pasoActivo=(estado)=>{

switch(estado){

case "PENDIENTE":
return 1;

case "PAGADO":
return 2;

case "ENVIADO":
return 3;

case "ENTREGADO":
return 4;

default:
return 1;

}

};

const formatoFecha=(fecha)=>{

return new Date(fecha).toLocaleDateString("es-MX",{
day:"2-digit",
month:"long",
year:"numeric"
});

};

if(loading){

return(

<div className="orders-loading">

<h2>Cargando pedidos...</h2>

</div>

);

}
return(

<div className="orders-container">

<div className="orders-card">

<div className="orders-header">

<div>

<div className="orders-eyebrow">
Historial
</div>

<h1>
Mis pedidos
</h1>

<p>
Consulta el estado de todas tus compras
</p>

</div>

<button
className="back-btn"
onClick={()=>navigate("/profile")}
>

← Perfil

</button>

</div>

{

pedidos.length===0?

<div className="empty-orders">

<div className="empty-icon">
📦
</div>

<h2>
No tienes pedidos todavía
</h2>

<p>
Cuando realices una compra aparecerá aquí.
</p>

<button
className="shop-btn"
onClick={()=>navigate("/catalog")}
>

Ir al catálogo

</button>

</div>

:

<div className="orders-list">

{

pedidos.map((pedido)=>(

<div
className="order-card"
key={pedido.id_pedido}
>

<div className="order-left">

<div className="order-number">

Pedido

<span>

#{String(pedido.id_pedido).padStart(6,"0")}

</span>

</div>

<div className="order-date">

{formatoFecha(pedido.fecha_pedido)}

</div>

</div>

<div className="order-center">

<div
className="status-badge"
style={{
background:colorEstado(pedido.estado)
}}
>

{pedido.estado}

</div>

</div>

<div className="order-right">

<div className="order-total">

$

{Number(pedido.total).toLocaleString("es-MX",{
minimumFractionDigits:2
})}

</div>

<button

className="detail-btn"

onClick={()=>verDetalle(
pedido.id_pedido
)}

>

Ver detalles

</button>

</div>

</div>

))

}

</div>

}

</div>

{

mostrarModal && pedidoSeleccionado && (

<div className="modal-overlay">

<div className="order-modal">

<button

className="close-modal"

onClick={()=>setMostrarModal(false)}

>

✕

</button>

<div className="modal-header">

<div>

<div className="modal-eyebrow">

Pedido

</div>

<h2>

#{String(
pedidoSeleccionado.id_pedido
).padStart(6,"0")}

</h2>

<p>

{formatoFecha(
pedidoSeleccionado.fecha_pedido
)}

</p>

</div>

<div
className="status-badge"
style={{
background:colorEstado(
pedidoSeleccionado.estado
)
}}
>

{pedidoSeleccionado.estado}

</div>

</div>

<div className="progress">

<div className="progress-step">

<div className={
pasoActivo(
pedidoSeleccionado.estado
)>=1
?
"step active"
:
"step"
}>
✓
</div>

<span>
Pedido
</span>

</div>

<div className={
pasoActivo(
pedidoSeleccionado.estado
)>=2
?
"line active-line"
:
"line"
}/>

<div className="progress-step">

<div className={
pasoActivo(
pedidoSeleccionado.estado
)>=2
?
"step active"
:
"step"
}>
$
</div>

<span>
Pagado
</span>

</div>

<div className={
pasoActivo(
pedidoSeleccionado.estado
)>=3
?
"line active-line"
:
"line"
}/>

<div className="progress-step">

<div className={
pasoActivo(
pedidoSeleccionado.estado
)>=3
?
"step active"
:
"step"
}>
🚚
</div>

<span>
Enviado
</span>

</div>

<div className={
pasoActivo(
pedidoSeleccionado.estado
)>=4
?
"line active-line"
:
"line"
}/>

<div className="progress-step">

<div className={
pasoActivo(
pedidoSeleccionado.estado
)>=4
?
"step active"
:
"step"
}>
✔
</div>

<span>
Entregado
</span>

</div>

</div>

<div className="products-container">

{

pedidoSeleccionado.detalles?.map(detalle=>(

<div
className="order-product-card"
key={detalle.id_detalle}
>

<img

src={detalle.producto.imagen}

alt={detalle.producto.nombre}

/>

<div className="product-info">

<h3>

{detalle.producto.nombre}

</h3>

<p>

Cantidad:
<strong>

{detalle.cantidad}

</strong>

</p>

</div>

<div className="product-price">

$

{Number(
detalle.precio_compra
).toLocaleString("es-MX",{
minimumFractionDigits:2
})}

</div>

</div>

))

}

</div>

<div className="summary-box">

<div className="summary-row">

<span>
Subtotal
</span>

<span>

$

{Number(
pedidoSeleccionado.total
).toLocaleString("es-MX",{
minimumFractionDigits:2
})}

</span>

</div>

<div className="summary-row">

<span>
Envío
</span>

<span>
Gratis
</span>

</div>

<div className="summary-total">

<span>
Total
</span>

<span>

$

{Number(
pedidoSeleccionado.total
).toLocaleString("es-MX",{
minimumFractionDigits:2
})}

</span>

</div>

</div>

</div>

</div>

)

}

</div>

);

}