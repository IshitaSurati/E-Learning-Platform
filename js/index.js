import navbar from '/components/navbar.js';
import { getCourses } from '/api/courses.api.js';

const currentUserRole = localStorage.getItem('userRole') || 'guest';
document.getElementById('navbar-container').innerHTML = navbar(currentUserRole);

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
};

const loadCourses = async () => {
    try {
        const courses = await getCourses();
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';

        const currentUser = getCurrentUser();

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'col-md-4';
            courseCard.innerHTML = `
                <div class="card">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text">${course.description}</p>
                        <p class="card-text">Duration: ${course.duration}</p>
                        <p class="card-text">Fees: $${course.fees}</p>
                        <a href="/pages/course-details.html?id=${course.id}" class="btn btn-primary">View Details</a>
                        ${currentUser && currentUser.role === 'user' ? `<a href="#" class="btn btn-success purchase-btn" data-id="${course.id}">Purchase</a>` : ''}
                    </div>
                </div>
            `;
            courseList.appendChild(courseCard);
        });

        document.querySelectorAll('.purchase-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const courseId = button.getAttribute('data-id');
                handlePurchase(courseId);
            });
        });

    } catch (error) {
        console.error('Error loading courses:', error);
    }
};

const handlePurchase = async (courseId) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please log in to purchase.');
        return;
    }

    try {
    
        console.log(`User ${currentUser.id} purchased course ${courseId}`);
        alert('Purchase successful!');
    } catch (error) {
        console.error('Error processing purchase:', error);
    }
};

loadCourses();
