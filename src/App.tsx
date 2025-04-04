import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Students from '@/pages/Students';
import Courses from '@/pages/Courses';
import Enrollments from '@/pages/Enrollments';

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enrollments" element={<Enrollments />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </Router>
  );
}

export default App;