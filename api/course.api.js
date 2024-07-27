const COURSE_API_URL = 'http://localhost:3000/courses';

export const getCourses = async () => {
    try {
        const response = await fetch(COURSE_API_URL);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export const createCourse = async (course) => {
    try {
        const response = await fetch(COURSE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export const updateCourse = async (course) => {
    try {
        await fetch(`${COURSE_API_URL}/${course.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

export const deleteCourse = async (id) => {
    try {
        await fetch(`${COURSE_API_URL}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getCourseById = async (id) => {
    try {
        const response = await fetch(`${COURSE_API_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
