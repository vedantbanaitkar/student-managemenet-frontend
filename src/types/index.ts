export interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
}

export interface Enrollment {
  student_id: number;
  course_id: number;
}