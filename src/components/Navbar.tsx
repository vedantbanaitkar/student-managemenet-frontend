import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, FileSpreadsheet } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: GraduationCap },
    { to: '/students', label: 'Students', icon: Users },
    { to: '/courses', label: 'Courses', icon: BookOpen },
    { to: '/enrollments', label: 'Enrollments', icon: FileSpreadsheet },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <div className="flex-1 flex items-center justify-center md:justify-start">
          <Link to="/" className="mr-8 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold">SMS</span>
          </Link>
          <div className="hidden md:flex gap-6">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="relative flex items-center space-x-1 text-sm font-medium transition-colors hover:text-foreground/80"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {location.pathname === to && (
                  <motion.div
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;