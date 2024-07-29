const BASE_URL = 'https://final-exam1-deploy.onrender.com/users';

// Fetch all users
export const getUsers = async () => {
    try {
        const response = await fetch(BASE_URL);
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

// Create a new user
export const createUser = async (userData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

// Fetch user by ID
export const getUserById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

// Update a user by ID
export const updateUser = async (id, userData) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

// Delete a user by ID
export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};
