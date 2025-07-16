const products = [
  {
    id: 1,
    name: 'Guitar',
    price: 12000,
    image: 'assets/product1.jpg'
  },
  {
    id: 2,
    name: 'Drum Set',
    price: 30000,
    image: 'assets/product1.jpg'
  },
  {
    id: 3,
    name: 'Keyboard',
    price: 18000,
    image: 'assets/product1.jpg'
  }
];

function loadProducts() {
  const container = document.getElementById('product-list');
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').innerText = cart.length;
}

function showCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  const cartBox = document.getElementById('cart');
  cartBox.classList.remove('hidden');
  cartContainer.innerHTML = '';
  const grouped = {};
  cart.forEach(id => {
    grouped[id] = (grouped[id] || 0) + 1;
  });
  for (let id in grouped) {
    const product = products.find(p => p.id == id);
    cartContainer.innerHTML += `<p>${product.name} x ${grouped[id]}</p>`;
  }
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartCount();
  document.getElementById('cart-items').innerHTML = '';
}

loadProducts();
updateCartCount();
