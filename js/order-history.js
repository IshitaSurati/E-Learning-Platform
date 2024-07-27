import { getPurchases } from '/api/purchase.api.js';
import { getUserInfo } from '/api/user.api.js';

document.addEventListener('DOMContentLoaded', async function() {
    const user = getUserInfo();
    const orderHistoryContainer = document.getElementById('order-history');

    if (user) {
        try {
            const purchases = await getPurchases(user.id);
            purchases.forEach(purchase => {
                const orderItem = document.createElement('div');
                orderItem.className = 'card mb-3';
                orderItem.innerHTML = `
                    <div class="card-header">
                        <h5 class="mb-0">${purchase.courseTitle}</h5>
                    </div>
                    <div class="card-body">
                        <p>Course: ${purchase.courseTitle}</p>
                        <p>Purchase Date: ${purchase.date}</p>
                        <p>Seats Remaining: ${purchase.seatsRemaining}</p>
                    </div>
                `;
                orderHistoryContainer.appendChild(orderItem);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('Please login to view your order history.');
        window.location.href = '/pages/login.html';
    }
});
