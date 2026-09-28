const allProducts = [
  { id: 1, name: 'Sauce Labs Backpack', price: 29.99, color: '#8b5cf6' },
  { id: 2, name: 'Sauce Labs Bike Light', price: 9.99, color: '#f59e0b' },
  { id: 3, name: 'Sauce Labs Bolt T-Shirt', price: 15.99, color: '#ef4444' },
  { id: 4, name: 'Sauce Labs Fleece Jacket', price: 49.99, color: '#3b82f6' },
  { id: 5, name: 'Sauce Labs Onesie', price: 7.99, color: '#ec4899' },
  { id: 6, name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99, color: '#10b981' }
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.getElementById('cartList');
const checkoutBtn = document.getElementById('checkoutBtn');

if (cart.length === 0) {
  cartList.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
  if (checkoutBtn) checkoutBtn.style.pointerEvents = 'none';
  if (checkoutBtn) checkoutBtn.style.opacity = '0.5';
} else {
  cart.forEach(id => {
    const product = allProducts.find(p => p.id === id);
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <span class="cart-qty">1</span>
      <div class="cart-item-info">
        <p class="product-name">${product.name}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
      <button class="cart-btn remove" data-id="${product.id}">Remove</button>
    `;
    cartList.appendChild(item);
  });
}

document.querySelectorAll('.cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    const updatedCart = cart.filter(item => item !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    location.reload();
  });
});