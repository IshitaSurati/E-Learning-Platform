import { loadNavbar } from '/components/navbar.js';
import { getCourses } from '/api/course.api.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = '/pages/signup.html';
        return;
    }

    getCourses().then(courses => {
        const contentContainer = document.getElementById('content-container');
        contentContainer.innerHTML = '';

        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course');
            courseElement.innerHTML = `
                <h2>${course.title}</h2>
                <img src="${course.image}" alt="${course.title}" style="width: 300px;">
                <p><strong>Topics:</strong> ${course.topics}</p>
                <p><strong>Subtopics:</strong> ${course.subtopics}</p>
                <p><strong>Details:</strong> ${course.details}</p>
                <p><strong>Seats:</strong> ${course.seats}</p>
                <p><strong>Coupon:</strong> ${course.coupon}</p>
                <button class="purchase-button btn btn-primary" data-id="${course.id}">Purchase</button>
            `;

            contentContainer.appendChild(courseElement);
        });

        document.querySelectorAll('.purchase-button').forEach(button => {
            button.addEventListener('click', function() {
                const courseId = this.getAttribute('data-id');
                purchaseCourse(courseId);
            });
        });
    });

    function purchaseCourse(courseId) {
        const user = JSON.parse(localStorage.getItem('user'));

        fetch('http://localhost:3000/purchases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, courseId })
        }).then(response => response.json()).then(() => {
            alert('Course purchased successfully!');
        }).catch(error => {
            alert('Purchase failed. Please try again.');
        });
    }
});
