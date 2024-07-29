import navbar from '/components/navbar.js';
import { getCourseById } from '/api/courses.api.js';
import { createOrder } from '/api/order.api.js';

const currentUserRole = localStorage.getItem('userRole') || 'guest';
document.getElementById('navbar-container').innerHTML = navbar(currentUserRole);

const loadCourseDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');

    try {
        const course = await getCourseById(courseId);
        if (course) {
            const detailsContainer = document.getElementById('course-details');
            detailsContainer.innerHTML = `
                <h1>${course.title}</h1>
                <img src="${course.image}" class="img-fluid" alt="${course.title}">
                <p>${course.description}</p>
                <p><strong>Duration:</strong> ${course.duration}</p>
                <p><strong>Fees:</strong> $${course.fees}</p>
                <p><strong>Coupon:</strong> ${course.coupon}</p>
                <p><strong>Discount:</strong> ${course.discount}%</p>
                <h3>Topics:</h3>
                <ul>
                    ${course.topics.map(topic => `<li><strong>${topic.name}</strong>: ${topic.details}</li>`).join('')}
                </ul>
                ${currentUserRole === 'user' ? '<button id="purchase-btn">Purchase</button>' : ''}
            `;

            if (currentUserRole === 'user') {
                document.getElementById('purchase-btn').addEventListener('click', () => handlePurchase(course));
            }
        }
    } catch (error) {
        console.error('Error fetching course details:', error);
    }
};

const handlePurchase = async (course) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to purchase.');
        return;
    }

    try {
        const order = {
            userId: currentUser.id,
            courseId: course.id,
            title: course.title,
            price: course.fees,
        };

        await createOrder(order);
        alert('Purchase successful!');
    } catch (error) {
        console.error('Error processing purchase:', error);
    }
};

loadCourseDetails();
