import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import News from './pages/News';
import Contact from './pages/Contact';

/**
 * Main App Component
 * 
 * Imperial College Egypt Website Rebuild
 * - Modern glassmorphism design
 * - Gradient background: #732638 to #1e0a0f
 * - Responsive layout
 * - Accessible navigation
 * 
 * Content sourced from: https://imperialcollegeegypt.edu.eg
 */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="academics" element={<Academics />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
