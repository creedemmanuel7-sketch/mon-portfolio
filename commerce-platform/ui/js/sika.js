/* Atelier Sika — catalogue + panier + wishlist (prototype Étape 2) */
window.Sika = (() => {
  const PRODUCTS = [
    { id: 'pulse', name: 'Écouteurs Pulse', price: 15000, cat: 'tech', img: '../assets/products/product-ecouteurs.jpg', desc: 'Son clair, confort longue durée. Finition matte et détails cuivre.' },
    { id: 'kota', name: 'Sac Kota', price: 22000, cat: 'accessoires', img: '../assets/products/product-sac.jpg', desc: 'Cabas tressé indigo, porté main ou épaule. Pièce artisanale.' },
    { id: 'desk', name: 'Lampe Desk', price: 18500, cat: 'maison', img: '../assets/products/product-lampe.jpg', desc: 'Lumière douce pour le bureau. Base céramique, abat-jour courbe.' },
    { id: 'mug', name: 'Mug Sika', price: 5000, cat: 'maison', img: '../assets/products/product-mug.jpg', desc: 'Grès moucheté, lèvre indigo. Pour le café du matin.' },
    { id: 'keys', name: 'Clavier Mini', price: 35000, cat: 'tech', img: '../assets/products/product-clavier.jpg', desc: 'Compact, tactile, touches cuivre. Idéal bureau nomade.' },
    { id: 'coque', name: 'Coque Studio', price: 7500, cat: 'tech', img: '../assets/products/product-coque.jpg', desc: 'Cuir indigo texturé, coutures cuivre. Protection élégante.' },
    { id: 'sandales', name: 'Sandales Cognac', price: 28000, cat: 'accessoires', img: '../assets/products/product-sandales.jpg', desc: 'Cuir cognac, boucle cuivre. Confort ville et voyage.' },
    { id: 'encens', name: 'Rituel Encens', price: 9500, cat: 'maison', img: '../assets/products/product-encens.jpg', desc: 'Support sculpté et bougies. Une pause sensorielle chez soi.' },
    { id: 'plaid', name: 'Plaid Indigo', price: 32000, cat: 'maison', img: '../assets/products/product-plaid.jpg', desc: 'Coton teint indigo, franges cuivre. Canapé ou voyage.' },
    { id: 'bijoux', name: 'Créoles Douces', price: 12000, cat: 'accessoires', img: '../assets/products/product-bijoux.jpg', desc: 'Anneaux délicats et vide-poche céramique. Le détail qui compte.' },
  ];

  const money = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' XOF';

  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };
  const write = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  const getCart = () => read('sika_cart', []);
  const setCart = (cart) => { write('sika_cart', cart); updateBadges(); };
  const getWish = () => read('sika_wish', []);
  const setWish = (w) => { write('sika_wish', w); updateBadges(); };

  function addToCart(id, qty = 1) {
    const cart = getCart();
    const row = cart.find((i) => i.id === id);
    if (row) row.qty += qty;
    else cart.push({ id, qty });
    setCart(cart);
    toast('Ajouté au panier');
  }

  function toggleWish(id) {
    let w = getWish();
    if (w.includes(id)) w = w.filter((x) => x !== id);
    else w.push(id);
    setWish(w);
    toast(w.includes(id) ? 'Ajouté aux favoris' : 'Retiré des favoris');
  }

  function cartCount() {
    return getCart().reduce((s, i) => s + i.qty, 0);
  }

  function updateBadges() {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      const n = cartCount();
      el.textContent = n;
      el.hidden = n === 0;
    });
    document.querySelectorAll('[data-wish-count]').forEach((el) => {
      const n = getWish().length;
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  function productCard(p) {
    return `<a class="product-card reveal" href="produit.html?id=${p.id}">
      <div class="media"><img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
      <div class="body">
        <div class="cat">${p.cat}</div>
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)}</div>
      </div>
    </a>`;
  }

  function renderProducts(selector, filterFn = () => true) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = PRODUCTS.filter(filterFn).map(productCard).join('');
    observeReveals();
  }

  function observeReveals() {
    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  }

  function initChrome() {
    const toggle = document.getElementById('menu-toggle');
    const mobile = document.getElementById('nav-mobile');
    if (toggle && mobile) {
      toggle.addEventListener('click', () => mobile.classList.toggle('open'));
    }
    updateBadges();
    observeReveals();
  }

  function getProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  return {
    PRODUCTS, money, getCart, setCart, getWish, setWish,
    addToCart, toggleWish, cartCount, updateBadges, toast,
    renderProducts, productCard, initChrome, getProduct, observeReveals,
  };
})();

document.addEventListener('DOMContentLoaded', () => Sika.initChrome());
