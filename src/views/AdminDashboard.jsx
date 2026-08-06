// import React from 'react';

// export default function AdminDashboard() {

//   const stats = [
//     { title: 'Ventas Totales', value: '$248,900', icon: '💰' },
//     { title: 'Pedidos', value: '1,248', icon: '📦' },
//     { title: 'Usuarios', value: '5,430', icon: '👥' },
//     { title: 'Productos', value: '326', icon: '👟' },
//   ];

//   return (
//     <div style={s.page}>

//       {/* Header */}
//       <header style={s.header}>
//         <div style={s.eyebrow}>— Administración</div>
//         <h1 style={s.title}>
//           Dashboard
//         </h1>
//         <p style={s.subtitle}>
//           Panel de control del e-commerce de tenis
//         </p>
//       </header>


//       {/* Cards estadísticas */}
//       <div style={s.statsGrid}>
//         {stats.map((item)=>(
//           <div key={item.title} style={s.statCard}>

//             <div style={s.statIcon}>
//               {item.icon}
//             </div>

//             <div>
//               <p style={s.statTitle}>
//                 {item.title}
//               </p>

//               <h2 style={s.statValue}>
//                 {item.value}
//               </h2>
//             </div>

//           </div>
//         ))}
//       </div>



//       <div style={s.contentGrid}>


//         {/* Acciones */}
//         <div style={s.card}>

//           <h3 style={s.cardTitle}>
//             Acciones rápidas
//           </h3>


//           <button style={s.primaryBtn}>
//             + Agregar producto
//           </button>


//           <button style={s.secondaryBtn}>
//             📦 Gestionar pedidos
//           </button>


//           <button style={s.secondaryBtn}>
//             ⚠ Alertas de stock
//           </button>


//           <button style={s.secondaryBtn}>
//             👥 Usuarios
//           </button>


//         </div>



//         {/* Estadisticas */}
//         <div style={s.cardLarge}>

//           <h3 style={s.cardTitle}>
//             Estadísticas de ventas
//           </h3>


//           <div style={s.chartBox}>

//             <div style={s.fakeChart}>
              
//               <div style={{height:'40%'}}></div>
//               <div style={{height:'70%'}}></div>
//               <div style={{height:'55%'}}></div>
//               <div style={{height:'90%'}}></div>
//               <div style={{height:'65%'}}></div>
//               <div style={{height:'100%'}}></div>

//             </div>


//             <div style={s.chartLabels}>
//               <span>Ene</span>
//               <span>Feb</span>
//               <span>Mar</span>
//               <span>Abr</span>
//               <span>May</span>
//               <span>Jun</span>
//             </div>

//           </div>


//         </div>


//       </div>


//       {/* Ultimos pedidos */}
//       <div style={s.cardBottom}>

//         <h3 style={s.cardTitle}>
//           Últimos pedidos
//         </h3>


//         <table style={s.table}>

//           <thead>
//             <tr>
//               <th>Cliente</th>
//               <th>Producto</th>
//               <th>Total</th>
//               <th>Status</th>
//             </tr>
//           </thead>


//           <tbody>

//             <tr>
//               <td>Juan Pérez</td>
//               <td>Nike Air Max</td>
//               <td>$2,499</td>
//               <td>
//                 <span style={s.status}>
//                   Enviado
//                 </span>
//               </td>
//             </tr>


//             <tr>
//               <td>Ana López</td>
//               <td>Adidas Ultraboost</td>
//               <td>$1,899</td>
//               <td>
//                 <span style={s.status}>
//                   Pendiente
//                 </span>
//               </td>
//             </tr>


//           </tbody>

//         </table>


//       </div>


//     </div>
//   );
// }




// const s={


// page:{
//   minHeight:'100vh',
//   background:'#0A0A0A',
//   color:'#F5F5F0',
//   padding:'40px',
//   fontFamily:'system-ui,sans-serif'
// },


// header:{
//   marginBottom:35
// },


// eyebrow:{
//   color:'#F0E040',
//   fontSize:11,
//   letterSpacing:'0.2em',
//   textTransform:'uppercase',
//   fontWeight:900
// },


// title:{
//   fontSize:48,
//   margin:0,
//   fontWeight:900,
//   textTransform:'uppercase',
//   letterSpacing:'-0.04em'
// },


// subtitle:{
//   color:'#666',
//   fontSize:14
// },



// statsGrid:{
//  display:'grid',
//  gridTemplateColumns:'repeat(4,1fr)',
//  gap:20,
//  marginBottom:30
// },


// statCard:{
//  background:'#111',
//  border:'1px solid #1E1E1E',
//  padding:'22px',
//  display:'flex',
//  alignItems:'center',
//  gap:15
// },


// statIcon:{
//  fontSize:30,
//  background:'#171717',
//  padding:12
// },


// statTitle:{
//  color:'#666',
//  fontSize:11,
//  textTransform:'uppercase',
//  letterSpacing:'0.15em',
//  margin:0
// },


// statValue:{
//  margin:5,
//  fontSize:28,
//  fontWeight:900
// },




// contentGrid:{
//  display:'grid',
//  gridTemplateColumns:'320px 1fr',
//  gap:20
// },


// card:{
//  background:'#111',
//  border:'1px solid #1E1E1E',
//  padding:25
// },


// cardLarge:{
//  background:'#111',
//  border:'1px solid #1E1E1E',
//  padding:25,
//  height:350
// },


// cardBottom:{
//  marginTop:25,
//  background:'#111',
//  border:'1px solid #1E1E1E',
//  padding:25
// },


// cardTitle:{
//  fontSize:13,
//  textTransform:'uppercase',
//  letterSpacing:'0.15em',
//  color:'#888',
//  marginBottom:20
// },



// primaryBtn:{
//  width:'100%',
//  padding:14,
//  background:'#F0E040',
//  border:'none',
//  fontWeight:900,
//  cursor:'pointer',
//  marginBottom:12,
//  textTransform:'uppercase'
// },


// secondaryBtn:{
//  width:'100%',
//  padding:14,
//  background:'transparent',
//  color:'#AAA',
//  border:'1px solid #292929',
//  marginBottom:12,
//  cursor:'pointer'
// },




// chartBox:{
//  height:'250px'
// },


// fakeChart:{
//  height:'200px',
//  display:'flex',
//  alignItems:'end',
//  gap:20,
//  borderBottom:'1px solid #333'
// },


// chartLabels:{
//  display:'flex',
//  justifyContent:'space-around',
//  color:'#555',
//  fontSize:11,
//  marginTop:10
// },



// table:{
//  width:'100%',
//  borderCollapse:'collapse',
//  color:'#AAA'
// },


// status:{
//  color:'#F0E040',
//  border:'1px solid #F0E040',
//  padding:'5px 10px',
//  fontSize:11,
//  textTransform:'uppercase'
// }

// }
import React from "react";
import {
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  ArrowUpRight
} from "lucide-react";


export default function AdminDashboard(){


const cards=[

{
title:"Ventas totales",
value:"$45,800",
percent:"+12.5%",
icon:<DollarSign size={22}/>
},

{
title:"Productos",
value:"250",
percent:"+8.2%",
icon:<Package size={22}/>
},

{
title:"Usuarios",
value:"1,240",
percent:"+15.4%",
icon:<Users size={22}/>
},

{
title:"Pedidos",
value:"86",
percent:"+5.6%",
icon:<ShoppingCart size={22}/>
}

];



const products=[

{
name:"Nike Air Max",
sales:120,
price:"$1800"
},

{
name:"Adidas Ultraboost",
sales:95,
price:"$2200"
},

{
name:"Jordan Retro",
sales:80,
price:"$3500"
}

];



return(

<div className="space-y-5">


{/* HEADER */}

<div className="
flex 
justify-between 
items-center
">


<div>

<h1 className="
text-3xl
font-black
text-gray-900
">

Dashboard

</h1>


<p className="
text-gray-500
text-sm
mt-1
">

Panel general de tu tienda de tenis

</p>


</div>



<button className="
bg-black
text-white
px-5
py-2
rounded-lg
text-sm
font-semibold
hover:scale-105
transition
">

+ Nuevo producto

</button>


</div>





{/* CARDS */}

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-4
">


{

cards.map((card,index)=>(


<div

key={index}

className="
bg-white
rounded-2xl
p-5
border
shadow-sm
hover:shadow-lg
transition-all
duration-300
"


>


<div className="
flex
justify-between
items-center
">


<div className="
bg-black
text-white
p-3
rounded-xl
">

{card.icon}

</div>



<div className="
flex
items-center
gap-1
text-green-600
text-xs
font-bold
">


<ArrowUpRight size={14}/>

{card.percent}


</div>


</div>




<p className="
text-gray-500
text-sm
mt-4
font-medium
">

{card.title}

</p>



<h2 className="
text-2xl
font-black
mt-1
">

{card.value}

</h2>



</div>


))


}


</div>







{/* ZONA PRINCIPAL */}


<div className="
grid
grid-cols-1
xl:grid-cols-3
gap-4
">





{/* GRAFICA */}


<div className="
xl:col-span-2
bg-white
rounded-2xl
p-5
border
shadow-sm
">


<div className="
flex
justify-between
items-center
mb-4
">


<h2 className="
text-lg
font-bold
">

Ventas recientes

</h2>


<span className="
text-gray-400
text-xs
">

Últimos 30 días

</span>


</div>




<div className="
h-52
rounded-2xl
bg-gray-100
flex
items-center
justify-center
">


<div className="
text-center
text-gray-400
">


<TrendingUp
size={40}
className="mx-auto mb-2"
/>



<p className="text-sm">

Gráfica de ventas

</p>


</div>


</div>



</div>









{/* PRODUCTOS */}


<div className="
bg-white
rounded-2xl
p-5
border
shadow-sm
">


<h2 className="
text-lg
font-bold
mb-4
">

Más vendidos

</h2>




<div className="
space-y-4
">


{

products.map((product,index)=>(


<div

key={index}

className="
flex
justify-between
items-center
border-b
pb-3
"


>


<div>


<p className="
font-bold
text-sm
">

{product.name}

</p>



<p className="
text-xs
text-gray-500
">

{product.sales} ventas

</p>


</div>




<p className="
font-black
text-sm
">

{product.price}

</p>


</div>


))


}


</div>


</div>



</div>









{/* PEDIDOS */}


<div className="
bg-black
text-white
rounded-2xl
p-5
flex
justify-between
items-center
">


<div>


<h2 className="
text-xl
font-black
">

Pedidos pendientes

</h2>


<p className="
text-gray-400
text-sm
mt-1
">

Revisa pedidos que necesitan atención

</p>


</div>




<div className="
text-4xl
font-black
">

24

</div>


</div>





</div>


)

}