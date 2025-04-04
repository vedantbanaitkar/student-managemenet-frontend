import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Enrollments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 pt-24 pb-12"
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Enrollments</CardTitle>
          <CardDescription>Manage student course enrollments</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Enrollment content will go here */}
          <p>Enrollment management coming soon</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}