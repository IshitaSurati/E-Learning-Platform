import { getPurchases } from '/api/purchase.api.js';
import { getUserInfo } from '/api/user.api.js';

document.addEventListener('DOMContentLoaded', async function() {
    const user = getUserInfo();
    const purchasesContainer = document.getElementById('purchased-courses');

    if (user) {
        try {
            const purchases = await getPurchases(user.id);
            purchases.forEach(purchase => {
                const purchaseItem = document.createElement('div');
                purchaseItem.className = 'card mb-3';
                purchaseItem.innerHTML = `
                    <div class="card-header" id="heading${purchase.id}">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${purchase.id}" aria-expanded="true" aria-controls="collapse${purchase.id}">
                                ${purchase.courseTitle}
                            </button>
                        </h5>
                    </div>
                    <div id="collapse${purchase.id}" class="collapse" aria-labelledby="heading${purchase.id}" data-parent="#purchased-courses">
                        <div class="card-body">
                            <p>Course: ${purchase.courseTitle}</p>
                            <p>Purchase Date: ${purchase.date}</p>
                            <p>Seats Remaining: ${purchase.seatsRemaining}</p>
                        </div>
                    </div>
                `;
                purchasesContainer.appendChild(purchaseItem);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('Please login to view your dashboard.');
        window.location.href = '/pages/login.html';
    }
});
