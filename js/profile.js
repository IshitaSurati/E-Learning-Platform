import { loadNavbar } from '/components/navbar.js';
import { getUserInfo, updateUser } from '/api/user.api.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    const user = getUserInfo();

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;

    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const updatedUser = { ...user, username, email };
        if (password) updatedUser.password = password;

        updateUser(updatedUser).then(() => {
            alert('Profile updated successfully!');
        }).catch(() => {
            alert('Failed to update profile. Please try again.');
        });
    });
});
