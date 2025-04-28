import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEnrollment,
  getAllStudents,
  getAllCourses,
  getStudentCourses,
} from "@/lib/api";
import * as z from "zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Student, Course } from "@/types";

const enrollmentSchema = z.object({
  student_id: z.coerce.number().positive("Student ID is required"),
  course_id: z.coerce.number().positive("Course ID is required"),
});

const viewEnrollmentSchema = z.object({
  studentId: z.coerce.number().positive("Student ID is required"),
});

export default function Enrollments() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentCourses, setStudentCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const enrollForm = useForm<z.infer<typeof enrollmentSchema>>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      student_id: undefined,
      course_id: undefined,
    },
  });

  const viewForm = useForm<z.infer<typeof viewEnrollmentSchema>>({
    resolver: zodResolver(viewEnrollmentSchema),
    defaultValues: {
      studentId: undefined,
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const studentsData = await getAllStudents();
        const coursesData = await getAllCourses();
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        toast.error("Failed to load data");
      }
    }
    fetchData();
  }, []);

  async function onSubmitEnrollment(data: z.infer<typeof enrollmentSchema>) {
    try {
      await createEnrollment(data);
      enrollForm.reset();
      toast.success("Enrollment successful");

      // If we're viewing this student's enrollments, refresh them
      if (selectedStudent && selectedStudent.id === data.student_id) {
        fetchStudentCourses(data.student_id);
      }
    } catch {
      toast.error("Failed to enroll student");
    }
  }

  async function onViewEnrollments(data: z.infer<typeof viewEnrollmentSchema>) {
    fetchStudentCourses(data.studentId);
    const student = students.find((s) => s.id === data.studentId);
    setSelectedStudent(student || null);
  }

  async function fetchStudentCourses(studentId: number) {
    try {
      const response = await getStudentCourses(studentId);
      if (response && response.courses) {
        setStudentCourses(response.courses);
      } else {
        setStudentCourses([]);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch enrollments");
      setStudentCourses([]);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mx-auto px-4 pt-24 pb-12 w-[100vw]"
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Create Enrollment */}
        <Card className="w-full md:w-1/2 p-6 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Enroll Student in Course</CardTitle>
            <CardDescription>Add a student to a course</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...enrollForm}>
              <form
                onSubmit={enrollForm.handleSubmit(onSubmitEnrollment)}
                className="space-y-4"
              >
                <FormField
                  control={enrollForm.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a student" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem
                              key={student.id}
                              value={student.id.toString()}
                            >
                              {student.name} ({student.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={enrollForm.control}
                  name="course_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem
                              key={course.id}
                              value={course.id.toString()}
                            >
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Enroll Student
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* View Enrollments */}
        <Card className="w-full md:w-1/2 p-6 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>View Student Enrollments</CardTitle>
            <CardDescription>
              See which courses a student is enrolled in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...viewForm}>
              <form
                onSubmit={viewForm.handleSubmit(onViewEnrollments)}
                className="space-y-4"
              >
                <FormField
                  control={viewForm.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a student" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem
                              key={student.id}
                              value={student.id.toString()}
                            >
                              {student.name} ({student.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  View Enrollments
                </Button>
              </form>
            </Form>

            {selectedStudent && (
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-2">
                  Courses for {selectedStudent.name}:
                </h4>
                {studentCourses.length === 0 ? (
                  <p className="text-muted-foreground">
                    Not enrolled in any courses.
                  </p>
                ) : (
                  <div className="space-y-2 divide-y divide-muted">
                    {studentCourses.map((course) => (
                      <div key={course.id} className="pt-2">
                        <p>
                          <strong>{course.title}</strong>
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {course.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
