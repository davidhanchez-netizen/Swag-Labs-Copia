// Datos compartidos por las páginas del catálogo dinámico
const catalogProducts = [
  { id: 1, name: 'Sauce Labs Backpack', price: 29.99, image: 'img/mochila.jpeg' },
  { id: 2, name: 'Sauce Labs Bike Light', price: 9.99, image: 'img/foco.jpeg' },
  { id: 3, name: 'Sauce Labs Bolt T-Shirt', price: 15.99, image: 'img/camisa-negra.jpeg' },
  { id: 4, name: 'Sauce Labs Fleece Jacket', price: 49.99, image: 'img/chaqueta.jpeg' },
  { id: 5, name: 'Sauce Labs Onesie', price: 7.99, image: 'img/mameluco.jpeg' },
  { id: 6, name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99, image: 'img/camisa-roja.jpeg' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  badge.textContent = cart.length;
  badge.style.display = cart.length > 0 ? 'flex' : 'none';
}

// ---------- Menú lateral ----------
function initMenu() {
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sideMenu').classList.add('open');
  });
  document.getElementById('closeMenuBtn').addEventListener('click', () => {
    document.getElementById('sideMenu').classList.remove('open');
  });
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('loggedUser');
    window.location.href = 'index.html';
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    localStorage.removeItem('cart');
    cart = [];
    updateCartBadge();
    document.getElementById('sideMenu').classList.remove('open');
  });
}

// ---------- LAZY LOAD ----------
function initLazyLoad() {
  const list = document.getElementById('lazyList');

  list.innerHTML = catalogProducts.map(p => `
    <div class="lazy-card">
      <div class="lazy-img-box">
        <span class="lazy-placeholder">Cargando...</span>
        <img data-src="${p.image}" alt="${p.name}">
      </div>
      <div class="lazy-info">
        <p class="product-name">${p.name}</p>
        <p class="product-price">$${p.price.toFixed(2)}</p>
      </div>
    </div>
  `).join('');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.addEventListener('load', () => {
        img.classList.add('loaded');
        const placeholder = img.parentElement.querySelector('.lazy-placeholder');
        if (placeholder) placeholder.remove();
      });
      obs.unobserve(img);
    });
  }, { rootMargin: '0px' });

  list.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

// ---------- SPINNER ----------
function initSpinner() {
  const spinnerBox = document.getElementById('spinnerBox');
  const grid = document.getElementById('spinnerGrid');
  const reloadBtn = document.getElementById('reloadBtn');

  function load() {
    grid.classList.add('hidden');
    grid.innerHTML = '';
    spinnerBox.classList.remove('hidden');

    setTimeout(() => {
      grid.innerHTML = catalogProducts.map(p => `
        <div class="product-card">
          <img class="product-image" src="${p.image}" alt="${p.name}">
          <p class="product-name">${p.name}</p>
          <p class="product-price">$${p.price.toFixed(2)}</p>
        </div>
      `).join('');
      spinnerBox.classList.add('hidden');
      grid.classList.remove('hidden');
    }, 2500);
  }

  reloadBtn.addEventListener('click', load);
  load();
}

// ---------- SLIDER ----------
function initSlider() {
  const track = document.getElementById('sliderTrack');
  const dotsBox = document.getElementById('sliderDots');
  const total = catalogProducts.length;
  let current = 0;

  track.innerHTML = catalogProducts.map(p => `
    <div class="slide">
      <img src="${p.image}" alt="${p.name}">
      <div class="slide-info">
        <p class="product-name">${p.name}</p>
        <p class="product-price">$${p.price.toFixed(2)}</p>
      </div>
    </div>
  `).join('');

  dotsBox.innerHTML = catalogProducts.map((_, i) =>
    `<button class="dot" data-index="${i}" aria-label="Producto ${i + 1}"></button>`
  ).join('');

  const dots = dotsBox.querySelectorAll('.dot');

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  document.getElementById('sliderPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('sliderNext').addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
  });

  goTo(0);
}

// ---------- Inicializar según la página ----------
initMenu();
updateCartBadge();

const page = document.body.dataset.page;
if (page === 'lazy') initLazyLoad();
if (page === 'spinner') initSpinner();
if (page === 'slider') initSlider();