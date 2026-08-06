import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../components/ToastProvider';
import { obtenerFavoritos, eliminarFavorito } from '../services/favoritoService';
import { agregarProducto } from '../services/carritoService';
import { obtenerUsuario } from '../services/authService';

const fmt = (n) => '$' + Number(n).toLocaleString('es-MX');

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarFavoritos();
  }, []);

  const cargarFavoritos = async () => {
    try {
      setLoading(true);

      const usuario = obtenerUsuario();

      if (!usuario) {
        navigate('/login');
        return;
      }

      const data = await obtenerFavoritos(usuario.id_usuario);

      const mapeados = data.map((f) => ({
        favoritoId: f.id_favorito,
        id: f.producto.id_producto,
        name: f.producto.nombre,
        brand: f.producto.marca?.nombre || '',
        price: Number(f.producto.precio),
        size: f.producto.talla,
        image: f.producto.imagen,
        stock: f.producto.stock,
      }));

      setFavorites(mapeados);
    } catch (error) {
      console.log(error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (favoritoId) => {
    try {
      const item = favorites.find((p) => p.favoritoId === favoritoId);

      await eliminarFavorito(favoritoId);

      setFavorites((f) => f.filter((p) => p.favoritoId !== favoritoId));

      showToast({ icon: '♡', title: 'Eliminado de favoritos', sub: item?.name });
    } catch (error) {
      console.log(error);
      showToast({
        icon: '✕',
        title: 'Error',
        sub: error.response?.data?.mensaje || 'No se pudo eliminar',
      });
    }
  };

  const addToCart = async (product) => {
    try {
      const usuario = obtenerUsuario();

      await agregarProducto(usuario.id_usuario, product.id, 1);

      showToast({ icon: '✓', title: 'Agregado al carrito', sub: product.name });
    } catch (error) {
      console.log(error);
      showToast({
        icon: '✕',
        title: 'Error',
        sub: error.response?.data?.mensaje || 'No se pudo agregar el producto',
      });
    }
  };

  if (loading) {
    return (
      <div style={s.page}>
        <div style={s.header}>
          <div style={s.eyebrow}>— Mi lista</div>
          <h1 style={s.title}>Favoritos</h1>
        </div>
        <div style={s.empty}>
          <p style={s.emptyText}>Cargando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.eyebrow}>— Mi lista</div>
        <h1 style={s.title}>Favoritos</h1>
        <span style={s.count}>
          <span style={s.countNum}>{favorites.length}</span> guardados
        </span>
      </div>

      {favorites.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyIcon}>♡</div>
          <p style={s.emptyText}>No tienes favoritos guardados</p>
          <button onClick={() => navigate('/catalog')} style={s.emptyBtn}>Explorar catálogo →</button>
        </div>
      ) : (
        <div style={s.grid}>
          {favorites.map((product, idx) => (
            <FavCard
              key={product.favoritoId}
              product={product}
              index={idx}
              onRemove={() => remove(product.favoritoId)}
              onAddCart={() => addToCart(product)}
              onView={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FavCard({ product, index, onRemove, onAddCart, onView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...s.card, background: hovered ? '#111' : '#0A0A0A' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.imgWrap}>
        <img src={product.image} alt={product.name} style={{ ...s.img, transform: hovered ? 'scale(1.04)' : 'scale(1)' }} />
        {product.brand && <span style={s.brandTag}>{product.brand}</span>}
        <span style={s.cardNum} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <button onClick={onRemove} style={s.removeBtn} title="Quitar de favoritos">✕</button>
      </div>
      <div style={s.cardBody}>
        <div style={s.cardName}>{product.name}</div>
        <div style={s.cardSize}>EU {product.size}</div>
        <div style={s.cardPrice}>{fmt(product.price)}</div>
        <div style={s.cardActions}>
          <button onClick={onAddCart} style={{ ...s.cardBtnPrimary, background: hovered ? '#F0E040' : 'transparent', color: hovered ? '#0A0A0A' : '#888', borderColor: hovered ? '#F0E040' : '#2A2A2A' }}>+ Carrito</button>
          <button onClick={onView} style={s.cardBtnSecondary}>Ver →</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { background: '#0A0A0A', minHeight: 'calc(100vh - 56px)', color: '#F5F5F0', fontFamily: 'system-ui, sans-serif' },
  header: { padding: '48px 40px 32px', borderBottom: '1px solid #1E1E1E', display: 'flex', flexDirection: 'column', gap: 6 },
  eyebrow: { fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F0E040', fontWeight: 500 },
  title: { fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#F5F5F0', margin: 0, lineHeight: 1 },
  count: { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginTop: 4 },
  countNum: { color: '#F0E040', fontWeight: 900, fontSize: 14 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 1, background: '#1A1A1A', margin: '32px 40px' },
  card: { position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'background 0.18s' },
  imgWrap: { position: 'relative', overflow: 'hidden', height: 220, background: '#111' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease', filter: 'grayscale(15%)' },
  brandTag: { position: 'absolute', top: 10, left: 0, background: '#F0E040', color: '#0A0A0A', fontSize: 9, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px' },
  cardNum: { position: 'absolute', bottom: 6, right: 10, fontSize: 56, fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' },
  removeBtn: { position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: '1px solid #333', color: '#888', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' },
  cardBody: { padding: '16px 16px 18px', borderTop: '1px solid #1A1A1A', display: 'flex', flexDirection: 'column', gap: 4 },
  cardName: { fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#F5F5F0', lineHeight: 1.2 },
  cardSize: { fontSize: 10, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' },
  cardPrice: { fontSize: 22, fontWeight: 900, color: '#F5F5F0', letterSpacing: '-0.02em', marginTop: 4, marginBottom: 12 },
  cardActions: { display: 'flex', gap: 8 },
  cardBtnPrimary: { flex: 1, border: '1px solid #2A2A2A', padding: '10px 0', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s' },
  cardBtnSecondary: { background: 'transparent', border: '1px solid #2A2A2A', color: '#666', padding: '10px 14px', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 16 },
  emptyIcon: { fontSize: 48, color: '#222' },
  emptyText: { fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#333' },
  emptyBtn: { marginTop: 8, background: 'transparent', border: '1px solid #2A2A2A', color: '#888', padding: '10px 20px', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' },
};
