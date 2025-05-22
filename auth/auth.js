const API_URL_AUTH = 'http://localhost:8000/api/auth/';

// REGISTER - POST USER
const registerForm = document.querySelector('#register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const c_password = document.getElementById('c_password').value;

    try {
      const res = await fetch(API_URL_AUTH + 'register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, c_password })
    });
    const data = await res.json();
    if (res.ok) {
        alert('Inscription réussie !');
        localStorage.setItem('token', data.accessToken);
        window.location.href = 'login.html';
    }   else    {
        alert(data.message || 'Erreur lors de l’inscription.');
    }
    } catch (err) {
      alert('Erreur réseau');
      console.error(err);
    }
  });
}

// CONNEXION - POST USER
const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
    const res = await fetch(API_URL_AUTH + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('rank', data.user.rank);
        window.location.href = '../index.html';
    } else {
        alert(data.message || 'Email ou mot de passe incorrect.');
    }
    } catch (err) {
      alert('Erreur réseau');
      console.error(err);
    }
  });
}