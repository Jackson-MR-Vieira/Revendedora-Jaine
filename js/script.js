/* ============================================================
   BELLE COSMÉTICOS — script.js
   Vanilla JS: nav, filters, WhatsApp links, scroll reveal
   ============================================================ */

// ── Número WhatsApp (altere aqui) ──────────────────────────
const WA_NUMBER = '5511999999999'; // Substitua pelo número real

// ── Helpers ────────────────────────────────────────────────
function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function openWhatsApp(msg) {
  window.open(waLink(msg), '_blank');
}

// ── Header fixo + transparência ────────────────────────────
(function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  // Marca link ativo conforme página
  const links = header.querySelectorAll('.nav a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
})();

// ── Menu mobile toggle ──────────────────────────────────────
(function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // Anima hamburguer → X
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Fecha ao clicar num link
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    })
  );
})();

// ── Botões WhatsApp por produto ─────────────────────────────
(function initProductButtons() {
  document.querySelectorAll('[data-produto]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nome = btn.dataset.produto;
      openWhatsApp(`Olá, tenho interesse no produto ${nome} 🌿`);
    });
  });
})();

// ── Botão catálogo ──────────────────────────────────────────
(function initCatalogButtons() {
  document.querySelectorAll('[data-catalogo]').forEach(btn => {
    btn.addEventListener('click', () => {
      openWhatsApp('Olá, gostaria de receber o catálogo completo de produtos. 📖');
    });
  });
})();

// ── Botão hero WhatsApp ─────────────────────────────────────
(function initHeroWA() {
  const btn = document.querySelector('[data-hero-wa]');
  if (btn) btn.addEventListener('click', () => openWhatsApp('Olá! Gostaria de saber mais sobre os produtos disponíveis. 💄'));
})();

// ── Float WhatsApp ──────────────────────────────────────────
(function initFloatWA() {
  const btn = document.querySelector('.whatsapp-float-btn');
  if (btn) btn.addEventListener('click', () => openWhatsApp('Olá! Vim pelo site e gostaria de fazer um pedido. 🛍️'));
})();

// ── Filtro de produtos ──────────────────────────────────────
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filtro-btn');
  const cards      = document.querySelectorAll('.produto-card[data-categoria]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza botão ativo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filtro;

      cards.forEach(card => {
        if (cat === 'todos' || card.dataset.categoria === cat) {
          card.style.display = '';
          // Pequena animação ao aparecer
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeIn .4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ── Scroll reveal ───────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

// ── CSS fadeIn animation (injetado dinamicamente) ───────────
(function injectFadeIn() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: none; }
    }
  `;
  document.head.appendChild(style);
})();
