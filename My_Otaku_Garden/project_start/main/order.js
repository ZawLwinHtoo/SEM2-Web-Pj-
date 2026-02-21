let items = JSON.parse(localStorage.getItem("items"));
document.getElementById("quantityno").innerHTML = items.length
let price = localStorage.getItem("totalPrice")
document.getElementById('Totalmonee').innerHTML = '$' + price;


document.getElementById('placeOrderButton').addEventListener('click', function (e) {
    const phoneRegex = /^\d+$/; // Regex to match only digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format
  
    const phone = document.getElementById('telephone').value.trim();
    const email = document.getElementById('city').value.trim();
  
    let isValid = true; // Flag to track form validity
  
    // Check for empty fields
    if (phone === '' || email === '') {
      alert('Please fill in all required fields.');
      isValid = false;
    }
  
    // Validate phone number
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (digits only).');
      isValid = false;
    }
  
    // Validate email
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      isValid = false;
    }
  
    // If form is valid, proceed with order confirmation
    if (isValid) {
      alert('Order is confirmed!');
      window.location.href = 'home.html';
    } else {
      e.preventDefault(); // Prevent form submission
    }
  });