const BASE_URL = 'https://final-exam1-deploy.onrender.com/courses'; // Adjust this URL to your API endpoint

export const getCourses = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
};

export const getCourseById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
};

export const createCourse = async (courseData) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
};

export const updateCourse = async (id, courseData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
};

export const deleteCourse = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Network response was not ok.');
};
