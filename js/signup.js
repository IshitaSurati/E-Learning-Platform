import { createUser } from '/api/user.api.js';

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const userData = { name, email, password, role };

    try {
        const newUser = await createUser(userData);
        if (newUser) {
            alert('User created successfully');
            window.location.href = '/login.html';
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user. Please try again.');
    }
});
