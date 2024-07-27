import { getUserInfo, updateUser, deleteUser } from '/api/user.api.js';

document.addEventListener('DOMContentLoaded', function() {
    const user = getUserInfo();
    const usernameField = document.getElementById('username');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const deleteBtn = document.getElementById('delete-btn');

    if (user) {
        usernameField.value = user.username;
        emailField.value = user.email;

        document.getElementById('profile-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const updatedUser = {
                ...user,
                password: passwordField.value || user.password
            };

            await updateUser(updatedUser);
            alert('Profile updated successfully!');
        });

        deleteBtn.addEventListener('click', async function() {
            if (confirm('Are you sure you want to delete your account?')) {
                await deleteUser(user.id);
                alert('Account deleted successfully!');
                window.location.href = '/pages/signup.html';
            }
        });
    } else {
        alert('Please login to view your profile.');
        window.location.href = '/pages/login.html';
    }
});
