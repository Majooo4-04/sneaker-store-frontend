import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Fuse from "fuse.js";
import { showToast } from "../components/ToastProvider";
import { obtenerProductos } from "../services/productoService";
import { agregarProducto } from "../services/carritoService";
import { obtenerFavoritos, agregarFavorito, eliminarFavorito } from "../services/favoritoService";
import { obtenerUsuario } from "../services/authService";
import "../assets/css/Catalog.css";
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
      <rect width='100%' height='100%' fill='#151515'/>
      <text x='50%' y='50%' fill='#3a3a3a' font-size='14' font-family='sans-serif' text-anchor='middle' dominant-baseline='middle'>Sin imagen</text>
    </svg>`
  );


export default function Catalog() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brandParam = searchParams.get("brand");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(brandParam || "All");
  const [maxPrice, setMaxPrice] = useState(5000);

  // ── Favoritos reales: mapa id_producto -> id_favorito ──
  const [favMap, setFavMap] = useState({});

  // ── Cargar productos del backend ──────────────────────
  useEffect(() => {
    cargarProductos();
    cargarFavoritos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await obtenerProductos();

      const mapeados = data
        .filter((p) => p.activo !== false)
        .map((p) => ({
          id: p.id_producto,
          name: p.nombre,
          brand: p.marca?.nombre || "Sin marca",
          price: Number(p.precio),
          size: p.talla,
          image: p.imagen, // URL completa, se usa directo
          stock: p.stock,
        }));

      setProducts(mapeados);

      // Ajusta el rango máximo del slider al precio más alto real
      if (mapeados.length > 0) {
        const max = Math.max(...mapeados.map((p) => p.price));
        setMaxPrice(Math.ceil(max / 100) * 100);
      }
    } catch (err) {
      console.log(err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  const cargarFavoritos = async () => {
    try {
      const usuario = obtenerUsuario();
      if (!usuario) return;

      const data = await obtenerFavoritos(usuario.id_usuario);

      const mapa = {};
      data.forEach((f) => {
        mapa[f.id_producto] = f.id_favorito;
      });

      setFavMap(mapa);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSelectedBrand(brandParam || "All");
  }, [brandParam]);

  // ── Marcas dinámicas según lo que llegó del backend ───
  const brands = useMemo(() => {
    const unicas = [...new Set(products.map((p) => p.brand))];
    return ["All", ...unicas];
  }, [products]);

  const priceCeiling = useMemo(() => {
    if (products.length === 0) return 5000;
    return Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100;
  }, [products]);

  // ── Fuse.js: busca por nombre y marca ─────────────────
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name", "brand"],
      threshold: 0.3,
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = searchTerm
      ? fuse.search(searchTerm).map((item) => item.item)
      : products;

    return result.filter(
      (product) =>
        (selectedBrand === "All" || product.brand === selectedBrand) &&
        product.price <= maxPrice
    );
  }, [searchTerm, selectedBrand, maxPrice, products, fuse]);

  const toggleFav = async (product) => {
    try {
      const usuario = obtenerUsuario();

      if (!usuario) {
        navigate("/login");
        return;
      }

      const favoritoId = favMap[product.id];

      if (favoritoId) {
        await eliminarFavorito(favoritoId);

        setFavMap((prev) => {
          const copia = { ...prev };
          delete copia[product.id];
          return copia;
        });

        showToast({
          icon: "♡",
          title: "Eliminado de favoritos",
          sub: product.name,
        });
      } else {
        const data = await agregarFavorito(usuario.id_usuario, product.id);

        setFavMap((prev) => ({
          ...prev,
          [product.id]: data.favorito.id_favorito,
        }));

        showToast({
          icon: "♥",
          title: "Guardado en favoritos",
          sub: product.name,
        });
      }
    } catch (err) {
      console.log(err);
      showToast({
        icon: "✕",
        title: "Error",
        sub: err.response?.data?.mensaje || "No se pudo actualizar favoritos",
      });
    }
  };

  const addToCart = async (product) => {
    try {
      const usuario = obtenerUsuario();

      if (!usuario) {
        navigate("/login");
        return;
      }

      await agregarProducto(usuario.id_usuario, product.id, 1);
      window.dispatchEvent(new Event("cart-updated"));
       
      showToast({
        icon: "✓",
        title: "Agregado al carrito",
        sub: product.name,
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

  return (
    <div className="catalog-root">
      <section className="catalog-hero">
        <div className="hero-eyebrow">— Temporada 2026</div>
        <h1 className="hero-title">
          Sneaker
          <br />
          <span>Collection</span>
        </h1>
        <p className="hero-sub">Encuentra los modelos más exclusivos</p>
        <div className="hero-bg">SC</div>
      </section>

      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <div className="sidebar-label">Filtros</div>

          <div className="filter-group">
            <div className="filter-title">Buscar</div>
            <input
              className="search-input"
              type="text"
              placeholder="Nombre o marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="filter-title">Marca</div>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={selectedBrand === b ? "brand-btn active" : "brand-btn"}
              >
                {b === "All" ? "Todas" : b}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <div className="filter-title">Precio máx.</div>
            <div className="price-value">${maxPrice.toLocaleString("es-MX")}</div>
            <input
              className="price-range"
              type="range"
              min="0"
              max={priceCeiling}
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="price-labels">
              <span>$0</span>
              <span>${priceCeiling.toLocaleString("es-MX")}</span>
            </div>
          </div>
        </aside>

        <main className="catalog-area">
          <div className="catalog-header">
            <span className="catalog-title">Catálogo</span>
            <span className="catalog-count">
              <span>{filteredProducts.length}</span> productos
            </span>
          </div>

          {loading ? (
            <div className="empty">Cargando productos...</div>
          ) : error ? (
            <div className="empty">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty">Sin resultados</div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isFav={Boolean(favMap[product.id])}
                  onToggleFav={() => toggleFav(product)}
                  onAddCart={() => addToCart(product)}
                  onView={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ProductCard({ product, index, isFav, onToggleFav, onAddCart, onView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={hovered ? "product-card hovered" : "product-card"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-image">
        <img
          src={product.image || FALLBACK_IMG}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMG;
          }}
        />
        <span className="brand-tag">{product.brand}</span>
        <button
          className={isFav ? "fav-btn active" : "fav-btn"}
          onClick={onToggleFav}
        >
          {isFav ? "♥" : "♡"}
        </button>
        <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="card-body">
        <div className="card-name">{product.name}</div>
        <div className="card-size">EU {product.size}</div>
        <div className="card-price">${product.price.toLocaleString("es-MX")}</div>

        <div className="card-actions">
          <button className="btn-cart" onClick={onAddCart}>
            + Carrito
          </button>
          <button className="btn-view" onClick={onView}>
            Ver →
          </button>
        </div>
      </div>
    </div>
  );
}
