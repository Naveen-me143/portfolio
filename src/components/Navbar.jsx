import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // ✅ FIXED: Close menu only when route changes, not on toggle
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      window.location.href = '/';
    }
  };

  const handleNavClick = (path, name) => {
    setIsOpen(false);
    if (path === '/' && location.pathname === '/') {
      setShowPopup(true);
      return;
    }
    navigate(path);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
  <a
      href="/"
      onClick={handleLogoClick}
      className="text-2xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
>
  𝕯𝖆𝖘𝖆𝖗𝖎 𝕹𝖆𝖛𝖊𝖊𝖓
</a>


          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path, item.name)}
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition bg-transparent border-none cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right-side buttons */}
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? '🌙' : '☀️'}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white dark:bg-gray-800 px-4 pt-2 pb-4 space-y-2 shadow-md border-t border-gray-200 dark:border-gray-700">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path, item.name)}
              className="block w-full text-left text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-500 hover:text-black dark:hover:text-white px-3 py-2 rounded transition-all duration-200 bg-transparent border-none cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <p className="font-medium">You're already on the Home page! 🏠</p>
            <button
              onClick={() => setShowPopup(false)}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
