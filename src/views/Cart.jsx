import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import {showToast} from "../components/ToastProvider";
import {obtenerCarrito,actualizarCantidad,eliminarProducto} from "../services/carritoService";
import {obtenerUsuario} from "../services/authService";
import "../assets/css/Cart.css";

const fmt=(n)=>"$"+Number(n).toLocaleString("es-MX");

export default function Cart(){

const navigate=useNavigate();

const[items,setItems]=useState([]);
const[loading,setLoading]=useState(true);

useEffect(()=>{
cargarCarrito();
},[]);

const cargarCarrito=async()=>{

try{

const usuario=obtenerUsuario();

if(!usuario){
navigate("/login");
return;
}

const carrito=await obtenerCarrito(usuario.id_usuario);

const productos=carrito.detalles.map(item=>({
id:item.id_detalle,
name:item.producto.nombre,
price:Number(item.precio_unitario),
qty:item.cantidad,
image:item.producto.imagen,
stock:item.producto.stock
}));

setItems(productos);

}catch(error){

console.log(error);
setItems([]);

}finally{

setLoading(false);

}

};

const updateQty=async(item,cantidad)=>{

try{

if(cantidad<=0){
console.log("Intentando eliminar item:", item.id)

await eliminarProducto(item.id);
console.log("Eliminado en backend OK");
 window.dispatchEvent(new Event("cart-updated"));

setItems(prev=>prev.filter(i=>i.id!==item.id));
console.log("setItems ejecutado");

showToast({
icon:"✕",
title:"Producto eliminado",
sub:item.name
});

return;

}

await actualizarCantidad(item.id,cantidad);

setItems(prev=>
prev.map(i=>
i.id===item.id
?{...i,qty:cantidad}
:i
)
);

}catch(error){

console.log("ERROR en updateQty:", error);

}

};

const remove=async(id)=>{

try{
 console.log("Intentando eliminar id:", id);
const item=items.find(i=>i.id===id);

await eliminarProducto(id);
 console.log("Eliminado en backend OK");
  window.dispatchEvent(new Event("cart-updated")); 
setItems(prev=>prev.filter(i=>i.id!==id));
console.log("setItems ejecutado");
showToast({
icon:"✕",
title:"Producto eliminado",
sub:item?.name
});

}catch(error){

 console.log("ERROR en remove:", error);

}

};

const subtotal=items.reduce((acc,item)=>acc+(item.price*item.qty),0);
const shipping=subtotal>=3000?0:350;
const total=subtotal+shipping;

if(loading){

return(
<div className="cart-loading">
<h2>Cargando carrito...</h2>
</div>
);

}
return(
<div className="cart-page">

<div className="cart-header">
<div className="cart-eyebrow">— Mi compra</div>
<h1 className="cart-title">Carrito</h1>
<span className="cart-count">
<span className="cart-count-num">
{items.reduce((a,i)=>a+i.qty,0)}
</span>
{" "}artículos
</span>
</div>

{
items.length===0?

<div className="cart-empty">

<div className="cart-empty-icon">
∅
</div>

<p className="cart-empty-text">
Tu carrito está vacío
</p>

<button
className="cart-empty-btn"
onClick={()=>navigate("/catalog")}
>
Explorar catálogo →
</button>

</div>

:

<div className="cart-layout">

<div className="cart-items">

{
items.map((item,index)=>(
<CartItem
key={item.id}
item={item}
index={index}
onIncrease={()=>updateQty(item,item.qty+1)}
onDecrease={()=>updateQty(item,item.qty-1)}
onRemove={()=>remove(item.id)}
/>
))
}

{
shipping===0&&(
<div className="cart-free">
✓ Envío gratis aplicado en tu pedido
</div>
)
}

{
shipping>0&&(
<div className="cart-ship-note">
Faltan {fmt(3000-subtotal)} para envío gratis
</div>
)
}

</div>

<div className="cart-summary">

<div className="cart-summary-label">
Resumen de compra
</div>

<div className="cart-summary-rows">

<div className="cart-summary-row">
<span>Subtotal</span>
<span>{fmt(subtotal)}</span>
</div>

<div className="cart-summary-row">
<span>Envío</span>
<span>
{shipping===0?"Gratis":fmt(shipping)}
</span>
</div>

</div>

<div className="cart-summary-total">
<span>Total</span>
<strong>{fmt(total)}</strong>
</div>

<button
className="cart-checkout"
onClick={()=>navigate("/checkout")}
>
Proceder al pago →
</button>

<button
className="cart-continue"
onClick={()=>navigate("/catalog")}
>
Seguir comprando
</button>

</div>

</div>

}

</div>
);

}

function CartItem({
item,
index,
onIncrease,
onDecrease,
onRemove
}){

const[hovered,setHovered]=useState(false);

return(

<div
className={`cart-item ${hovered?"cart-item-hover":""}`}
onMouseEnter={()=>setHovered(true)}
onMouseLeave={()=>setHovered(false)}
>

<div className="cart-item-number">
{String(index+1).padStart(2,"0")}
</div>

<img
src={item.image}
alt={item.name}
className="cart-item-image"
/>

<div className="cart-item-info">

<div className="cart-item-name">
{item.name}
</div>

<div className="cart-item-size">
Stock disponible: {item.stock}
</div>

</div>

<div className="cart-qty">

<button
className="cart-qty-btn"
onClick={onDecrease}
>
−
</button>

<span className="cart-qty-number">
{item.qty}
</span>

<button
className="cart-qty-btn"
onClick={onIncrease}
>
+
</button>

</div>

<div className="cart-item-price">
{fmt(item.price)}
</div>

<button
className="cart-remove"
onClick={onRemove}
title="Eliminar"
>
✕
</button>

</div>

);

}