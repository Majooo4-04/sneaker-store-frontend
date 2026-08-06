import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProducto } from '../services/productoService';
import { agregarProducto } from '../services/carritoService';
import { obtenerFavoritos, agregarFavorito, eliminarFavorito } from '../services/favoritoService';
import { obtenerUsuario } from '../services/authService';
import { showToast } from '../components/ToastProvider';

const SIZE_GUIDE = [
  { eu: 40, us: 7, uk: 6, cm: '25.0' },
  { eu: 41, us: 8, uk: 7, cm: '26.0' },
  { eu: 42, us: 9, uk: 8, cm: '27.0' },
  { eu: 43, us: 10, uk: 9, cm: '28.0' },
  { eu: 44, us: 11, uk: 10, cm: '29.0' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartState, setCartState] = useState('idle'); // 'idle' | 'adding' | 'added'

  const [favoritoId, setFavoritoId] = useState(null); // null = no está en favoritos
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    cargarProducto();
    verificarFavorito();
  }, [id]);

  const cargarProducto = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await obtenerProducto(id);
      

      setProduct({
        id: data.id_producto,
        name: data.nombre,
        brand: data.marca?.nombre || 'Sin marca',
        description: data.descripcion,
        price: Number(data.precio),
        size: data.talla,
        image: data.imagen,
        stock: data.stock,
      });
    } catch (err) {
      console.log(err);
      setError('No se pudo cargar el producto.');
    } finally {
      setLoading(false);
    }
  };

  const verificarFavorito = async () => {
    try {
      const usuario = obtenerUsuario();
      if (!usuario) return;

      const favoritos = await obtenerFavoritos(usuario.id_usuario);
      const existe = favoritos.find((f) => f.id_producto === Number(id));

      setFavoritoId(existe ? existe.id_favorito : null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;

    try {
      setCartState('adding');

      const usuario = obtenerUsuario();

      if (!usuario) {
        navigate('/login');
        return;
      }

      await agregarProducto(usuario.id_usuario, product.id, 1);
      window.dispatchEvent(new Event("cart-updated"));

      setCartState('added');
      showToast({
        icon: '✓',
        title: 'Agregado al carrito',
        sub: product.name,
      });

      setTimeout(() => setCartState('idle'), 2000);
    } catch (err) {
      console.log(err);
      setCartState('idle');
      showToast({
        icon: '✕',
        title: 'Error',
        sub: err.response?.data?.mensaje || 'No se pudo agregar el producto',
      });
    }
  };

  const toggleFavorito = async () => {
    if (!product) return;

    try {
      setFavLoading(true);
      const usuario = obtenerUsuario();

      if (!usuario) {
        navigate('/login');
        return;
      }

      if (favoritoId) {
        await eliminarFavorito(favoritoId);
        setFavoritoId(null);
        showToast({ icon: '♡', title: 'Eliminado de favoritos', sub: product.name });
      } else {
        const data = await agregarFavorito(usuario.id_usuario, product.id);
        setFavoritoId(data.favorito.id_favorito);
        showToast({ icon: '♥', title: 'Guardado en favoritos', sub: product.name });
      }
    } catch (err) {
      console.log(err);
      showToast({
        icon: '✕',
        title: 'Error',
        sub: err.response?.data?.mensaje || 'No se pudo actualizar favoritos',
      });
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={s.root}>
        <div style={s.stateMsg}>Cargando producto...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={s.root}>
        <div style={s.stateMsg}>{error || 'Producto no encontrado'}</div>
        <button onClick={() => navigate('/catalog')} style={s.ctaSecondary}>
          ← Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div style={s.root}>
      <style>{GLOBAL_CSS}</style>

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div style={s.breadcrumb}>
        <span style={s.breadcrumbLink} onClick={() => navigate('/catalog')}>Catálogo</span>
        <span style={s.breadcrumbSep}>·</span>
        <span style={s.breadcrumbLink}>{product.brand}</span>
        <span style={s.breadcrumbSep}>·</span>
        <span style={s.breadcrumbCurrent}>{product.name}</span>
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <div className="pd-grid">

        {/* Imagen */}
        <div style={s.imgWrap}>
          <img
            src={product.image}
            alt={product.name}
            style={s.img}
          />
          <div style={s.stockBar}>
            <span style={s.stockLabel}>
              {product.stock > 0 ? 'Disponible' : 'Agotado'}
            </span>
            <span style={s.stockSep} />
            <span style={s.stockCount}>
              {product.stock > 0
                ? `${product.stock} en stock`
                : 'Sin stock'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={s.eyebrow}>— {product.brand}</div>
          <h1 style={s.title}>{product.name}</h1>

          {/* Precio */}
          <div style={s.priceRow}>
            <span style={s.price}>${product.price.toLocaleString('es-MX')}</span>
          </div>

          {/* Descripción */}
          {product.description && (
            <p style={s.description}>{product.description}</p>
          )}

          {/* Talla */}
          <div style={s.sizeSection}>
            <div style={s.sizeHeader}>
              <span style={s.sizeLabel}>Talla</span>
              <button onClick={() => setIsModalOpen(true)} style={s.guideBtn}>
                Guía de tallas
              </button>
            </div>
            <div style={s.sizeGrid}>
              <span style={{ ...s.sizeBtn, ...s.sizeBtnActive, cursor: 'default' }}>
                {product.size ?? '—'}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div style={s.ctaGroup}>
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || cartState === 'adding'}
              style={{
                ...s.ctaPrimary,
                ...(cartState === 'added' ? s.ctaAdded : {}),
                ...(product.stock <= 0 ? s.ctaDisabled : {}),
              }}
            >
              {product.stock <= 0
                ? 'Sin stock'
                : cartState === 'added'
                ? '✓ Agregado al carrito'
                : cartState === 'adding'
                ? 'Agregando...'
                : '+ Añadir al carrito'}
            </button>

            <button
              onClick={toggleFavorito}
              disabled={favLoading}
              style={{
                ...s.ctaSecondary,
                ...(favoritoId ? s.ctaSecondaryActive : {}),
              }}
            >
              {favoritoId ? '♥ En favoritos' : '♡ Guardar en favoritos'}
            </button>
          </div>

          {/* Beneficios */}
          <div style={s.benefits}>
            {[
              'Envío gratis en compras +$3,000',
              'Devolución gratuita en 30 días',
              'Producto original certificado',
            ].map((b) => (
              <div key={b} style={s.benefit}>
                <span style={s.benefitIcon}>✓</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal: Guía de tallas ───────────────────────────────────────── */}
      {isModalOpen && (
        <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <div style={s.modal}>
            <button onClick={() => setIsModalOpen(false)} style={s.modalClose} aria-label="Cerrar">✕</button>
            <div style={s.modalEyebrow}>Guía de tallas</div>
            <h3 style={s.modalTitle}>Tallas internacionales</h3>
            <p style={s.modalSub}>Medición del pie en centímetros</p>
            <table style={s.table}>
              <thead>
                <tr>
                  {['EU', 'US', 'UK', 'CM'].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.eu} style={String(product.size) === String(row.eu) ? s.trActive : {}}>
                    {[row.eu, row.us, row.uk, row.cm].map((val, i) => (
                      <td key={i} style={s.td}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setIsModalOpen(false)} style={s.modalCloseBtn}>
              Cerrar guía
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Global CSS (responsive) ──────────────────────────────────────────────
const GLOBAL_CSS = `
  .pd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }
  @media (max-width: 768px) {
    .pd-grid { grid-template-columns: 1fr; gap: 32px; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
  }
`;

// ─── Styles ───────────────────────────────────────────────────────────────
const s = {
  root: {
    background: '#0A0A0A',
    minHeight: '100vh',
    color: '#F5F5F0',
    fontFamily: 'system-ui, sans-serif',
    padding: '48px 5%',
  },

  stateMsg: { fontSize: 13, color: '#666', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20 },

  breadcrumb: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 },
  breadcrumbLink: { fontSize: 11, color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' },
  breadcrumbSep: { fontSize: 11, color: '#2A2A2A' },
  breadcrumbCurrent: { fontSize: 11, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' },

  // Imagen
  imgWrap: { position: 'relative', overflow: 'hidden', background: '#111', aspectRatio: '1/1' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(10%)' },
  stockBar: { position: 'absolute', bottom: 0, left: 0, right: 0, background: '#0A0A0A', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 },
  stockLabel: { fontSize: 10, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' },
  stockSep: { flex: 1, height: 1, background: '#1E1E1E' },
  stockCount: { fontSize: 10, fontWeight: 900, color: '#F0E040', letterSpacing: '0.08em' },

  // Info
  eyebrow: { fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F0E040', fontWeight: 900, marginBottom: 12 },
  title: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#F5F5F0', margin: '0 0 16px', lineHeight: 0.96 },

  priceRow: { display: 'flex', alignItems: 'baseline', gap: 12, margin: '0 0 20px' },
  price: { fontSize: 28, fontWeight: 900, color: '#F5F5F0', letterSpacing: '-0.02em' },

  description: { fontSize: 13, color: '#888', lineHeight: 1.6, marginBottom: 24 },

  // Tallas
  sizeSection: { borderTop: '1px solid #1E1E1E', paddingTop: 24 },
  sizeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sizeLabel: { fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F5F5F0' },
  guideBtn: { background: 'none', border: 'none', color: '#555', fontSize: 11, fontFamily: 'inherit', cursor: 'pointer', textDecoration: 'underline', letterSpacing: '0.06em' },
  sizeGrid: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  sizeBtn: { width: 48, height: 48, border: '1px solid #2A2A2A', background: '#1A1A1A', color: '#F5F5F0', fontSize: 12, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  sizeBtnActive: { background: '#F0E040', color: '#0A0A0A', borderColor: '#F0E040' },

  // CTAs
  ctaGroup: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 },
  ctaPrimary: { background: '#F0E040', color: '#0A0A0A', border: 'none', padding: 16, width: '100%', fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' },
  ctaAdded: { background: '#1A1A1A', color: '#F0E040', border: '1px solid #F0E040' },
  ctaDisabled: { opacity: 0.4, cursor: 'not-allowed' },
  ctaSecondary: { background: 'transparent', border: '1px solid #2A2A2A', color: '#888', padding: 14, width: '100%', fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' },
  ctaSecondaryActive: { color: '#F0E040', borderColor: '#F0E040' },

  // Beneficios
  benefits: { borderTop: '1px solid #1E1E1E', marginTop: 28, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 },
  benefit: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#555' },
  benefitIcon: { color: '#F0E040', fontSize: 12, flexShrink: 0 },

  // Modal
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modal: { position: 'relative', background: '#0F0F0F', border: '1px solid #2A2A2A', padding: '32px', width: '100%', maxWidth: 380 },
  modalClose: { position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, fontFamily: 'inherit' },
  modalEyebrow: { fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F0E040', marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#F5F5F0', margin: '0 0 4px' },
  modalSub: { fontSize: 12, color: '#555', margin: '0 0 0' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13, margin: '20px 0 28px' },
  th: { fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555', padding: '8px 0', borderBottom: '1px solid #1E1E1E', textAlign: 'left' },
  td: { padding: '10px 0', borderBottom: '1px solid #1A1A1A', color: '#F5F5F0' },
  trActive: { background: 'rgba(240,224,64,0.06)' },
  modalCloseBtn: { background: 'transparent', border: '1px solid #2A2A2A', color: '#888', padding: 12, width: '100%', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' },
};
