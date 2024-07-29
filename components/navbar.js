const navbar = (role) => {
    const isLoggedIn = role !== 'guest';
    const isAdmin = role === 'admin';
    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/index.html">E-Learning Platform</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    ${isLoggedIn ? `
                        ${isAdmin ? `
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/admin.html">Admin</a>
                            </li>
                        ` : ''}
                        <li class="nav-item">
                            <a class="nav-link" href="#" onclick="logout()">Logout</a>
                        </li>
                    ` : `
                        <li class="nav-item">
                            <a class="nav-link" href="/pages/login.html">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/pages/signup.html">Sign Up</a>
                        </li>
                    `}
                </ul>
            </div>
        </nav>
    `;
};

window.logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('signedInUserName');
    window.location.href = '/pages/signup.html';
};

export default navbar;
