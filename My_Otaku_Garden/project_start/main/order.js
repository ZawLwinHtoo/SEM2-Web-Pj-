const orderStatus = document.getElementById('orderStatus');
const orderButton = document.getElementById('placeOrderButton');
let checkoutItems = [];

async function loadCart() {
  try {
    const response = await fetch('catalog.json');
    if (!response.ok) throw new Error('Cannot load the catalog.');
    const catalog = await response.json();
    let saved;
    try { saved = JSON.parse(localStorage.getItem('cart') || '[]'); } catch { saved = []; }
    checkoutItems = Array.isArray(saved) ? saved.map(item => catalog.find(product => product.id === item?.id)).filter(Boolean) : [];
    document.getElementById('quantityno').textContent = checkoutItems.length;
    document.getElementById('Totalmonee').textContent = '$ ' + checkoutItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    orderButton.disabled = checkoutItems.length === 0;
    if (!checkoutItems.length) orderStatus.textContent = 'Your cart is empty. Add a product before checking out.';
  } catch (error) {
    orderStatus.textContent = error.message;
    orderButton.disabled = true;
  }
}

orderButton.disabled = true;
loadCart();
orderButton.addEventListener('click', async () => {
  const fields = { first_name: 'fname', last_name: 'lname', email: 'city', country: 'country', address: 'streetadd', city: 'city21', state: 'state', phone: 'telephone' };
  const customer = Object.fromEntries(Object.entries(fields).map(([key, id]) => [key, document.getElementById(id).value.trim()]));
  if (Object.values(customer).some(value => !value) || customer.country === 'select') {
    orderStatus.textContent = 'Complete every required delivery field.';
    return;
  }
  orderButton.disabled = true;
  orderStatus.textContent = 'Saving your demo order…';
  try {
    const response = await fetch('/api/orders', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ items: checkoutItems.map(item => item.id), customer }) });
    const receipt = await response.json();
    if (!response.ok) throw new Error(receipt.error || 'The order could not be saved.');
    ['cart', 'items', 'totalPrice'].forEach(key => localStorage.removeItem(key));
    orderStatus.textContent = `Demo order ${receipt.id} recorded. Total: $${receipt.total.toFixed(2)}. No payment or shipment will occur.`;
    orderButton.textContent = 'Demo order recorded';
  } catch (error) {
    orderStatus.textContent = error.message;
    orderButton.disabled = false;
  }
});
