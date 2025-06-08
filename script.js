const products = [
    { id: 1, name: 'Product A', price: 19.99 },
    { id: 2, name: 'Product B', price: 29.99 },
    { id: 3, name: 'Product C', price: 9.99 }
];

const cart = [];

function renderProducts() {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>Price: $${p.price.toFixed(2)}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        productsSection.appendChild(div);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    renderCart();
    showMessage('Added to cart');
}

function showMessage(text) {
    const el = document.getElementById('message');
    if (!el) return;
    el.textContent = text;
    el.style.display = 'block';
    clearTimeout(showMessage.timeoutId);
    showMessage.timeoutId = setTimeout(() => {
        el.style.display = 'none';
    }, 2000);
}

function renderCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

renderProducts();
