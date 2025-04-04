import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { createStudent, getStudent } from '@/lib/api';
import type { Student } from '@/types';

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce
    .number()
    .min(16, 'Age must be at least 16')
    .max(100, 'Age must be less than 100'),
  email: z.string().email('Invalid email address'),
});

const searchSchema = z.object({
  id: z.coerce.number().positive('ID must be a positive number'),
});

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchResult, setSearchResult] = useState<Student | null>(null);

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
    },
  });

  const searchForm = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      id: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof studentSchema>) {
    try {
      const newStudent = await createStudent(data);
      setStudents((prev) => [...prev, newStudent]);
      form.reset();
      toast.success('Student created successfully');
    } catch (error) {
      toast.error('Failed to create student');
    }
  }

  async function onSearch(data: z.infer<typeof searchSchema>) {
    try {
      const student = await getStudent(data.id);
      setSearchResult(student);
      if (!student) {
        toast.error('Student not found');
      }
    } catch (error) {
      toast.error('Failed to find student');
      setSearchResult(null);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mx-auto px-4 pt-24 pb-12 space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Create New Student</CardTitle>
          <CardDescription>Add a new student to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="18" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Student</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Find Student</CardTitle>
          <CardDescription>Search for a student by ID</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...searchForm}>
            <form onSubmit={searchForm.handleSubmit(onSearch)} className="space-y-4">
              <FormField
                control={searchForm.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Search</Button>
            </form>
          </Form>

          {searchResult && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Search Result:</h4>
              <div className="p-4 border rounded-lg">
                <p><strong>Name:</strong> {searchResult.name}</p>
                <p><strong>Age:</strong> {searchResult.age}</p>
                <p><strong>Email:</strong> {searchResult.email}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>List of all registered students</CardDescription>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <p className="text-muted-foreground">No students registered yet.</p>
          ) : (
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="p-4 border rounded-lg">
                  <p><strong>ID:</strong> {student.id}</p>
                  <p><strong>Name:</strong> {student.name}</p>
                  <p><strong>Age:</strong> {student.age}</p>
                  <p><strong>Email:</strong> {student.email}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}