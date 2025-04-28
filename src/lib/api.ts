import type { Student, Course, Enrollment } from "@/types";

const API_URL = "http://localhost:3000"; // Replace with your actual API URL

export async function createStudent(data: Omit<Student, "id">) {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getStudent(id: number) {
  const response = await fetch(`${API_URL}/students/${id}`);
  return response.json();
}

export async function getAllStudents() {
  const response = await fetch(`${API_URL}/students`);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
}

export async function createCourse(data: Omit<Course, "id">) {
  const response = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create enrollment");
  }
  return response.json();
}

export async function getStudentCourses(studentId: number) {
  const response = await fetch(
    `${API_URL}/enrollments/students/${studentId}/courses`
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch student courses");
  }
  return response.json();
}

export async function getAllCourses() {
  const response = await fetch(`${API_URL}/courses`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}
