const PURCHASE_API_URL = 'http://localhost:3000/purchases';

export const createPurchase = async (purchase) => {
    try {
        const response = await fetch(PURCHASE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchase)
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getPurchases = async (userId) => {
    try {
        const response = await fetch(`${PURCHASE_API_URL}?userId=${userId}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
