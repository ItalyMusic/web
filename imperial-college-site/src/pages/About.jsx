import { Link } from 'react-router-dom';

/**
 * About Us Page Component
 * Content based on Imperial College Egypt website structure
 * 
 * Sections:
 * - Educational Philosophy
 * - Our Faculty
 * - Our Facility
 */

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="content-container pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="section-heading mb-8">ABOUT US</h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Discover our commitment to excellence in education and our vision
            for empowering the next generation of global citizens.
          </p>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="content-container py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            OUR EDUCATIONAL PHILOSOPHY
          </h2>
          <div className="glass-panel p-8 md:p-12">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
              At Imperial College Egypt, we believe that education extends far
              beyond the classroom. Our philosophy is rooted in the conviction
              that every child possesses unique talents and potential waiting to
              be discovered and nurtured.
            </p>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
              We are committed to providing an inclusive and holistic approach
              to education that empowers every student to achieve their full
              potential. Our curriculum is designed to challenge students
              intellectually while supporting their emotional, social, and
              physical development.
            </p>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Through innovative teaching methods, state-of-the-art facilities,
              and a dedicated faculty, we create an environment where students
              feel valued, respected, and inspired to become responsible,
              compassionate global citizens.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Faculty */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            MEET OUR FACULTY
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our expert teachers are dedicated to fostering growth in a
            supportive and engaging environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-panel p-8">
            <div className="text-5xl mb-4 text-center">👨‍🏫</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Experienced Educators
            </h3>
            <p className="text-white/80 leading-relaxed">
              Our faculty comprises highly qualified and experienced educators
              who are passionate about teaching and committed to student
              success. They bring diverse expertise and innovative teaching
              methods to create engaging learning experiences.
            </p>
          </div>

          <div className="glass-panel p-8">
            <div className="text-5xl mb-4 text-center">🌟</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Continuous Professional Development
            </h3>
            <p className="text-white/80 leading-relaxed">
              We invest in our teachers through ongoing professional development
              programs, ensuring they stay current with the latest educational
              research, teaching strategies, and technological advancements.
            </p>
          </div>

          <div className="glass-panel p-8">
            <div className="text-5xl mb-4 text-center">🤝</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Student-Centered Approach
            </h3>
            <p className="text-white/80 leading-relaxed">
              Our teachers prioritize building strong relationships with
              students, understanding their individual needs, and adapting
              instruction to support diverse learning styles and abilities.
            </p>
          </div>

          <div className="glass-panel p-8">
            <div className="text-5xl mb-4 text-center">💡</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Innovation in Teaching
            </h3>
            <p className="text-white/80 leading-relaxed">
              Our faculty embraces innovative teaching methods, integrating
              technology, project-based learning, and collaborative activities
              to make learning engaging and relevant to real-world applications.
            </p>
          </div>
        </div>
      </section>

      {/* Our Facility */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">OUR FACILITY</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            State-of-the-art infrastructure designed to inspire learning and
            creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4 text-center">🔬</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Science Laboratories
            </h3>
            <p className="text-white/80 text-center">
              Modern, fully-equipped labs for physics, chemistry, and biology
              with the latest equipment for hands-on experiments.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4 text-center">📚</div>
            <h3 className="text-xl font-bold mb-3 text-center">Library</h3>
            <p className="text-white/80 text-center">
              A comprehensive library with thousands of books, digital
              resources, and quiet study spaces for research and reading.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4 text-center">⚽</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Sports Complex
            </h3>
            <p className="text-white/80 text-center">
              Indoor and outdoor sports facilities including courts, fields, and
              a gymnasium for physical education and athletics.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4 text-center">💻</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Computer Labs
            </h3>
            <p className="text-white/80 text-center">
              Advanced computer labs with high-speed internet and the latest
              software for technology education and digital literacy.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4 text-center">🎨</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Creative Spaces
            </h3>
            <p className="text-white/80 text-center">
              Dedicated areas for art, music, and drama with specialized
              equipment to nurture creativity and artistic expression.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4 text-center">🏛️</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Modern Classrooms
            </h3>
            <p className="text-white/80 text-center">
              Spacious, well-lit classrooms equipped with smart boards and
              comfortable seating to create an optimal learning environment.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="content-container py-20">
        <div className="glass-panel p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            READY TO JOIN OUR COMMUNITY?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Discover how Imperial College Egypt can help your child reach their
            full potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="glass-button text-lg">
              Schedule a Visit
            </Link>
            <Link to="/academics" className="glass-button text-lg">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
