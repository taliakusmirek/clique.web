import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TechSpecs from './pages/TechSpecs';
import Gallery from './pages/Gallery';
import Waitlist from './pages/Waitlist';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-obsidian">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tech-specs" element={<TechSpecs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/waitlist" element={<Waitlist />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
