const API_URL = 'https://final-exam1-deploy.onrender.com/orders';

export const createOrder = async (order) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    return response.json();
};
