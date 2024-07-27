import { getUserInfo } from './user.api.js';

document.addEventListener('DOMContentLoaded', async function() {
    const user = await getUserInfo();
    const logoutLink = document.getElementById('logout-link');
    const courseLink = document.querySelector('a[href="/pages/course-details.html"]');
    const orderHistoryLink = document.querySelector('a[href="/pages/order-history.html"]');
    const signupLink = document.querySelector('a[href="/pages/signup.html"]');
    const loginLink = document.querySelector('a[href="/pages/login.html"]');
    const adminLink = document.querySelector('a[href="/pages/admin.html"]');

    if (user) {
        // Show profile and order history for logged-in users
        document.querySelector('a[href="/pages/profile.html"]').style.display = 'block';
        orderHistoryLink.style.display = 'block';

        // Hide signup and login links
        signupLink.style.display = 'none';
        loginLink.style.display = 'none';

        // Show admin link only for authors
        if (user.role === 'author') {
            adminLink.style.display = 'block';
            courseLink.style.display = 'none'; // Hide course purchase link
        } else {
            adminLink.style.display = 'none';
            courseLink.style.display = 'block'; // Show course purchase link
        }

        // Logout functionality
        logoutLink.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = '/pages/login.html'; // Redirect to login page
        });
    } else {
        // For non-logged-in users
        document.querySelector('a[href="/pages/profile.html"]').style.display = 'none';
        orderHistoryLink.style.display = 'none';
        adminLink.style.display = 'none';
        courseLink.style.display = 'block'; // Show course link
        signupLink.style.display = 'block';
        loginLink.style.display = 'block';
    }
});
