import { loadNavbar } from '/components/navbar.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = '/login.html';
        return;
    }

    fetch('http://localhost:3000/purchases')
        .then(response => response.json())
        .then(purchases => {
            const userPurchases = purchases.filter(p => p.userId === user.id);
            const ordersContainer = document.getElementById('orders-container');
            ordersContainer.innerHTML = '';

            if (userPurchases.length === 0) {
                ordersContainer.innerHTML = '<p>No purchases yet.</p>';
                return;
            }

            userPurchases.forEach(purchase => {
                fetch(`http://localhost:3000/courses/${purchase.courseId}`)
                    .then(response => response.json())
                    .then(course => {
                        const purchaseElement = document.createElement('div');
                        purchaseElement.classList.add('purchase');
                        purchaseElement.innerHTML = `
                            <h2>${course.title}</h2>
                            <img src="${course.image}" alt="${course.title}" style="width: 300px;">
                            <p><strong>Topics:</strong> ${course.topics}</p>
                            <p><strong>Subtopics:</strong> ${course.subtopics}</p>
                            <p><strong>Details:</strong> ${course.details}</p>
                            <p><strong>Seats:</strong> ${course.seats}</p>
                            <p><strong>Coupon:</strong> ${course.coupon}</p>
                        `;

                        ordersContainer.appendChild(purchaseElement);
                    });
            });
        });
});
