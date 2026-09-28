const checkoutProducts = [
  { id: 1, name: 'Sauce Labs Backpack', price: 29.99 },
  { id: 2, name: 'Sauce Labs Bike Light', price: 9.99 },
  { id: 3, name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  { id: 4, name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  { id: 5, name: 'Sauce Labs Onesie', price: 7.99 },
  { id: 6, name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 }
];

// ===== STEP ONE: formulario de información =====
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const errorMsg = document.getElementById('checkoutError');

    errorMsg.textContent = '';

    if (firstName === '') {
      errorMsg.textContent = 'Error: First Name is required';
      return;
    }
    if (lastName === '') {
      errorMsg.textContent = 'Error: Last Name is required';
      return;
    }
    if (postalCode === '') {
      errorMsg.textContent = 'Error: Postal Code is required';
      return;
    }

    sessionStorage.setItem('checkoutInfo', JSON.stringify({ firstName, lastName, postalCode }));
    window.location.href = 'checkout-step-two.html';
  });
}

// ===== STEP TWO: resumen del pedido =====
const overviewList = document.getElementById('overviewList');
if (overviewList) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    overviewList.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
  } else {
    let itemTotal = 0;

    cart.forEach(id => {
      const product = checkoutProducts.find(p => p.id === id);
      itemTotal += product.price;

      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = `
        <span class="cart-qty">1</span>
        <div class="cart-item-info">
          <p class="product-name">${product.name}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
      `;
      overviewList.appendChild(item);
    });

    const tax = itemTotal * 0.08;
    const total = itemTotal + tax;

    document.getElementById('itemTotal').textContent = itemTotal.toFixed(2);
    document.getElementById('taxTotal').textContent = tax.toFixed(2);
    document.getElementById('grandTotal').textContent = total.toFixed(2);
  }

  const finishBtn = document.getElementById('finishBtn');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      localStorage.removeItem('cart');
      sessionStorage.removeItem('checkoutInfo');
    });
  }
}