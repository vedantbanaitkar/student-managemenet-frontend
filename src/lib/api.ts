const API_URL = 'http://localhost:3000'; // Replace with your actual API URL

export async function createStudent(data: Omit<Student, 'id'>) {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getStudent(id: number) {
  const response = await fetch(`${API_URL}/students/${id}`);
  return response.json();
}

export async function createCourse(data: Omit<Course, 'id'>) {
  const response = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getCourse(id: number) {
  const response = await fetch(`${API_URL}/courses/${id}`);
  return response.json();
}

export async function createEnrollment(data: Enrollment) {
  const response = await fetch(`${API_URL}/enrollments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getStudentCourses(studentId: number) {
  const response = await fetch(`${API_URL}/students/${studentId}/courses`);
  return response.json();
}