/**
 * News & Events Page Component
 * Content based on Imperial College Egypt website
 * 
 * Sections:
 * - Latest News (Imperial Press)
 * - School Calendar
 * - Upcoming Events
 */

const News = () => {
  const newsItems = [
    {
      date: 'February 2025',
      title: 'IMPERIAL PRESS - February Edition',
      excerpt:
        'Celebrating student achievements, highlighting academic excellence, and showcasing our vibrant school community activities from the past month.',
      category: 'Newsletter',
    },
    {
      date: 'January 2025',
      title: 'IMPERIAL PRESS - January Edition',
      excerpt:
        'New year, new beginnings! Read about our exciting initiatives, student success stories, and upcoming programs for the spring semester.',
      category: 'Newsletter',
    },
    {
      date: 'December 2024',
      title: 'IMPERIAL PRESS - December Edition',
      excerpt:
        'Year-end celebrations, winter performances, and a look back at the incredible achievements of our students throughout 2024.',
      category: 'Newsletter',
    },
    {
      date: 'November 2024',
      title: 'Annual Science Fair Success',
      excerpt:
        'Our students showcased innovative projects at the annual science fair, demonstrating creativity and scientific thinking.',
      category: 'Event',
    },
    {
      date: 'October 2024',
      title: 'Sports Day Highlights',
      excerpt:
        'An exciting day of athletic competition, teamwork, and school spirit as students participated in various sporting events.',
      category: 'Event',
    },
    {
      date: 'September 2024',
      title: 'Welcome Back Assembly',
      excerpt:
        'The school year kicked off with an inspiring assembly welcoming new and returning students to Imperial College Egypt.',
      category: 'Event',
    },
  ];

  const upcomingEvents = [
    {
      date: 'October 5, 2025',
      title: 'School Closed for 6th of October Occasion',
      time: 'All Day',
      type: 'Holiday',
    },
    {
      date: 'October 8, 2025',
      title: '1st Recharge Gathering by Ms. Dina El Nahas',
      time: '9:00 AM - 11:00 AM',
      type: 'Academic Event',
    },
    {
      date: 'October 15, 2025',
      title: 'Parent-Teacher Conferences',
      time: '2:00 PM - 6:00 PM',
      type: 'Academic Event',
    },
    {
      date: 'October 22, 2025',
      title: 'Fall Festival',
      time: '10:00 AM - 3:00 PM',
      type: 'Non-academic Event',
    },
    {
      date: 'October 29, 2025',
      title: 'Halloween Celebration',
      time: '1:00 PM - 4:00 PM',
      type: 'Non-academic Event',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="content-container pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="section-heading mb-8">NEWS & EVENTS</h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Stay updated with the latest happenings at Imperial College Egypt
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="content-container py-20">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">LATEST NEWS</h2>
          <p className="text-xl text-white/80">
            What's happening in Imperial College Egypt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="glass-panel p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-imperial-burgundy bg-white/10 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-sm text-white/60">{item.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                {item.excerpt}
              </p>
              <button className="text-sm link-hover">Read More →</button>
            </div>
          ))}
        </div>
      </section>

      {/* School Calendar */}
      <section className="content-container py-20">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            SCHOOL CALENDAR
          </h2>
          <p className="text-xl text-white/80">
            Mark your calendars for upcoming events
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 max-w-5xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold">October 2025</h3>
            <span className="text-sm text-white/60">
              {upcomingEvents.length} events found
            </span>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors duration-220"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-imperial-burgundy bg-white/10 px-3 py-1 rounded-full">
                        {event.type}
                      </span>
                      <span className="text-sm text-white/60">
                        {event.time}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-white/60">{event.date}</p>
                  </div>
                  <button className="glass-button text-sm px-4 py-2 self-start md:self-center">
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            EVENT CATEGORIES
          </h2>
          <p className="text-xl text-white/80">
            Explore different types of events at our school
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-panel p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4 text-center">📚</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Academic Events
            </h3>
            <p className="text-white/80 text-center leading-relaxed">
              Parent-teacher conferences, academic assemblies, curriculum
              nights, and educational workshops that support student learning
              and family engagement.
            </p>
          </div>

          <div className="glass-panel p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4 text-center">🎉</div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Non-Academic Events
            </h3>
            <p className="text-white/80 text-center leading-relaxed">
              School festivals, sports days, cultural celebrations, talent
              shows, and community gatherings that build school spirit and
              connections.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="content-container py-20">
        <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            CURRENT ANNOUNCEMENTS
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📢</span>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    School Uniform Available
                  </h3>
                  <p className="text-white/80 text-sm">
                    School Uniform is now available at the Uniform Store.
                    Opening hours: Sunday to Thursday from 08:00 AM to 02:00
                    PM.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📅</span>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Recharge Gathering
                  </h3>
                  <p className="text-white/80 text-sm">
                    Join us on Wednesday, October 8th, 2025 for the 1st
                    Recharge Gathering conducted by Ms. Dina El Nahas from 9:00
                    AM to 11:00 AM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="content-container py-20">
        <div className="glass-panel p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            STAY INFORMED
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Subscribe to our newsletter to receive the latest news and updates
            directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-imperial-burgundy transition-colors"
              aria-label="Email address"
            />
            <button className="glass-button px-6 py-3">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
