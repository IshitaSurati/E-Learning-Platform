import { loadNavbar } from '/components/navbar.js';
import { createCourse } from '/api/course.api.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    document.getElementById('course-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const image = document.getElementById('image').value;
        const topics = document.getElementById('topics').value;
        const subtopics = document.getElementById('subtopics').value;
        const details = document.getElementById('details').value;
        const seats = document.getElementById('seats').value;
        const coupon = document.getElementById('coupon').value;

        createCourse({ title, image, topics, subtopics, details, seats, coupon }).then(response => {
            if (response.success) {
                alert('Course created successfully!');
            } else {
                alert('Failed to create course. Please try again.');
            }
        });
    });
});
