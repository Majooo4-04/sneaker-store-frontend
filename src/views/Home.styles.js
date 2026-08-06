// ─── Estilos globales inyectados una sola vez (media queries, animaciones) ─
export const GLOBAL_CSS = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ticker { 0%,100%{opacity:1} 40%,60%{opacity:0} }

  .sd-hero        { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; padding: 64px 5%; border-bottom: 1px solid #1E1E1E; }
  .sd-grid        { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1px; background: #1A1A1A; }
  .sd-content     { display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: start; }
  .sd-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
  .sd-cat-bar     { display: flex; gap: 8px; flex-wrap: wrap; }
  .sd-contact-grid{ display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }

  @media (max-width: 1100px) {
    .sd-content     { grid-template-columns: 1fr; }
    .sd-sidebar     { display: none; }
  }
  @media (max-width: 768px) {
    .sd-hero        { grid-template-columns: 1fr; }
    .sd-hero-img    { display: none; }
    .sd-footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
    .sd-grid        { grid-template-columns: 1fr 1fr; }
    .sd-contact-grid{ grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .sd-footer-grid { grid-template-columns: 1fr; }
    .sd-grid        { grid-template-columns: 1fr; }
    .sd-cat-bar     { gap: 6px; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;

const s = {
  root: { background: '#0A0A0A', minHeight: '100vh', color: '#F5F5F0', fontFamily: 'system-ui, sans-serif' },

  // Ticker
  ticker: { background: '#F0E040', color: '#0A0A0A', textAlign: 'center', padding: '9px 16px', fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 },
  tickerDot: { width: 6, height: 6, borderRadius: '50%', background: '#0A0A0A', flexShrink: 0 },

  // Category bar
  catBar: { background: '#0F0F0F', borderBottom: '1px solid #1E1E1E', padding: '12px 5%', display: 'flex', alignItems: 'center', overflowX: 'auto' },
  catBtn: { border: '1px solid #2A2A2A', padding: '7px 16px', fontSize: 10, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.15s' },

  // Hero
  heroLeft: { display: 'flex', flexDirection: 'column', gap: 0 },
  heroEyebrow: { fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F0E040', fontWeight: 500, marginBottom: 14 },
  heroTitle: { fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.94, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#F5F5F0', margin: '0 0 20px' },
  heroAccent: { color: '#F0E040' },
  heroSub: { fontSize: 14, color: '#555', lineHeight: 1.7, letterSpacing: '0.02em', marginBottom: 32 },
  heroCtas: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  heroRight: { position: 'relative' },
  heroImg: { width: '100%', height: 320, objectFit: 'cover', display: 'block', filter: 'grayscale(10%)' },
  heroBadge: { position: 'absolute', bottom: 14, left: 14, background: '#F0E040', color: '#0A0A0A', fontSize: 10, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 12px' },
  heroWatermark: { position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', fontSize: 120, fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none' },

  // CTAs
  ctaPrimary: { background: '#F0E040', color: '#0A0A0A', border: 'none', padding: '13px 22px', fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' },
  ctaSecondary: { background: 'transparent', color: '#888', border: '1px solid #2A2A2A', padding: '13px 22px', fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' },

  // Promo strip
  promoStrip: { background: '#0F0F0F', borderTop: '1px solid #1E1E1E', borderBottom: '1px solid #1E1E1E', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 5%', gap: 24, flexWrap: 'wrap' },
  promoTitle: { fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#F5F5F0', marginBottom: 4 },
  promoSub: { fontSize: 11, color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase' },

  // Leaderboard 728×90
  leaderboardWrap: { padding: '20px 5% 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  adLabel: { fontSize: 10, color: '#333', textAlign: 'center', marginBottom: 4, letterSpacing: '.05em', textTransform: 'uppercase' },
  leaderboard: { position: 'relative', width: '100%', maxWidth: 728, height: 90, overflow: 'hidden', border: '1px solid #1E1E1E' },
  leaderboardOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' },
  leaderboardTag: { fontSize: 12, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F0E040' },
  leaderboardCta: { background: '#F0E040', color: '#0A0A0A', border: 'none', padding: '8px 18px', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' },

  // Featured section
  featured: { padding: '40px 5% 64px' },
  sectionHeader: { marginBottom: 32 },
  sectionEyebrow: { fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F0E040', fontWeight: 500, marginBottom: 10 },
  sectionTitle: { fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em', color: '#F5F5F0', margin: '0 0 8px' },
  sectionSub: { fontSize: 13, color: '#444', letterSpacing: '0.05em', textTransform: 'uppercase' },

  // Cards
  card: { overflow: 'hidden', cursor: 'pointer', transition: 'background 0.18s' },
  cardImgWrap: { position: 'relative', overflow: 'hidden', height: 220, background: '#111' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease', filter: 'grayscale(15%)' },
  cardBadge: { position: 'absolute', top: 10, left: 0, background: '#F0E040', color: '#0A0A0A', fontSize: 9, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px' },
  favBtn: { position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: '1px solid #333', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', transition: 'color 0.15s' },
  cardNum: { position: 'absolute', bottom: 6, right: 10, fontSize: 56, fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' },
  cardBody: { padding: '16px 16px 18px', borderTop: '1px solid #1A1A1A', display: 'flex', flexDirection: 'column', gap: 4 },
  cardMeta: { fontSize: 10, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' },
  cardName: { fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#F5F5F0', marginTop: 2 },
  cardPrice: { fontSize: 22, fontWeight: 900, color: '#F5F5F0', letterSpacing: '-0.02em', marginTop: 4, marginBottom: 12 },
  cardActions: { display: 'flex', gap: 8 },
  cardBtnPrimary: { flex: 1, border: '1px solid #2A2A2A', padding: '10px 0', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s' },
  cardBtnSecondary: { background: 'transparent', border: '1px solid #2A2A2A', color: '#666', padding: '10px 14px', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' },

  // Sidebar banners
  mrect: { position: 'relative', width: '100%', height: 250, overflow: 'hidden', border: '1px solid #1E1E1E' },
  mrectOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 16, gap: 10 },
  mrectTitle: { fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#F5F5F0' },
  mrectCta: { background: '#F0E040', color: '#0A0A0A', border: 'none', padding: '8px 14px', fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start' },
  halfpage: { position: 'relative', width: '100%', height: 600, overflow: 'hidden', border: '1px solid #1E1E1E' },
  halfpageOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 20, gap: 8 },
  halfpageTitle: { fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#F5F5F0' },
  halfpageSub: { fontSize: 14, fontWeight: 700, color: '#F0E040', marginBottom: 8 },

  // ── Contáctanos (formulario + mapa) ───────────────────────────────────
  contactSection: { padding: '64px 5%', borderTop: '1px solid #1E1E1E', background: '#0C0C0C' },
  contactForm: { display: 'flex', flexDirection: 'column', gap: 14 },
  formLabel: { fontSize: 10, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: 6, display: 'block' },
  formInput: { width: '100%', background: '#161616', border: '1px solid #2A2A2A', color: '#F5F5F0', padding: '12px 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' },
  formTextarea: { width: '100%', background: '#161616', border: '1px solid #2A2A2A', color: '#F5F5F0', padding: '12px 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical', minHeight: 120, boxSizing: 'border-box' },
  formError: { fontSize: 11, color: '#F0604A', marginTop: 4 },
  formRow: { display: 'flex', flexDirection: 'column' },

  mapWrap: { position: 'relative', width: '100%', height: '100%', minHeight: 360, border: '1px solid #1E1E1E', overflow: 'hidden' },
  mapIframe: { width: '100%', height: '100%', minHeight: 360, border: 0, filter: 'grayscale(60%) invert(92%) contrast(90%)', display: 'block' },
  mapCaption: { display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12 },
  mapAddress: { fontSize: 13, color: '#CCC', fontWeight: 600 },
  mapLink: { fontSize: 11, color: '#F0E040', textDecoration: 'none', letterSpacing: '0.04em' },

  // Footer
  footer: { background: '#060606', borderTop: '1px solid #1A1A1A', padding: '56px 5% 28px' },
  footerLogo: { fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', display: 'flex', marginBottom: 4 },
  footerDesc: { fontSize: 12, color: '#444', lineHeight: 1.7, margin: 0 },
  footerColTitle: { fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F5F5F0', marginBottom: 4 },
  footerLink: { fontSize: 12, color: '#444', textDecoration: 'none', letterSpacing: '0.04em' },
  socialBtn: { background: 'transparent', border: '1px solid #2A2A2A', color: '#555', width: 32, height: 32, fontSize: 9, fontWeight: 900, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.15s' },
  footerBottom: { borderTop: '1px solid #1A1A1A', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  footerCopy: { fontSize: 11, color: '#333', letterSpacing: '0.04em' },

  // Footer — datos de contacto
  footerContactList: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 },
  footerContactItem: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: '#666', lineHeight: 1.5 },
  footerContactIcon: { color: '#F0E040', fontSize: 13, flexShrink: 0, marginTop: 1 },
  footerContactLink: { fontSize: 12, color: '#666', textDecoration: 'none' },

  // Pop-up: drop urgency
notif: { 
  position: 'fixed', 
  top: 16, 
  right: 16, 
  zIndex: 10000, /* Elevado para que quede por delante de la barra */
  maxWidth: 300, 
  background: '#0F0F0F', 
  border: '1px solid #2A2A2A', 
  padding: 18, 
  display: 'flex', 
  flexDirection: 'column', 
  gap: 10, 
  animation: 'fadeIn 0.3s ease' 
},
notifHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
notifLabel: { fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F0E040' },
notifClose: { background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', lineHeight: 1 },
notifMsg: { fontSize: 12, color: '#888', lineHeight: 1.6, margin: 0 },
notifCta: { background: '#F0E040', color: '#0A0A0A', border: 'none', padding: 10, fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' },

  // Pop-up: newsletter overlay
  nlOverlay: { position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.80)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 },
  nlModal: { position: 'relative', background: '#0F0F0F', border: '1px solid #2A2A2A', padding: '40px 36px', maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeIn 0.3s ease' },
  nlClose: { position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, fontFamily: 'inherit' },
  nlEyebrow: { fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F0E040' },
  nlTitle: { fontSize: 32, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em', color: '#F5F5F0', lineHeight: 0.96, margin: '4px 0 8px' },
  nlSub: { fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0 },
  nlForm: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 },
  nlInput: { background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#F5F5F0', padding: '12px 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none' },
  nlSkip: { background: 'none', border: 'none', color: '#444', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', alignSelf: 'center', marginTop: 4 },
};

export default s;
