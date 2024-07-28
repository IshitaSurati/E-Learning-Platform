export function getUserInfo() {
    // This function should return user information from local storage or session
    // Here, we assume that the user information is stored in local storage after login
    return JSON.parse(localStorage.getItem('user'));
}
