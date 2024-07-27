import { createCourse } from '/api/course.api.js';
import { getUserInfo } from '/api/user.api.js';

document.getElementById('admin-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;
    const topics = document.getElementById('topics').value;
    const seats = document.getElementById('seats').value;
    const coupon = document.getElementById('coupon').value;
    
    const user = getUserInfo();

    if (user && user.role === 'admin') {
        const course = {
            title,
            image,
            description,
            topics,
            seats,
            coupon
        };

        await createCourse(course);
        alert('Course created successfully!');
        window.location.href = '/index.html';
    } else {
        alert('Only admins can create courses.');
    }
});
