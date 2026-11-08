// Aviso de cookies de Parlando.
// Google Analytics carga con el almacenamiento de analítica negado (modo de
// consentimiento de Google). Solo usa cookies si la persona toca "Aceptar".
// La elección se guarda en este navegador y se puede cambiar desde
// /privacidad/#cookies.
(function () {
  var KEY = 'parlando_cookies';

  function leer() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function guardar(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function aplicar(v) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: v === 'si' ? 'granted' : 'denied' });
    }
  }
  function cerrar() {
    var b = document.getElementById('aviso-cookies');
    if (b) b.parentNode.removeChild(b);
  }
  function estilos() {
    if (document.getElementById('aviso-cookies-estilos')) return;
    var st = document.createElement('style');
    st.id = 'aviso-cookies-estilos';
    st.textContent =
      '#aviso-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:720px;margin:0 auto;' +
      'background:#13131e;border:1px solid #2a2836;border-radius:14px;padding:16px 20px;display:flex;gap:16px;' +
      'align-items:center;box-shadow:0 8px 32px rgba(0,0,0,.5);font-family:"DM Sans",Helvetica,Arial,sans-serif}' +
      '#aviso-cookies p{margin:0;font-size:14px;line-height:1.55;color:#a09ab0;flex:1}' +
      '#aviso-cookies a{color:#f0c060;text-decoration:underline}' +
      '#aviso-cookies .acciones{display:flex;gap:10px;flex-shrink:0}' +
      '#aviso-cookies button{font:inherit;font-size:14px;font-weight:500;border-radius:10px;padding:10px 18px;cursor:pointer;min-width:104px}' +
      '#aviso-cookies .no{background:transparent;color:#ede8f0;border:1px solid #6a6480}' +
      '#aviso-cookies .si{background:#f0c060;color:#0a0a0f;border:1px solid #f0c060}' +
      '#aviso-cookies button:focus-visible{outline:2px solid #f0c060;outline-offset:2px}' +
      '@media (max-width:620px){#aviso-cookies{flex-direction:column;align-items:stretch}#aviso-cookies .acciones button{flex:1}}';
    document.head.appendChild(st);
  }
  function mostrar() {
    if (document.getElementById('aviso-cookies')) return;
    estilos();
    var b = document.createElement('div');
    b.id = 'aviso-cookies';
    b.setAttribute('role', 'region');
    b.setAttribute('aria-label', 'Aviso de cookies');
    b.innerHTML =
      '<p>Usamos Google Analytics para saber cuántas personas visitan la web y mejorarla. ' +
      'No vendemos tus datos. <a href="/privacidad/#cookies">Más información</a></p>' +
      '<div class="acciones"><button type="button" class="no" data-v="no">Rechazar</button>' +
      '<button type="button" class="si" data-v="si">Aceptar</button></div>';
    b.addEventListener('click', function (e) {
      var v = e.target && e.target.getAttribute && e.target.getAttribute('data-v');
      if (!v) return;
      guardar(v);
      aplicar(v);
      cerrar();
    });
    document.body.appendChild(b);
  }

  window.parlandoCookies = { abrir: mostrar };

  function iniciar() {
    if (!leer()) mostrar();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
