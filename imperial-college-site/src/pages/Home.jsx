import { Link } from 'react-router-dom';

/**
 * Home Page Component
 * Content extracted from: https://imperialcollegeegypt.edu.eg
 * 
 * Sections:
 * - Hero/Welcome section
 * - Investment in Education
 * - Why Choose Imperial College Egypt (3 pillars)
 * - Call to Action
 * - Academics Overview
 * - Latest News
 */

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="content-container pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="section-heading mb-8 animate-fade-in">
            WELCOME TO
            <br />
            IMPERIAL COLLEGE EGYPT
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Empowering students through a balanced, inclusive, and dynamic
            learning experience
          </p>
          <Link
            to="/contact"
            className="glass-button inline-block text-lg"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Announcements */}
      <section className="content-container py-12">
        <div className="glass-panel p-6 max-w-4xl mx-auto">
          <div className="space-y-4 text-sm md:text-base">
            <p className="text-white/90">
              📢 School Uniform is now available at the Uniform Store (Sun. to
              Thurs. from 08:00 am to 02:00 pm)
            </p>
            <p className="text-white/90">
              📅 Wednesday 8th October 2025: 1st Recharge Gathering conducted
              by Ms. Dina El Nahas
            </p>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="content-container py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            INVEST IN YOUR CHILD'S FUTURE
          </h2>
          <div className="glass-panel p-8 md:p-12">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed text-center">
              At Imperial College Egypt, we take immense pride in our inclusive
              and holistic approach to education, which is designed to empower
              every student to achieve their full potential and become a
              responsible, compassionate global citizen. Our commitment to
              fostering an environment where each child feels valued, respected,
              and inspired is at the heart of everything we do.
            </p>
            <div className="text-center mt-8">
              <Link to="/about" className="glass-button inline-block">
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Imperial - 3 Pillars */}
      <section className="content-container py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            WHY CHOOSE IMPERIAL COLLEGE EGYPT?
          </h2>
          <p className="text-xl text-white/80">
            Empowering students through a balanced, inclusive, and dynamic
            learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Comprehensive Education */}
          <div className="glass-panel p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-6 text-center">📚</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              COMPREHENSIVE EDUCATION
            </h3>
            <p className="text-white/80 leading-relaxed text-center">
              Our inclusive approach ensures every child is engaged, valued, and
              prepared to succeed, guided by expert teachers who foster growth
              in a supportive environment.
            </p>
          </div>

          {/* Pillar 2: World-Class Facilities */}
          <div className="glass-panel p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-6 text-center">🏫</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              WORLD-CLASS FACILITIES
            </h3>
            <p className="text-white/80 leading-relaxed text-center mb-4">
              With state-of-the-art labs, a well-equipped library, sports
              complexes, and creative spaces, we provide a vibrant learning
              environment that meets global standards.
            </p>
            <div className="text-center">
              <Link to="/about" className="link-hover text-sm">
                Learn more →
              </Link>
            </div>
          </div>

          {/* Pillar 3: Student-Centered Programs */}
          <div className="glass-panel p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-6 text-center">🎓</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              STUDENT-CENTERED PROGRAMS
            </h3>
            <p className="text-white/80 leading-relaxed text-center mb-4">
              Offering both British and American curricula, we cater to diverse
              learning needs, blending rigorous academics with practical,
              real-world applications.
            </p>
            <div className="text-center">
              <Link to="/academics" className="link-hover text-sm">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="content-container py-20">
        <div className="glass-panel p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">LET'S GET STARTED</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="glass-button text-lg">
              Request Information
            </Link>
            <Link to="/contact" className="glass-button text-lg">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Academics Overview */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            EXPLORE ACADEMICS & CURRICULUM
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Imperial College Egypt offers rigorous and challenging academic
            programs that are delivered through a variety of teaching
            strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">🇬🇧</div>
            <h3 className="text-xl font-semibold">The British Curriculum</h3>
          </div>
          <div className="glass-panel p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">🇺🇸</div>
            <h3 className="text-xl font-semibold">The American Curriculum</h3>
          </div>
          <div className="glass-panel p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold">Adopted by ICE</h3>
          </div>
          <div className="glass-panel p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold">
              Extra-Curricular Activities
            </h3>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/academics" className="glass-button text-lg">
            View All Programs
          </Link>
        </div>
      </section>

      {/* Latest News */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">LATEST NEWS</h2>
          <p className="text-xl text-white/80">
            What's happening in Imperial College Egypt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-white/60 mb-2">February 2025</div>
            <h3 className="text-xl font-semibold mb-4">IMPERIAL PRESS</h3>
            <p className="text-white/80 mb-4">
              Latest updates and achievements from our school community.
            </p>
            <Link to="/news" className="link-hover text-sm">
              Read More →
            </Link>
          </div>
          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-white/60 mb-2">January 2025</div>
            <h3 className="text-xl font-semibold mb-4">IMPERIAL PRESS</h3>
            <p className="text-white/80 mb-4">
              Highlights from the start of the new year.
            </p>
            <Link to="/news" className="link-hover text-sm">
              Read More →
            </Link>
          </div>
          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-white/60 mb-2">December 2024</div>
            <h3 className="text-xl font-semibold mb-4">IMPERIAL PRESS</h3>
            <p className="text-white/80 mb-4">
              Year-end celebrations and student achievements.
            </p>
            <Link to="/news" className="link-hover text-sm">
              Read More →
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/news" className="glass-button text-lg">
            Explore All News
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
