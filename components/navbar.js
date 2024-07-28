export async function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    const user = JSON.parse(localStorage.getItem('user'));

    navbarContainer.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/index.html">CourseApp</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/pages/profile.html">Profile</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/pages/orders.html">Orders</a>
                    </li>
                    ${user && user.role === 'admin' ? `<li class="nav-item"><a class="nav-link" href="/pages/admin.html">Admin</a></li>` : ''}
                    ${user ? '<li class="nav-item"><a class="nav-link" href="/pages/logout.html">Logout</a></li>' : '<li class="nav-item"><a class="nav-link" href="/pages/login.html">Login</a></li>'}
                    ${user ? '' : '<li class="nav-item"><a class="nav-link" href="/pages/signup.html">Signup</a></li>'}
                </ul>
            </div>
        </nav>
    `;
}
