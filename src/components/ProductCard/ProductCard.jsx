import React, { useState } from "react";
import "./ProductCard.css";

export default function ProductCard({
  product,
  index,
  isFav,
  onToggleFav,
  onAddCart,
  onView,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`product-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className={`product-image ${hovered ? "zoom" : ""}`}
        />

        <span className="product-brand">
          {product.brand}
        </span>

        <button
          className={`favorite-btn ${isFav ? "active" : ""}`}
          onClick={onToggleFav}
        >
          {isFav ? "♥" : "♡"}
        </button>

        <span className="product-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="product-body">
        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-size">
          EU {product.size}
        </p>

        <p className="product-price">
          ${product.price.toLocaleString("es-MX")}
        </p>

        <div className="product-actions">
          <button
            className={`btn-cart ${hovered ? "hover" : ""}`}
            onClick={onAddCart}
          >
            + Carrito
          </button>

          <button
            className="btn-view"
            onClick={onView}
          >
            Ver →
          </button>
        </div>
      </div>
    </div>
  );
}