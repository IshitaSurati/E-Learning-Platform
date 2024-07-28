import { loadNavbar } from '/components/navbar.js';
import { login } from '/api/user.api.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        login({ email, password }).then(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/index.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        }).catch(() => {
            alert('An error occurred. Please try again.');
        });
    });
});
