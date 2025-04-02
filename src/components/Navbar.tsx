import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeToggle, setActiveToggle] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Clear localStorage on initial mount
  useEffect(() => {
    localStorage.removeItem('activeToggle');
    if (location.pathname === '/') {
      navigate('/?view=home', { replace: true });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const toggle = params.get('view') || localStorage.getItem('activeToggle') || 'home';
    setActiveToggle(toggle);
  }, [location]);

  const handleToggle = (toggle: string) => {
    setActiveToggle(toggle);
    localStorage.setItem('activeToggle', toggle);
    if (location.pathname === '/') {
      navigate(`/?view=${toggle}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between py-4">
          <Link to="/" className="text-3xl font-bold text-white hover:text-ai-purple/80 transition-colors">
            Vault
          </Link>
          
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => handleToggle('home')}
              className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ${
                activeToggle === 'home'
                ? 'text-ai-purple bg-ai-purple/10 hover:bg-ai-purple/20'
                : 'text-cool-gray hover:text-white'
              }`}
            >
              For Home
            </button>
            <button
              onClick={() => handleToggle('retail')}
              className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ${
                activeToggle === 'retail'
                ? 'text-ai-purple bg-ai-purple/10 hover:bg-ai-purple/20'
                : 'text-cool-gray hover:text-white'
              }`}
            >
              For Retail
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 