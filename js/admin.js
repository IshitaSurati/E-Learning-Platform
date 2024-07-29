import navbar from '/components/navbar.js';
import { getCourses, createCourse, deleteCourse, getCourseById, updateCourse } from '/api/courses.api.js';

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
                        <button class="btn btn-primary edit-btn" data-id="${course.id}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${course.id}">Delete</button>
                    </div>
                </div>
            `;
            courseList.appendChild(courseCard);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const courseId = button.getAttribute('data-id');
                editCourse(courseId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const courseId = button.getAttribute('data-id');
                removeCourse(courseId);
            });
        });

    } catch (error) {
        console.error('Error loading courses:', error);
    }
};

const editCourse = async (courseId) => {
    try {
        const course = await getCourseById(courseId);
        document.getElementById('courseTitle').value = course.title;
        document.getElementById('imageUrl').value = course.image;
        document.getElementById('description').value = course.description;
        document.getElementById('duration').value = course.duration;
        document.getElementById('fees').value = course.fees;
        document.getElementById('coupon').value = course.coupon;
        document.getElementById('discount').value = course.discount;

        const topicsList = document.getElementById('topics-list');
        topicsList.innerHTML = '';

        course.topics.forEach(topic => {
            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic';
            topicDiv.innerHTML = `
                <div class="form-group">
                    <label>Topic Name</label>
                    <input type="text" class="form-control topic-name" value="${topic.name}">
                </div>
                <div class="form-group">
                    <label>Topic Details</label>
                    <textarea class="form-control topic-details">${topic.details}</textarea>
                </div>
            `;
            topicsList.appendChild(topicDiv);
        });

        document.getElementById('course-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            const updatedCourseData = {
                title: document.getElementById('courseTitle').value,
                image: document.getElementById('imageUrl').value,
                description: document.getElementById('description').value,
                duration: document.getElementById('duration').value,
                fees: document.getElementById('fees').value,
                coupon: document.getElementById('coupon').value,
                discount: document.getElementById('discount').value,
                topics: Array.from(document.querySelectorAll('.topic')).map(topic => ({
                    name: topic.querySelector('.topic-name').value,
                    details: topic.querySelector('.topic-details').value
                }))
            };

            try {
                await updateCourse(courseId, updatedCourseData);
                loadCourses();
            } catch (error) {
                console.error('Error updating course:', error);
            }
        });
    } catch (error) {
        console.error('Error fetching course for edit:', error);
    }
};

const removeCourse = async (courseId) => {
    try {
        await deleteCourse(courseId);
        loadCourses();
    } catch (error) {
        console.error('Error deleting course:', error);
    }
};

document.getElementById('add-topic').addEventListener('click', () => {
    const topicsList = document.getElementById('topics-list');
    const topicDiv = document.createElement('div');
    topicDiv.className = 'topic';
    topicDiv.innerHTML = `
        <div class="form-group">
            <label>Topic Name</label>
            <input type="text" class="form-control topic-name">
        </div>
        <div class="form-group">
            <label>Topic Details</label>
            <textarea class="form-control topic-details"></textarea>
        </div>
    `;
    topicsList.appendChild(topicDiv);
});

loadCourses();
