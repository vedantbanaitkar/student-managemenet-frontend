import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  BookOpen,
  FileSpreadsheet,
  ChevronRight,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Students",
      description: "Manage student profiles and enrollments",
      icon: Users,
      path: "/students",
      color: "bg-blue-500/90",
    },
    {
      title: "Courses",
      description: "Create and manage course offerings",
      icon: BookOpen,
      path: "/courses",
      color: "bg-green-500/90",
    },
    {
      title: "Enrollments",
      description: "Handle course enrollments",
      icon: FileSpreadsheet,
      path: "/enrollments",
      color: "bg-purple-500/90",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-background to-background/50">
      
      <div className=" w-[97vw] px-4 py-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 w-full"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <GraduationCap className="h-20 w-20 mb-6 text-primary" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Student Management System
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Welcome to the student management portal. Manage students, courses,
            and enrollments with ease.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-5xl mx-auto"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="flex justify-center"
            >
              <div
                className="relative w-full md:max-w-xs rounded-xl border overflow-hidden bg-card shadow-md transition-all duration-300"
                onClick={() => navigate(card.path)}
              >
                <div
                  className={`absolute h-2 w-full top-0 ${card.color}`}
                ></div>
                <div className="p-6 pt-8">
                  <div
                    className={`${card.color} text-white rounded-full p-3 h-16 w-16 flex items-center justify-center mx-auto mb-6`}
                  >
                    <card.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-center">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">
                    {card.description}
                  </p>
                  <Button className="w-full group hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2">
                    <span>Explore {card.title}</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
