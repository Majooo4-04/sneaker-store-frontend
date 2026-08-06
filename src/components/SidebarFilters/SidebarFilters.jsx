import React from "react";
import Accordion from "../Accordion/Accordion";
import "./SidebarFilters.css";

export default function SidebarFilters({
  searchTerm,
  setSearchTerm,
  maxPrice,
  setMaxPrice,
  openSections,
  toggleSection,
}) {
  return (
    <aside className="sidebar">

      <div className="sidebar-label">
        Filtros
      </div>

      <Accordion
        title="Buscar"
        isOpen={openSections.search}
        onToggle={() => toggleSection("search")}
      >
        <input
          type="text"
          className="search-input"
          placeholder="Nombre, color o precio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Accordion>

      <Accordion
        title="Precio máximo"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="price-value">
          ${maxPrice.toLocaleString("es-MX")}
        </div>

        <input
          type="range"
          className="price-range"
          min={1000}
          max={3000}
          step={100}
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
        />

        <div className="price-labels">
          <span>$1,000</span>
          <span>$3,000</span>
        </div>
      </Accordion>

    </aside>
  );
}