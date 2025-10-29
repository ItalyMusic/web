import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import FloatingContact from './FloatingContact';

/**
 * Layout Component
 * Wraps all pages with consistent navigation and floating contact button
 */

const Layout = () => {
  return (
    <div className="min-h-screen relative">
      {/* Navigation with Hamburger Menu */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Outlet />
      </main>
      
      {/* Floating Contact Button */}
      <FloatingContact />
      
      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-white/10">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-white/80">
                <p>
                  <a
                    href="mailto:info@imperialcollegeegypt.edu.eg"
                    className="link-hover"
                  >
                    info@imperialcollegeegypt.edu.eg
                  </a>
                </p>
                <p>
                  <a href="tel:01033313248" className="link-hover">
                    01033313248
                  </a>
                </p>
                <p>
                  <a href="tel:01050239226" className="link-hover">
                    01050239226
                  </a>
                </p>
                <p>
                  <a href="tel:01050239227" className="link-hover">
                    01050239227
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <a href="/" className="link-hover">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="link-hover">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/academics" className="link-hover">
                    Academics
                  </a>
                </li>
                <li>
                  <a href="/news" className="link-hover">
                    News & Events
                  </a>
                </li>
                <li>
                  <a href="/contact" className="link-hover">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">Imperial College Egypt</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Empowering students through a balanced, inclusive, and dynamic
                learning experience with world-class facilities and
                comprehensive education.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} Imperial College Egypt. All rights
              reserved.
            </p>
            <p className="mt-2 text-xs">
              Content sourced from{' '}
              <a
                href="https://imperialcollegeegypt.edu.eg"
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover"
              >
                imperialcollegeegypt.edu.eg
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
