const products = [
  { id: 1, name: 'Sauce Labs Backpack', price: 29.99, image: 'img/mochila.jpeg' },
  { id: 2, name: 'Sauce Labs Bike Light', price: 9.99, image: 'img/foco.jpeg' },
  { id: 3, name: 'Sauce Labs Bolt T-Shirt', price: 15.99, image: 'img/camisa-negra.jpeg' },
  { id: 4, name: 'Sauce Labs Fleece Jacket', price: 49.99, image: 'img/chaqueta.jpeg' },
  { id: 5, name: 'Sauce Labs Onesie', price: 7.99, image: 'img/mameluco.jpeg' },
  { id: 6, name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99, image: 'img/camisa-roja.jpeg' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts(list) {
  const grid = document.getElementById('inventoryGrid');
  grid.innerHTML = '';

  list.forEach(product => {
    const inCart = cart.includes(product.id);

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img class="product-image" src="${product.image}" alt="${product.name}">
      <p class="product-name">${product.name}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="cart-btn ${inCart ? 'remove' : 'add'}" data-id="${product.id}">
        ${inCart ? 'Remove' : 'Add to cart'}
      </button>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', toggleCart);
  });
}

function toggleCart(e) {
  const id = parseInt(e.target.dataset.id);

  if (cart.includes(id)) {
    cart = cart.filter(item => item !== id);
  } else {
    cart.push(id);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  renderProducts(products);
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  badge.textContent = cart.length;
  badge.style.display = cart.length > 0 ? 'flex' : 'none';
}

function sortProducts(criteria) {
  let sorted = [...products];
  switch (criteria) {
    case 'az': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'za': sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
    case 'lohi': sorted.sort((a, b) => a.price - b.price); break;
    case 'hilo': sorted.sort((a, b) => b.price - a.price); break;
  }
  renderProducts(sorted);
}

// Menú lateral
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
  renderProducts(products);
  document.getElementById('sideMenu').classList.remove('open');
});

document.getElementById('sortSelect').addEventListener('change', (e) => {
  sortProducts(e.target.value);
});

// Inicializar
renderProducts(products);
updateCartBadge();