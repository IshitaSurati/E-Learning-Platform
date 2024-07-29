document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = '/pages/login.html';
        return;
    }

    document.getElementById('profile-info').innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        window.location.href = '/pages/signup.html';
    });
});
