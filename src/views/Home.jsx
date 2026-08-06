

import React,{useState,useEffect} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {showToast} from '../components/ToastProvider';
import ContactForm from '../components/ContactForm';
import LocationMap from '../components/LocationMap';
import s,{GLOBAL_CSS} from './Home.styles';
import { obtenerProductos } from "../services/productoService";
import { obtenerUsuario } from "../services/authService";
import { agregarProducto } from '../services/carritoService';





const BANNER_MSGS=[
  'Envío gratis en compras superiores a $3,000',
  'Lanzamiento exclusivo — nuevas zapatillas urbanas',
  'Regalo sorpresa al completar tu primera orden'
];


const CONTACT_INFO={
  address:'Av. Insurgentes Sur 1234, Ciudad de México, México',
  phone:'+52 55 1234 add',
  phoneHref:'tel:+525512345678',
  email:'contacto@sneakerdrop.mx',
  emailHref:'mailto:contacto@sneakerdrop.mx'
};


const SOCIAL_LINKS=[
  {key:'ig',label:'IG',name:'Instagram',href:'https://instagram.com/sneakerdrop'},
  {key:'tw',label:'TW',name:'Twitter / X',href:'https://x.com/sneakerdrop'},
  {key:'fb',label:'FB',name:'Facebook',href:'https://facebook.com/sneakerdrop'},
  {key:'yt',label:'YT',name:'YouTube',href:'https://youtube.com/@sneakerdrop'}
];


export default function Home(){

const navigate=useNavigate();
const [featuredShoes, setFeaturedShoes] = useState([]);

const [bannerIdx,setBannerIdx]=useState(0);

useEffect(()=>{
  const id=setInterval(
    ()=>setBannerIdx(prev=>(prev+1)%BANNER_MSGS.length),
    3000
  );

  return()=>clearInterval(id);
},[]);

useEffect(() => {
  cargarProductos();
}, []);

const cargarProductos = async () => {
  try {
    const data = await obtenerProductos();
     console.log("Productos recibidos:", data);
     console.log("Campo imagen:", data[0].imagen);

      data.forEach((p, i) => {
      console.log(`Producto ${i} (${p.nombre}):`, p.imagen);
    });

    const productos = data.map((producto) => ({
      ...producto,
      imagen:
        producto.imagen && producto.imagen !== ""
          ? producto.imagen
          : "https://placehold.co/400x300?text=Sneaker"
    }));

    setFeaturedShoes(productos);

  } catch (error) {
    console.log(error);
  }
};

const [notification,setNotification]=useState(null);

useEffect(()=>{
  const t=setTimeout(()=>setNotification(true),3000);
  return()=>clearTimeout(t);
},[]);



const [newsletter,setNewsletter]=useState(false);
const [nlDismissed,setNlDismissed]=useState(false);

useEffect(()=>{
  if(nlDismissed)return;

  const t=setTimeout(()=>setNewsletter(true),8000);

  return()=>clearTimeout(t);

},[nlDismissed]);



const [favorites,setFavorites]=useState([]);


const toggleFav=(shoe)=>{

const isFav=favorites.includes(shoe.id_producto);

setFavorites(prev=>
  isFav
  ?prev.filter(f=>f!==shoe.id_producto)
  :[...prev,shoe.id_producto]
);


showToast({
  icon:isFav?'♡':'♥',
  title:isFav?'Eliminado de favoritos':'Guardado en favoritos',
  sub:shoe.nombre
});

};




const addToCart = async (shoe) => {
  try {
    const usuario = obtenerUsuario();

    if (!usuario) {
      navigate("/login");
      return;
    }

    await agregarProducto(usuario.id_usuario, shoe.id_producto, 1);
    window.dispatchEvent(new Event("cart-updated"));

    showToast({
      icon: "✓",
      title: "Agregado al carrito",
      sub: shoe.nombre,
    });
  } catch (error) {
    console.log(error);
    showToast({
      icon: "✕",
      title: "Error",
      sub: error.response?.data?.mensaje || "No se pudo agregar el producto",
    });
  }
};



return(

<div style={s.root}>

<style>{GLOBAL_CSS}</style>


{/* TICKER */}

<div style={s.ticker}>

<span style={s.tickerDot}/>

<span key={bannerIdx} style={{animation:'fadeIn 0.4s ease'}}>
{BANNER_MSGS[bannerIdx]}
</span>

</div>
{/* HERO */}

<section className="sd-hero">

<div style={s.heroLeft}>

<div style={s.heroEyebrow}>
— Nueva Colección 2026
</div>


<h1 style={s.heroTitle}>
El futuro<br/>
en tus <span style={s.heroAccent}>pies</span>
</h1>


<p style={s.heroSub}>
Ediciones limitadas y calzado de alto rendimiento.<br/>
Encuentra tu par antes de que se agote.
</p>


<div style={s.heroCtas}>

<button
onClick={()=>navigate('/catalog')}
style={s.ctaPrimary}
>
Ver Catálogo →
</button>


<button
onClick={()=>navigate('/catalog?filter=nuevo')}
style={s.ctaSecondary}
>
Novedades
</button>


</div>


</div>



<div className="sd-hero-img" style={s.heroRight}>


<img
src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
alt="Sneaker destacado"
style={s.heroImg}
/>


<div style={s.heroBadge}>
★ Top Sneakers 2026
</div>


<div style={s.heroWatermark} aria-hidden="true">
01
</div>


</div>


</section>





{/* PROMO STRIP */}

<div style={s.promoStrip}>


<div>

<div style={s.promoTitle}>
30% OFF en productos seleccionados
</div>


<div style={s.promoSub}>
Promoción válida hasta agotar existencias
</div>


</div>



<button
onClick={()=>navigate('/catalog')}
style={s.ctaPrimary}
>
Comprar ahora →
</button>


</div>





{/* LEADERBOARD */}

<div style={s.leaderboardWrap}>


<div style={s.adLabel}>
Publicidad
</div>



<div style={s.leaderboard}>


<img
src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
alt="Banner publicitario"
style={{
width:'100%',
height:'100%',
objectFit:'cover',
display:'block'
}}
/>


<div style={s.leaderboardOverlay}>


<span style={s.leaderboardTag}>
⚡ Oferta flash — 48 horas
</span>


<button
onClick={()=>navigate('/catalog')}
style={s.leaderboardCta}
>
Ver oferta →
</button>


</div>


</div>


</div>





{/* PRODUCTOS DESTACADOS */}

<section style={s.featured}>


<div style={s.sectionHeader}>


<div style={s.sectionEyebrow}>
— Temporada 2026
</div>


<h2 style={s.sectionTitle}>
Productos Destacados
</h2>


<p style={s.sectionSub}>
Los modelos más vendidos de la temporada
</p>


</div>




<div className="sd-content">


<div>


<div className="sd-grid">


{featuredShoes.map((shoe,idx)=>(


<ShoeCard

key={shoe.id_producto}

shoe={shoe}

index={idx}

isFav={favorites.includes(shoe.id_producto)}

onToggleFav={()=>toggleFav(shoe)}

onAddCart={()=>addToCart(shoe)}

onView={()=>navigate(`/product/${shoe.id_producto}`)}

/>


))}


</div>


</div>
{/* SIDEBAR PUBLICIDAD */}

{/* SIDEBAR PUBLICIDAD */}

<aside
  className="sd-sidebar"
  aria-label="Espacio publicitario"
>

  {/* Banner horizontal */}
  <div style={s.adLabel}>
    Publicidad
  </div>

  <div style={s.mrect}>

    <img
      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80"
      alt="Nike Air Max"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }}
    />

    <div style={s.mrectOverlay}>

      <div style={s.mrectTitle}>
        Nike Air Max 2026
      </div>

      <button
        style={s.mrectCta}
        onClick={() => window.open("https://www.nike.com", "_blank")}
      >
        Comprar →
      </button>

    </div>

  </div>



  {/* Banner vertical */}

  <div style={{ marginTop: 20 }}>

    <div style={s.adLabel}>
      Publicidad
    </div>

    <div style={s.halfpage}>

      <img
        src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&q=80"
        alt="Adidas Collection"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        }}
      />

      <div style={s.halfpageOverlay}>

        <div style={s.halfpageTitle}>
          Nueva colección Adidas
        </div>

        <div style={s.halfpageSub}>
          Hasta 40% OFF
        </div>

        <button
          style={s.mrectCta}
          onClick={() => window.open("https://www.adidas.com", "_blank")}
        >
          Ver colección →
        </button>

      </div>

    </div>

  </div>

</aside>


</div>


</section>





{/* CONTACTO */}


<section style={s.contactSection}>


<div style={s.sectionHeader}>


<div style={s.sectionEyebrow}>
— Estamos para ayudarte
</div>


<h2 style={s.sectionTitle}>
Contáctanos
</h2>


<p style={s.sectionSub}>
Escríbenos o visítanos en nuestra tienda
</p>


</div>




<div className="sd-contact-grid">


<ContactForm/>


<LocationMap/>


</div>


</section>





{/* FOOTER */}


<footer style={s.footer}>


<div 
className="sd-footer-grid" 
style={{marginBottom:40}}
>


<div 
style={{
display:'flex',
flexDirection:'column',
gap:14
}}
>


<div style={s.footerLogo}>


<span style={{color:'#F5F5F0'}}>
SNEAKER
</span>


<span style={{color:'#F0E040'}}>
DROP
</span>


</div>



<p style={s.footerDesc}>
Calzado de alto rendimiento y ediciones limitadas.<br/>
Encuentra tu próximo par.
</p>





<div style={s.footerContactList}>


<div style={s.footerContactItem}>

<span style={s.footerContactIcon}>
⚲
</span>

<span>
{CONTACT_INFO.address}
</span>

</div>




<div style={s.footerContactItem}>


<span style={s.footerContactIcon}>
☎
</span>


<a
href={CONTACT_INFO.phoneHref}
style={s.footerContactLink}
>
{CONTACT_INFO.phone}
</a>


</div>




<div style={s.footerContactItem}>


<span style={s.footerContactIcon}>
✉
</span>


<a
href={CONTACT_INFO.emailHref}
style={s.footerContactLink}
>
{CONTACT_INFO.email}
</a>


</div>


</div>
{/* REDES SOCIALES */}

<div style={{display:'flex',gap:10,marginTop:4}}>

{SOCIAL_LINKS.map(net=>(

<a
key={net.key}
href={net.href}
target="_blank"
rel="noopener noreferrer"
aria-label={net.name}
title={net.name}
style={s.socialBtn}
>
{net.label}
</a>

))}

</div>


</div>





{/* COLUMNAS FOOTER */}

{[
{
title:'Empresa',
links:['Nosotros','Careers','Blog','Prensa']
},
{
title:'Soporte',
links:['Centro de ayuda','Rastreo','Devoluciones']
}

].map(col=>(

<div
key={col.title}
style={{
display:'flex',
flexDirection:'column',
gap:12
}}
>


<div style={s.footerColTitle}>
{col.title}
</div>


{col.links.map(link=>(

<a
key={link}
href="#"
style={s.footerLink}
>
{link}
</a>

))}


</div>

))}




<div
style={{
display:'flex',
flexDirection:'column',
gap:12
}}
>


<div style={s.footerColTitle}>
Legal
</div>


<Link
to="/privacy"
style={s.footerLink}
>
Aviso de Privacidad
</Link>


<Link
to="/terms"
style={s.footerLink}
>
Términos de Uso
</Link>


<a
href="#"
style={s.footerLink}
>
Cookies
</a>


</div>



</div>





<div style={s.footerBottom}>


<span style={s.footerCopy}>
© 2026 SneakerDrop. Todos los derechos reservados.
</span>


<div style={{display:'flex',gap:20}}>


<Link
to="/privacy"
style={s.footerLink}
>
Privacidad
</Link>


<Link
to="/terms"
style={s.footerLink}
>
Términos
</Link>


<a
href="#"
style={s.footerLink}
>
Cookies
</a>


</div>


</div>


</footer>





{/* POPUP DROP */}
{notification && (
  <div
    style={s.notif}
    role="dialog"
    aria-label="Drop inminente"
  >
    <div style={s.notifHeader}>
      <span style={s.notifLabel}>
        ⚡ Drop inminente
      </span>

      <button
        onClick={() => setNotification(null)}
        style={s.notifClose}
      >
        ✕
      </button>
    </div>

    <p style={s.notifMsg}>
      Los nuevos Jordan Retro se agotan en menos de 5 minutos. ¡Revisa el catálogo ahora!
    </p>

    <button
      onClick={() => {
        setNotification(null);
        navigate('/catalog');
      }}
      style={s.notifCta}
    >
      Ir al Drop →
    </button>
  </div>
)}





{/* NEWSLETTER */}


{newsletter && (

<div
style={s.nlOverlay}
role="dialog"
aria-modal="true"
>


<div style={s.nlModal}>


<button
onClick={()=>{
setNewsletter(false);
setNlDismissed(true);
}}
style={s.nlClose}
>
✕
</button>



<div style={s.nlEyebrow}>
Acceso exclusivo
</div>


<h2 style={s.nlTitle}>
Sé el primero<br/>
en los drops
</h2>



<p style={s.nlSub}>
Suscríbete y recibe alertas de lanzamientos antes que nadie.
</p>



<div style={s.nlForm}>


<input
type="email"
placeholder="tu@email.com"
style={s.nlInput}
/>



<button
onClick={()=>{
setNewsletter(false);
setNlDismissed(true);

showToast({
icon:'✓',
title:'Suscrito',
sub:'Te avisamos en el próximo drop'
});

}}
style={s.ctaPrimary}
>
Suscribirse →
</button>


</div>




<button
onClick={()=>{
setNewsletter(false);
setNlDismissed(true);
}}
style={s.nlSkip}
>
No, gracias
</button>


</div>


</div>

)}


</div>

);

}





function ShoeCard({
shoe,
index,
isFav,
onToggleFav,
onAddCart,
onView
}){


const [hovered,setHovered]=useState(false);


return(

<div
style={{
...s.card,
background:hovered?'#111':'#0F0F0F'
}}

onMouseEnter={()=>setHovered(true)}

onMouseLeave={()=>setHovered(false)}

>


<div style={s.cardImgWrap}>


<img
src={shoe.imagen}
alt={shoe.nombre}
style={{
...s.cardImg,
transform:hovered?'scale(1.05)':'scale(1)'
}}
/>



<span style={s.cardBadge}>
Venta
</span>



<button
onClick={onToggleFav}
style={{
...s.favBtn,
color:isFav?'#F0E040':'#888'
}}
>
{isFav?'♥':'♡'}
</button>



<span style={s.cardNum}>
{String(index+1).padStart(2,'0')}
</span>


</div>




<div style={s.cardBody}>


<div style={s.cardMeta}>
{shoe.marca?.nombre}
</div>


<div style={s.cardName}>
{shoe.nombre}
</div>


<div style={s.cardPrice}>
{'$'+Number(shoe.precio).toLocaleString('es-MX')}
</div>



<div style={s.cardActions}>


<button
onClick={onAddCart}
style={{
...s.cardBtnPrimary,
background:hovered?'#F0E040':'#1A1A1A',
color:hovered?'#0A0A0A':'#F5F5F0',
borderColor:hovered?'#F0E040':'#2A2A2A'
}}
>
+ Agregar
</button>



<button
onClick={onView}
style={s.cardBtnSecondary}
>
Ver →
</button>



</div>


</div>


</div>

);

}