import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, FileSpreadsheet } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Students',
      description: 'Manage student profiles and enrollments',
      icon: Users,
      path: '/students',
      color: 'bg-blue-500/90',
    },
    {
      title: 'Courses',
      description: 'Create and manage course offerings',
      icon: BookOpen,
      path: '/courses',
      color: 'bg-green-500/90',
    },
    {
      title: 'Enrollments',
      description: 'Handle course enrollments',
      icon: FileSpreadsheet,
      path: '/enrollments',
      color: 'bg-purple-500/90',
    },
  ];

  return (
    <div className="container mx-auto px-4 min-h-screen pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold mb-4">Student Management System</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Welcome to the student management portal. Manage students, courses, and enrollments with ease.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => navigate(card.path)}
          >
            <div className="relative h-full rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
              <card.icon className={`h-12 w-12 ${card.color} text-white rounded-lg p-2 mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
              <Button
                variant="outline"
                className="mt-4 w-full group-hover:bg-primary group-hover:text-primary-foreground"
              >
                View {card.title}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;