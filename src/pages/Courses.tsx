import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCourse, getCourse, getAllCourses } from "@/lib/api";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Course } from "@/types";

const courseSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

const searchSchema = z.object({
  id: z.coerce.number().positive("ID must be a positive number"),
});

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchResult, setSearchResult] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        toast.error("Failed to fetch courses");
      }
    }
    fetchCourses();
  }, []);

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const searchForm = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      id: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof courseSchema>) {
    try {
      const newCourse = await createCourse(data);
      setCourses((prev) => [...prev, newCourse]);
      form.reset();
      toast.success("Course created successfully");
    } catch {
      toast.error("Failed to create course");
    }
  }

  async function onSearch(data: z.infer<typeof searchSchema>) {
    try {
      const course = await getCourse(data.id);
      setSearchResult(course);
      if (!course) toast.error("Course not found");
    } catch {
      toast.error("Failed to find course");
      setSearchResult(null);
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
        {/* Create Course */}
        <Card className="w-full md:w-1/2 p-6 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
            <CardDescription>Add a new course to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introduction to Programming"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A comprehensive introduction to programming fundamentals"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Course
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Search Course */}
        <Card className="w-full md:w-1/2 p-6 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Find Course</CardTitle>
            <CardDescription>Search for a course by ID</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...searchForm}>
              <form
                onSubmit={searchForm.handleSubmit(onSearch)}
                className="space-y-4"
              >
                <FormField
                  control={searchForm.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course ID</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Search
                </Button>
              </form>
            </Form>

            {searchResult && (
              <div className="mt-6 bg-muted p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Search Result:</h4>
                <p>
                  <strong>Title:</strong> {searchResult.title}
                </p>
                <p>
                  <strong>Description:</strong> {searchResult.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Course List */}
        <Card className="w-full md:w-1/2 p-6 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>All Courses</CardTitle>
            <CardDescription>List of all available courses</CardDescription>
          </CardHeader>
          <CardContent>
            {courses.length === 0 ? (
              <p className="text-muted-foreground">No courses added yet.</p>
            ) : (
              <div className="space-y-4 divide-y divide-muted">
                {courses.map((course) => (
                  <div key={course.id} className="pt-4">
                    <p>
                      <strong>ID:</strong> {course.id}
                    </p>
                    <p>
                      <strong>Title:</strong> {course.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {course.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
