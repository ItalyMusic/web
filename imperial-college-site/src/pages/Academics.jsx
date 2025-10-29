import { Link } from 'react-router-dom';

/**
 * Academics Page Component
 * Content based on Imperial College Egypt website
 * 
 * Sections:
 * - Curriculum Overview
 * - British Curriculum
 * - American Curriculum
 * - Student Empowerment Programs
 * - Extracurricular Activities
 */

const Academics = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="content-container pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="section-heading mb-8">ACADEMICS & CURRICULUM</h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Imperial College Egypt offers rigorous and challenging academic
            programs delivered through innovative teaching strategies.
          </p>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="content-container py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            CURRICULUM OVERVIEW
          </h2>
          <div className="glass-panel p-8 md:p-12">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
              Our academic programs are designed to provide students with a
              comprehensive education that prepares them for success in an
              increasingly interconnected world. We offer both British and
              American curricula, allowing families to choose the educational
              pathway that best suits their child's needs and future goals.
            </p>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Each curriculum is delivered by experienced educators who employ a
              variety of teaching strategies to engage students, promote
              critical thinking, and foster a love of learning. Our approach
              balances rigorous academics with practical, real-world
              applications.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            PROGRAMS ADOPTED BY IMPERIAL
          </h2>
          <p className="text-xl text-white/80">
            Choose the pathway that's right for your child
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* British Curriculum */}
          <div className="glass-panel p-8 md:p-10">
            <div className="text-6xl mb-6 text-center">🇬🇧</div>
            <h3 className="text-3xl font-bold mb-6 text-center">
              THE BRITISH CURRICULUM
            </h3>
            <div className="space-y-4 text-white/80">
              <p className="leading-relaxed">
                The British curriculum follows the National Curriculum for
                England, providing a structured and comprehensive education from
                Early Years through to IGCSE and A-Levels.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-imperial-burgundy mr-3 text-xl">✓</span>
                  <p>
                    <strong>Early Years Foundation Stage (EYFS):</strong>{' '}
                    Play-based learning for ages 3-5
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-imperial-burgundy mr-3 text-xl">✓</span>
                  <p>
                    <strong>Key Stages 1-3:</strong> Core subjects including
                    English, Mathematics, Science, and Humanities
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-imperial-burgundy mr-3 text-xl">✓</span>
                  <p>
                    <strong>IGCSE (Key Stage 4):</strong> International
                    qualifications recognized worldwide
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-imperial-burgundy mr-3 text-xl">✓</span>
                  <p>
                    <strong>A-Levels:</strong> Advanced study in chosen subjects
                    for university preparation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* American Curriculum */}
          <div className="glass-panel p-8 md:p-10">
            <div className="text-6xl mb-6 text-center">🇺🇸</div>
            <h3 className="text-3xl font-bold mb-6 text-center">
              THE AMERICAN CURRICULUM
            </h3>
            <div className="space-y-4 text-white/80">
              <p className="leading-relaxed">
                The American curriculum offers a flexible, student-centered
                approach that emphasizes critical thinking, creativity, and
                practical application of knowledge.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-imperial-burgundy mr-3 text-xl">✓</span>
                  <p>
                    <strong>Elementary School:</strong> Foundation in core
                    subjects with emphasis on literacy and numeracy
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-imperial-burgundy mr-3 text-xl">✓</span>
                  <p>
                    <strong>Middle School:</strong> Broader curriculum with
                    elective options and skill development
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-imperial-burgundy mr-3 text-xl">✓</span>
                  <p>
                    <strong>High School:</strong> Advanced Placement (AP)
                    courses and college preparation
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-imperial-burgundy mr-3 text-xl">✓</span>
                  <p>
                    <strong>American Diploma:</strong> Recognized by
                    universities worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Empowerment Programs */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            STUDENT EMPOWERMENT PROGRAMS
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Beyond academics, we offer programs designed to develop leadership,
            character, and life skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 text-center">🎯</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Leadership Development
            </h3>
            <p className="text-white/80 text-center text-sm">
              Programs that cultivate leadership skills, decision-making
              abilities, and confidence in students.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 text-center">🌍</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Global Citizenship
            </h3>
            <p className="text-white/80 text-center text-sm">
              Initiatives that promote cultural awareness, social
              responsibility, and environmental stewardship.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 text-center">🧠</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Critical Thinking
            </h3>
            <p className="text-white/80 text-center text-sm">
              Activities that challenge students to analyze, evaluate, and
              create solutions to complex problems.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 text-center">💬</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Communication Skills
            </h3>
            <p className="text-white/80 text-center text-sm">
              Training in public speaking, debate, and effective written and
              verbal communication.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 text-center">🤝</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Collaboration
            </h3>
            <p className="text-white/80 text-center text-sm">
              Team-based projects that teach cooperation, conflict resolution,
              and collective problem-solving.
            </p>
          </div>

          <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 text-center">🎓</div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Academic Excellence
            </h3>
            <p className="text-white/80 text-center text-sm">
              Support programs including tutoring, study skills workshops, and
              academic counseling.
            </p>
          </div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            EXTRACURRICULAR ACTIVITIES
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A rich variety of activities to explore interests and develop new
            skills
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '⚽', name: 'Sports' },
            { icon: '🎨', name: 'Arts' },
            { icon: '🎵', name: 'Music' },
            { icon: '🎭', name: 'Drama' },
            { icon: '🤖', name: 'Robotics' },
            { icon: '📚', name: 'Book Club' },
            { icon: '🔬', name: 'Science Club' },
            { icon: '🌱', name: 'Environmental Club' },
          ].map((activity, index) => (
            <div
              key={index}
              className="glass-panel p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-2">{activity.icon}</div>
              <p className="font-semibold">{activity.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="content-container py-20">
        <div className="glass-panel p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            LEARN MORE ABOUT OUR PROGRAMS
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Contact us to discuss which curriculum and programs are right for
            your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="glass-button text-lg">
              Schedule a Consultation
            </Link>
            <Link to="/about" className="glass-button text-lg">
              Visit Our Campus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
