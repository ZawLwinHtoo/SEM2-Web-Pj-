const container = document.getElementById('container');
const status = document.getElementById('formStatus');
document.getElementById('signUp').addEventListener('click', () => container.classList.add('right-panel-active'));
document.getElementById('signIn').addEventListener('click', () => container.classList.remove('right-panel-active'));

// Old versions stored raw credentials in the browser. They are no longer used.
localStorage.removeItem('password');
localStorage.removeItem('email');

async function submitAccount(event, route, payload) {
  event.preventDefault();
  const button = event.target.querySelector('button');
  button.disabled = true;
  status.textContent = 'Checking account…';
  try {
    const response = await fetch('/api/auth/' + route, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'The account request failed.');
    status.textContent = route === 'register' ? 'Account created. You are signed in.' : 'Signed in.';
    window.location.assign('home.html');
  } catch (error) {
    status.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

document.getElementById('signupForm').addEventListener('submit', event => submitAccount(event, 'register', {
  name: document.getElementById('username').value.trim(),
  email: document.getElementById('email').value.trim(),
  password: document.getElementById('password').value
}));
document.getElementById('signinForm').addEventListener('submit', event => submitAccount(event, 'login', {
  email: document.getElementById('reqemail').value.trim(),
  password: document.getElementById('reqpassword').value
}));
