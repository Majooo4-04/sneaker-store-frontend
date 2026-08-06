import React from "react";
import "../assets/css/Modal.css";

export default function Modal({
  open,
  title,
  children,
  onClose,
  onSave,
  saveText = "Guardar"
}) {

  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>{title}</h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">

          {children}

        </div>

        <div className="modal-footer">

          <button
            className="btn-cancel"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="btn-save"
            onClick={onSave}
          >
            {saveText}
          </button>

        </div>

      </div>

    </div>
  );

}