import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../components/ToastProvider";
import "../assets/css/Checkout.css";

import {
  crearPedido
} from "../services/pedidoService";

import {
  obtenerCarrito
} from "../services/carritoService";

import {
  obtenerUsuario
} from "../services/authService";



const STEPS = ['Envío', 'Pago', 'Confirmación'];

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ name: '', email: '', address: '', city: '', zip: '', country: 'México' });
  const [payment, setPayment] = useState({ card: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const [pedido, setPedido] = useState(null);

  useEffect(() => {

    cargarCarrito();

  }, []);

  const cargarCarrito = async () => {

    try {

      const usuario = obtenerUsuario();

      const carrito = await obtenerCarrito(
        usuario.id_usuario
      );

      const productos = carrito.detalles.map(item => ({

        id: item.id_producto,

        name: item.producto.nombre,

        brand: "",

        price: Number(item.precio_unitario),

        qty: item.cantidad,

        image: item.producto.imagen,

        size: item.producto.talla,

        stock: item.producto.stock

      }));

      setOrderItems(productos);

    } catch (error) {

      console.log(error);

    }

  };

  const subtotal = orderItems.reduce(

    (a, item) =>

      a + item.price * item.qty,

    0

  );
  const shippingCost = subtotal >= 3000 ? 0 : 350;
  const total = subtotal + shippingCost;
  const fmt = (n) => '$' + n.toLocaleString('es-MX');

  const setS = (field) => (e) => setShipping((f) => ({ ...f, [field]: e.target.value }));
  const setP = (field) => (e) => {
    let v = e.target.value;
    if (field === 'card') v = v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (field === 'expiry') v = v.replace(/\D/g, '').slice(0, 4).replace(/^(.{2})(.+)/, '$1/$2');
    if (field === 'cvv') v = v.replace(/\D/g, '').slice(0, 4);
    setPayment((f) => ({ ...f, [field]: v }));
  };

  const validateShipping = () => {
    const e = {};
    if (!shipping.name.trim()) e.name = 'Requerido';
    if (!shipping.email.includes('@')) e.email = 'Email inválido';
    if (!shipping.address.trim()) e.address = 'Requerido';
    if (!shipping.city.trim()) e.city = 'Requerido';
    if (!shipping.zip.trim()) e.zip = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    if (payment.card.replace(/\s/g, '').length < 16) e.card = 'Número inválido';
    if (!payment.name.trim()) e.name = 'Requerido';
    if (payment.expiry.length < 5) e.expiry = 'Fecha inválida';
    if (payment.cvv.length < 3) e.cvv = 'CVV inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !validatePayment()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const placeOrder = async () => {

    try {

      setPlacing(true);

      const usuario = obtenerUsuario();

      const response = await crearPedido(
        usuario.id_usuario
      );

      setPedido(response.pedido);

      setPlacing(false);

      setStep(2);

      showToast({

        icon: "✓",

        title: "Pedido realizado",

        sub: "Gracias por tu compra"

      });

    } catch (error) {

      console.log(error);

      setPlacing(false);

      showToast({

        icon: "✕",

        title: "Error",

        sub: error.response?.data?.mensaje || "No fue posible crear el pedido"

      });

    }

  };

  return (
    <div className="root">

      {/* Header */}
      <div className="header">
        <div className="eyebrow">— Finalizar compra</div>
        <h1 className="title">Checkout</h1>
      </div>

      {/* Stepper */}
      <div className="stepper">
        {STEPS.map((label, idx) => (
          <React.Fragment key={label}>
            <div className="step-item">
              <div
                className="step-dot"
                style={{
                  background: idx <= step ? '#F0E040' : 'transparent',
                  borderColor: idx <= step ? '#F0E040' : '#333',
                  color: idx <= step ? '#0A0A0A' : '#444',
                }}
              >
                {idx < step ? '✓' : idx + 1}
              </div>
              <span className="step-label" style={{ color: idx <= step ? '#F0E040' : '#444' }}>{label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className="step-line" style={{ background: idx < step ? '#F0E040' : '#1E1E1E' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="layout">

        {/* Left — form area */}
        <div className="form-area">

          {/* STEP 0 — Envío */}
          {step === 0 && (
            <div className="form-card">
              <div className="form-title">Datos de envío</div>
              <div className="form-grid-2">
                <Field label="Nombre completo" error={errors.name}>
                  <input className={inputClass(errors.name)} value={shipping.name} onChange={setS('name')} placeholder="Juan García" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input className={inputClass(errors.email)} type="email" value={shipping.email} onChange={setS('email')} placeholder="juan@email.com" />
                </Field>
              </div>
              <Field label="Dirección" error={errors.address}>
                <input className={inputClass(errors.address)} value={shipping.address} onChange={setS('address')} placeholder="Av. Reforma 123, Col. Centro" />
              </Field>
              <div className="form-grid-3">
                <Field label="Ciudad" error={errors.city}>
                  <input className={inputClass(errors.city)} value={shipping.city} onChange={setS('city')} placeholder="Ciudad de México" />
                </Field>
                <Field label="C.P." error={errors.zip}>
                  <input className={inputClass(errors.zip)} value={shipping.zip} onChange={setS('zip')} placeholder="06600" />
                </Field>
                <Field label="País">
                  <select className={inputClass()} value={shipping.country} onChange={setS('country')}>
                    <option>México</option>
                    <option>Colombia</option>
                    <option>Argentina</option>
                    <option>España</option>
                  </select>
                </Field>
              </div>

              {/* Shipping method */}
              <div className="form-title-2">Método de envío</div>
              <div className="ship-methods">
                {[
                  { id: 'std', label: 'Estándar', sub: '5–7 días hábiles', price: shippingCost === 0 ? 'Gratis' : fmt(350) },
                  { id: 'exp', label: 'Express', sub: '1–2 días hábiles', price: fmt(650) },
                ].map((m) => (
                  <div key={m.id} className="ship-method" style={{ borderColor: m.id === 'std' ? '#F0E040' : '#1E1E1E' }}>
                    <div className="ship-radio">
                      <div className="radio-dot" style={{ background: m.id === 'std' ? '#F0E040' : 'transparent', borderColor: m.id === 'std' ? '#F0E040' : '#444' }} />
                      <div>
                        <div className="ship-label">{m.label}</div>
                        <div className="ship-sub">{m.sub}</div>
                      </div>
                    </div>
                    <span className={`ship-price ${m.price === 'Gratis' ? 'ship-price-free' : 'ship-price-normal'}`}>{m.price}</span>
                  </div>
                ))}
              </div>

              <button onClick={nextStep} className="btn-primary">Continuar al pago →</button>
            </div>
          )}

          {/* STEP 1 — Pago */}
          {step === 1 && (
            <div className="form-card">
              <div className="form-title">Datos de pago</div>

              {/* Card type icons */}
              <div className="card-icons">
                {['VISA', 'MC', 'AMEX'].map((b) => (
                  <div key={b} className="card-icon">{b}</div>
                ))}
              </div>

              <Field label="Número de tarjeta" error={errors.card}>
                <input className={inputClass(errors.card)} value={payment.card} onChange={setP('card')} placeholder="0000 0000 0000 0000" maxLength={19} />
              </Field>
              <Field label="Nombre en la tarjeta" error={errors.name}>
                <input className={inputClass(errors.name)} value={payment.name} onChange={setP('name')} placeholder="JUAN GARCIA" />
              </Field>
              <div className="form-grid-2">
                <Field label="Vencimiento" error={errors.expiry}>
                  <input className={inputClass(errors.expiry)} value={payment.expiry} onChange={setP('expiry')} placeholder="MM/AA" maxLength={5} />
                </Field>
                <Field label="CVV" error={errors.cvv}>
                  <input className={inputClass(errors.cvv)} value={payment.cvv} onChange={setP('cvv')} placeholder="123" maxLength={4} type="password" />
                </Field>
              </div>

              <div className="sec-note">
                🔒 Pago 100% seguro con encriptación SSL
              </div>

              <div className="btn-row">
                <button onClick={() => { setStep(0); setErrors({}); }} className="btn-secondary">← Volver</button>
                <button onClick={placeOrder} className="btn-primary flex-1" disabled={placing}>
                  {placing ? 'Procesando...' : `Pagar ${fmt(total)} →`}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Confirmación */}
          {step === 2 && (
            <div className="confirm">
              <div className="confirm-icon">✓</div>
              <div className="confirm-title">¡Pedido confirmado!</div>
              <div className="confirm-sub">

                Pedido #

                {pedido?.id_pedido}

              </div>
              <p className="confirm-msg">
                Te enviamos un correo a <span className="confirm-highlight">{shipping.email || 'tu email'}</span> con el detalle de tu compra y el número de seguimiento.
              </p>
              <div className="confirm-items">
                {orderItems.map((item) => (
                  <div key={item.id} className="confirm-item">
                    <img src={item.image} alt={item.name} className="confirm-item-img" />
                    <div>
                      <div className="confirm-item-name">{item.name}</div>
                      <div className="confirm-item-meta">EU {item.size} · x{item.qty}</div>
                    </div>
                    <div className="confirm-item-price">{fmt(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>
              <button

                className="btn-primary"

                onClick={() => navigate("/orders")}

              >

                Ver mis pedidos →

              </button>
            </div>
          )}
        </div>

        {/* Right — order summary */}
        {step < 2 && (
          <div className="summary">
            <div className="summary-title">Tu pedido</div>

            {orderItems.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} className="summary-item-img" />
                <div style={{ flex: 1 }}>
                  <div className="summary-item-brand">{item.brand}</div>
                  <div className="summary-item-name">{item.name}</div>
                  <div className="summary-item-meta">EU {item.size} · x{item.qty}</div>
                </div>
                <div className="summary-item-price">{fmt(item.price * item.qty)}</div>
              </div>
            ))}

            <div className="summary-divider" />

            <div className="summary-row">
              <span className="summary-key">Subtotal</span>
              <span className="summary-val">{fmt(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-key">Envío</span>
              <span className={shippingCost === 0 ? 'summary-free' : 'summary-val'}>
                {shippingCost === 0 ? 'Gratis' : fmt(shippingCost)}
              </span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span className="summary-total-label">Total</span>
              <span className="summary-total-num">{fmt(total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Field wrapper ─────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div className="field-wrapper">
      <div className="field-label">{label}</div>
      {React.cloneElement(children, {
        onFocus: (e) => { e.target.style.borderColor = '#F0E040'; },
        onBlur: (e) => { e.target.style.borderColor = error ? '#8B2020' : '#1E1E1E'; },
      })}
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}

const inputClass = (err) => `input${err ? ' input-error' : ''}`;
