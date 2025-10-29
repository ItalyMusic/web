import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation Component with Glassmorphism Hamburger Menu
 * 
 * Features:
 * - Persistent hamburger icon (☰) in top-right
 * - Glass-blur overlay menu panel
 * - Bottom-to-top hover animation on menu items
 * - Color transition from white to #732638 on hover
 * - Smooth open/close transitions
 * - Keyboard accessible (Tab, Enter, Escape)
 * - ARIA labels for accessibility
 */

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Menu items extracted from Imperial College Egypt website
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/academics', label: 'Academics' },
    { path: '/news', label: 'News & Events' },
    { path: '/contact', label: 'Contact Us' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  return (
    <>
      {/* Hamburger Icon - Always visible in top-right */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          className="hamburger-icon p-3 glass-panel"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="navigation-menu"
          tabIndex={0}
        >
          <span className="block text-4xl leading-none" aria-hidden="true">
            {isMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div
          className={`menu-overlay ${isMenuOpen ? 'animate-fade-in' : 'animate-fade-out'}`}
          onClick={() => setIsMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-title"
        >
          {/* Menu Panel */}
          <div
            className={`menu-panel ml-auto ${isMenuOpen ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}
            onClick={(e) => e.stopPropagation()}
            id="navigation-menu"
          >
            {/* Menu Header */}
            <div className="mb-12">
              <h2 id="menu-title" className="text-3xl font-bold text-white mb-2">
                Menu
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-imperial-burgundy to-transparent"></div>
            </div>

            {/* Menu Items */}
            <nav aria-label="Main navigation">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`menu-item ${
                        location.pathname === item.path ? 'text-imperial-burgundy' : ''
                      }`}
                      tabIndex={0}
                      aria-current={location.pathname === item.path ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info in Menu */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">
                Contact
              </h3>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:info@imperialcollegeegypt.edu.eg"
                  className="block text-white hover:text-imperial-burgundy transition-colors duration-220"
                  tabIndex={0}
                >
                  info@imperialcollegeegypt.edu.eg
                </a>
                <div className="space-y-1">
                  <a
                    href="tel:01033313248"
                    className="block text-white hover:text-imperial-burgundy transition-colors duration-220"
                    tabIndex={0}
                  >
                    01033313248
                  </a>
                  <a
                    href="tel:01050239226"
                    className="block text-white hover:text-imperial-burgundy transition-colors duration-220"
                    tabIndex={0}
                  >
                    01050239226
                  </a>
                  <a
                    href="tel:01050239227"
                    className="block text-white hover:text-imperial-burgundy transition-colors duration-220"
                    tabIndex={0}
                  >
                    01050239227
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
