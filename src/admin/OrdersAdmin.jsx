import React, { useEffect, useState } from "react";
import "../assets/css/OrdersAdmin.css";

import {
    obtenerPedidos,
    obtenerPedido,
    actualizarEstadoPedido,
     exportarPedidos
} from "../services/pedidoService";

export default function OrdersAdmin() {

const [orders, setOrders] = useState([]);

const [search, setSearch] = useState("");

const [filter, setFilter] = useState("Todos");

const [selected, setSelected] = useState(null);

const [open, setOpen] = useState(false);

useEffect(() => {

    cargarPedidos();

}, []);

const cargarPedidos = async () => {

    try {

        const data = await obtenerPedidos();

        setOrders(data);

    } catch (error) {

        console.log(error);

    }

};
const descargarExcel = async () => {

    try {

        const archivo = await exportarPedidos();

        const url = window.URL.createObjectURL(
            new Blob([archivo])
        );

        const link = document.createElement("a");

        link.href = url;

        link.download = "Pedidos.xlsx";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.log(error);

        alert("No fue posible exportar los pedidos.");

    }

};

const totalPedidos = orders.length;

const pendientes = orders.filter(
    o => o.estado === "PENDIENTE"
).length;
const pagados = orders.filter(
    o => o.estado === "PAGADO"
).length;

const enviados = orders.filter(
    o => o.estado === "ENVIADO"
).length;

const entregados = orders.filter(
    o => o.estado === "ENTREGADO"
).length;

const cancelados = orders.filter(
    o => o.estado === "CANCELADO"
).length;

const filtered = orders.filter(order => {

    const nombre =
        `${order.usuario?.nombre || ""} ${order.usuario?.apellido || ""}`;

    const matchSearch =

        nombre.toLowerCase().includes(search.toLowerCase())

        ||

        String(order.id_pedido).includes(search);

    const matchFilter =

        filter === "Todos"

        ?

        true

        :

        order.estado === filter.toUpperCase();

    return matchSearch && matchFilter;

});

function statusClass(status) {

    switch (status) {

        case "PENDIENTE":

            return "status pending";

        case "PAGADO":
            return "status paid";

        case "ENVIADO":

            return "status shipped";

        case "ENTREGADO":

            return "status delivered";

        case "CANCELADO":

            return "status canceled";

        default:

            return "status";

    }

}
// =====================================
// ABRIR DETALLE
// =====================================

const openDetail = async (order) => {

    try {

        const data = await obtenerPedido(order.id_pedido);

        setSelected(data);

        setOpen(true);

    } catch (error) {

        console.log(error);

    }

};


// =====================================
// GUARDAR NUEVO ESTADO
// =====================================

const saveStatus = async () => {

    try {

        await actualizarEstadoPedido(

            selected.id_pedido,

            selected.estado

        );

        await cargarPedidos();

        setOpen(false);

    } catch (error) {

        console.log(error);

    }

};


// =====================================
// RETURN
// =====================================

return (

<div className="orders-admin">

<div className="page-header">

<div>

<h1>

Gestión de Pedidos

</h1>

<p>

Administra todos los pedidos realizados por los clientes.

</p>

</div>

<button
    className="export-btn"
    onClick={descargarExcel}
>

    Exportar

</button>

</div>


<div className="orders-cards">

<div className="card">

<span>

Total Pedidos

</span>

<h2>

{totalPedidos}

</h2>

</div>

<div className="card yellow">

<span>

Pendientes

</span>

<h2>

{pendientes}

</h2>

</div>

<div className="card purple">

<span>

Pagados

</span>

<h2>

{pagados}

</h2>

</div>

<div className="card blue">

<span>

Enviados

</span>

<h2>

{enviados}

</h2>

</div>

<div className="card green">

<span>

Entregados

</span>

<h2>

{entregados}

</h2>

</div>

<div className="card red">

<span>

Cancelados

</span>

<h2>

{cancelados}

</h2>

</div>

</div>


<div className="toolbar">

<input

type="text"

placeholder="Buscar pedido o cliente..."

value={search}

onChange={e => setSearch(e.target.value)}

/>

<select
    value={filter}
    onChange={e => setFilter(e.target.value)}
>

    <option value="Todos">
        Todos
    </option>

    <option value="PENDIENTE">
        PENDIENTE
    </option>

    <option value="PAGADO">
        PAGADO
    </option>

    <option value="ENVIADO">
        ENVIADO
    </option>

    <option value="ENTREGADO">
        ENTREGADO
    </option>

    <option value="CANCELADO">
        CANCELADO
    </option>

</select>

</div>
<table className="orders-table">

<thead>

<tr>

<th>

Pedido

</th>

<th>

Cliente

</th>

<th>

Fecha

</th>

<th>

Total

</th>

<th>

Estado

</th>

<th>

Acciones

</th>

</tr>

</thead>

<tbody>

{

filtered.map(order=>(

<tr key={order.id_pedido}>

<td>

#{order.id_pedido}

</td>

<td>

<div className="customer">

<strong>

{order.usuario?.nombre} {order.usuario?.apellido}

</strong>

<span>

{order.usuario?.correo}

</span>

</div>

</td>

<td>

{new Date(order.fecha_pedido).toLocaleDateString()}

</td>

<td>

${Number(order.total).toLocaleString()}

</td>

<td>

<span className={statusClass(order.estado)}>

{order.estado}

</span>

</td>

<td>

<button

className="btn-view"

onClick={() => openDetail(order)}

>

Ver detalle

</button>

</td>

</tr>

))

}

</tbody>

</table>
{
open && selected && (

<div className="modal-overlay">

<div className="order-modal">

<div className="modal-header">

<div>

<h2>

Pedido #{selected.id_pedido}

</h2>

<p>

Detalle completo del pedido

</p>

</div>

<button

className="close-btn"

onClick={() => setOpen(false)}

>

✕

</button>

</div>



{/* =========================
    INFORMACIÓN DEL CLIENTE
========================= */}

<div className="modal-section">

<h3>

Información del cliente

</h3>

<div className="info-grid">

<div>

<label>

Cliente

</label>

<span>

{selected.usuario?.nombre} {selected.usuario?.apellido}

</span>

</div>

<div>

<label>

Correo

</label>

<span>

{selected.usuario?.correo}

</span>

</div>

<div>

<label>

Fecha

</label>

<span>

{new Date(selected.fecha_pedido).toLocaleString()}

</span>

</div>

<div>

<label>

Total

</label>

<span>

${Number(selected.total).toLocaleString()}

</span>

</div>

</div>

</div>



{/* =========================
        PRODUCTOS
========================= */}

<div className="modal-section">

<h3>

Productos del pedido

</h3>

<table className="products-table">

<thead>

<tr>

<th>

Producto

</th>

<th>

Cantidad

</th>

<th>

Precio

</th>

<th>

Subtotal

</th>

</tr>

</thead>

<tbody>

{

selected.detalles?.map(detalle => (

<tr key={detalle.id_detalle}>

<td>

<div className="product-cell">

{

detalle.producto?.imagen && (

<img

src={detalle.producto.imagen}

alt={detalle.producto.nombre}

className="product-image"

/>

)

}

<span>

{detalle.producto?.nombre}

</span>

</div>

</td>

<td>

{detalle.cantidad}

</td>

<td>

${Number(detalle.precio_compra).toLocaleString()}

</td>

<td>

${Number(

detalle.precio_compra * detalle.cantidad

).toLocaleString()}

</td>

</tr>

))

}

</tbody>

</table>

</div>



{/* =========================
        ESTADO
========================= */}

<div className="modal-section">

<h3>

Estado del pedido

</h3>

<select

className="status-select"

value={selected.estado}

onChange={e=>

setSelected({

...selected,

estado:e.target.value

})

}

>

<option value="PENDIENTE">

PENDIENTE

</option>

<option value="PAGADO">

PAGADO

</option>

<option value="ENVIADO">

ENVIADO

</option>

<option value="ENTREGADO">

ENTREGADO

</option>

<option value="CANCELADO">

CANCELADO

</option>

</select>

</div>



<div className="modal-footer">

<button

className="btn-cancel"

onClick={() => setOpen(false)}

>

Cerrar

</button>

<button

className="btn-save"

onClick={saveStatus}

>

Guardar cambios

</button>

</div>

</div>

</div>

)

}

</div>

);

}