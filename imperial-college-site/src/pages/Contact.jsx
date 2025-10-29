import { useState } from 'react';

/**
 * Contact Us Page Component
 * Content extracted from: https://imperialcollegeegypt.edu.eg
 * 
 * Contact Information:
 * - Email: info@imperialcollegeegypt.edu.eg
 * - Phone: 01033313248, 01050239226, 01050239227
 * - Source: Homepage footer and contact sections
 * 
 * Features:
 * - Contact form
 * - Contact information with clickable tel: and mailto: links
 * - Accessibility features
 */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="content-container pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="section-heading mb-8">CONTACT US</h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Get in touch with us. We're here to answer your questions and help
            you discover Imperial College Egypt.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="content-container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                GET IN TOUCH
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Whether you're interested in enrolling your child, scheduling a
                campus tour, or have questions about our programs, we'd love to
                hear from you.
              </p>
            </div>

            {/* Email */}
            <div className="glass-panel p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✉️</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:info@imperialcollegeegypt.edu.eg"
                    className="text-white/80 hover:text-imperial-burgundy transition-colors duration-220 text-lg"
                  >
                    info@imperialcollegeegypt.edu.eg
                  </a>
                  <p className="text-sm text-white/60 mt-2">
                    Source: Homepage footer
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="glass-panel p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📞</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Phone Numbers</h3>
                  <div className="space-y-2">
                    <div>
                      <a
                        href="tel:01033313248"
                        className="text-white/80 hover:text-imperial-burgundy transition-colors duration-220 text-lg block"
                      >
                        01033313248
                      </a>
                    </div>
                    <div>
                      <a
                        href="tel:01050239226"
                        className="text-white/80 hover:text-imperial-burgundy transition-colors duration-220 text-lg block"
                      >
                        01050239226
                      </a>
                    </div>
                    <div>
                      <a
                        href="tel:01050239227"
                        className="text-white/80 hover:text-imperial-burgundy transition-colors duration-220 text-lg block"
                      >
                        01050239227
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mt-3">
                    Source: Homepage footer and contact sections
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="glass-panel p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🕐</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
                  <div className="space-y-2 text-white/80">
                    <p>Sunday - Thursday: 8:00 AM - 3:00 PM</p>
                    <p>Friday - Saturday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6">SEND US A MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-imperial-burgundy transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-imperial-burgundy transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-imperial-burgundy transition-colors"
                  placeholder="Your phone number"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-imperial-burgundy transition-colors"
                >
                  <option value="" className="bg-imperial-dark">
                    Select a subject
                  </option>
                  <option value="admissions" className="bg-imperial-dark">
                    Admissions Inquiry
                  </option>
                  <option value="tour" className="bg-imperial-dark">
                    Schedule a Tour
                  </option>
                  <option value="academics" className="bg-imperial-dark">
                    Academic Programs
                  </option>
                  <option value="general" className="bg-imperial-dark">
                    General Question
                  </option>
                  <option value="other" className="bg-imperial-dark">
                    Other
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-imperial-burgundy transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full glass-button py-4 text-lg font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            WHAT WOULD YOU LIKE TO DO?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-panel p-8 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-3">Apply Now</h3>
            <p className="text-white/80 text-sm mb-4">
              Start your child's journey at Imperial College Egypt
            </p>
            <button className="glass-button text-sm px-6 py-2">
              Begin Application
            </button>
          </div>

          <div className="glass-panel p-8 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4">🏫</div>
            <h3 className="text-xl font-bold mb-3">Schedule a Tour</h3>
            <p className="text-white/80 text-sm mb-4">
              Visit our campus and see our facilities firsthand
            </p>
            <button className="glass-button text-sm px-6 py-2">
              Book a Visit
            </button>
          </div>

          <div className="glass-panel p-8 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3">Request Information</h3>
            <p className="text-white/80 text-sm mb-4">
              Learn more about our programs and curriculum
            </p>
            <button className="glass-button text-sm px-6 py-2">
              Get Info Pack
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
