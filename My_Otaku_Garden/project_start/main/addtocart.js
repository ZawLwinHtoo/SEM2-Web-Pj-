let products = [], filteredProducts = [], cart = [];
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));

function displaycart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('Total').textContent = `$ ${total.toFixed(2)}`;
  document.getElementById('count').textContent = cart.length;
  document.getElementById('cartItem').innerHTML = cart.length ? cart.map((item, index) => `
    <div class="cart-item">
      <div class="row-img"><img class="rowimg" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}"></div>
      <p style="font-size:12px">${escapeHTML(item.title)}</p>
      <h2 style="font-size:15px">$ ${item.price.toFixed(2)}</h2>
      <button type="button" aria-label="Remove ${escapeHTML(item.title)}" onclick="delElement(${index})">Remove</button>
    </div>`).join('') : 'Your cart is empty';
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.removeItem('items');
  localStorage.removeItem('totalPrice');
}

function addtocart(index) {
  if (filteredProducts[index] && cart.length < 100) {
    cart.push(filteredProducts[index]);
    displaycart();
  }
}

function delElement(index) {
  cart.splice(index, 1);
  displaycart();
}

function filterProducts(searchText = '') {
  filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
  document.getElementById('root').innerHTML = filteredProducts.map((item, index) => `
    <div class="figbox">
      <div class="img-fbox"><img class="images" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}"></div>
      <div class="bottom"><p>${escapeHTML(item.title)}</p>
        <a href="${escapeHTML(item.review)}" class="seemore">See More</a>
        <h2>$ ${item.price.toFixed(2)}</h2>
        <button type="button" onclick="addtocart(${index})">Add to Cart</button>
      </div>
    </div>`).join('') || '<p>No matching products.</p>';
}

document.getElementById('searchBar').addEventListener('input', event => filterProducts(event.target.value));

fetch('catalog.json').then(response => {
  if (!response.ok) throw new Error('The product catalog could not be loaded.');
  return response.json();
}).then(catalog => {
  products = catalog;
  let saved;
  try { saved = JSON.parse(localStorage.getItem('cart') || '[]'); } catch { saved = []; }
  cart = Array.isArray(saved) ? saved.slice(0, 100).map(item => products.find(product => product.id === item?.id)).filter(Boolean) : [];
  filterProducts();
  displaycart();
}).catch(error => { document.getElementById('root').textContent = error.message; });
