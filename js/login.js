import { getUsers } from '/api/user.api.js';

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const users = await getUsers();
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('signedInUserName', user.name);
            window.location.href = '/';
        } else {
            alert('Invalid email or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to login. Please try again.');
    }
});
