import { loadNavbar } from '/components/navbar.js';
import { createUser } from '/api/user.api.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    document.getElementById('signup-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        const user = {
            username,
            email,
            password,
            role
        };

        try {
            await createUser(user);
            alert('Signup successful! Please login.');
            window.location.href = '/pages/signup.html';
        } catch (error) {
            alert('Signup failed. Please try again.');
        }
    });
});
