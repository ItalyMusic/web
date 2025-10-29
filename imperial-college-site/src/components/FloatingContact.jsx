import { Link } from 'react-router-dom';

/**
 * Floating Contact Button Component
 * Fixed position button that links to the contact page
 * Features glassmorphism design with hover effects
 */

const FloatingContact = () => {
  return (
    <Link
      to="/contact"
      className="floating-contact group"
      aria-label="Contact us"
      title="Contact Us"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 transition-transform duration-220 group-hover:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </Link>
  );
};

export default FloatingContact;
