function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    }
    saveCart(cart);
    alert('Added to cart');
}

function renderProductList() {
    const container = document.getElementById('products');
    if (!container) return;
    container.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price.toFixed(2)}</p>
            <p>${p.description}</p>
            <a class="button" href="product.html?id=${p.id}">View Details</a>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

function renderProductDetail() {
    const detailSection = document.getElementById('product-detail');
    if (!detailSection) return;
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);
    if (!product) {
        detailSection.innerHTML = '<p>Product not found.</p>';
        return;
    }
    detailSection.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
}

function renderCartPage() {
    const list = document.getElementById('cart-items');
    const totalElem = document.getElementById('cart-total');
    if (!list || !totalElem) return;
    const cart = getCart();
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
        list.appendChild(li);
        total += item.price * item.qty;
    });
    totalElem.textContent = `Total: $${total.toFixed(2)}`;
}

function setupCheckout() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        localStorage.removeItem('cart');
        document.getElementById('order-message').textContent = 'Thank you for your purchase!';
    });
}

// Initialize depending on page
renderProductList();
renderProductDetail();
renderCartPage();
setupCheckout();
