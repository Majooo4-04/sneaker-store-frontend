import React from "react";
import "./Accordion.css";

export default function Accordion({
  title,
  isOpen,
  onToggle,
  children,
}) {
  return (
    <div className="accordion">

      <button
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">
          {title}
        </span>

        <span
          className={`accordion-icon ${
            isOpen ? "open" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="accordion-body">
          {children}
        </div>
      )}

    </div>
  );
}