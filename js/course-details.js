import { getCourseById } from '/api/course.api.js';
import { createPurchase } from '/api/purchase.api.js';
import { getUserInfo } from '/api/user.api.js';

document.addEventListener('DOMContentLoaded', async function() {
    const courseId = new URLSearchParams(window.location.search).get('id');
    const courseDetails = document.getElementById('course-details');
    const purchaseBtn = document.getElementById('purchase-btn');

    if (courseId) {
        try {
            const course = await getCourseById(courseId);
            courseDetails.innerHTML = `
                <div class="card">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text">${course.description}</p>
                        <h6>Topics:</h6>
                        <ul>
                            ${course.topics.split(',').map(topic => `<li>${topic}</li>`).join('')}
                        </ul>
                        <p>Seats Remaining: <span id="seats-remaining">${course.seats}</span></p>
                    </div>
                </div>
            `;
            purchaseBtn.addEventListener('click', async function() {
                const user = getUserInfo();
                if (user) {
                    if (course.seats > 0) {
                        const purchase = {
                            userId: user.id,
                            courseId: course.id,
                            courseTitle: course.title,
                            date: new Date().toISOString(),
                            seatsRemaining: course.seats - 1
                        };

                        await createPurchase(purchase);
                        course.seats -= 1;
                        document.getElementById('seats-remaining').textContent = course.seats;
                        alert('Course purchased successfully!');
                    } else {
                        alert('No seats available.');
                    }
                } else {
                    alert('Please login to purchase this course.');
                    window.location.href = '/pages/login.html';
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
});
