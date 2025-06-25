import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Download, ExternalLink } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'upcoming' | 'ongoing' | 'past';
  bannerImage?: string;
  registrationLink?: string;
  venue: string;
  speakers: Array<{
    name: string;
    designation: string;
    institution: string;
  }>;
  registrationOpen: boolean;
}

const Events = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'past'>('upcoming');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback mock data for development
      setEvents([
        {
          _id: '1',
          title: 'Black Holes and Gravitational Waves',
          description: 'An in-depth seminar on the latest discoveries in gravitational wave astronomy and their implications for our understanding of black holes.',
          date: '2024-02-15',
          time: '14:00',
          status: 'upcoming',
          bannerImage: 'https://images.pexels.com/photos/87009/earth-solar-system-universe-planet-87009.jpeg?auto=compress&cs=tinysrgb&w=800',
          registrationLink: '#register',
          venue: 'UEM Kolkata Auditorium',
          speakers: [
            {
              name: 'Dr. Rajesh Kumar',
              designation: 'Professor',
              institution: 'Indian Institute of Astrophysics'
            }
          ],
          registrationOpen: true
        },
        {
          _id: '2',
          title: 'Exoplanet Discovery Workshop',
          description: 'Interactive workshop on methods and techniques used in discovering and characterizing exoplanets.',
          date: '2024-01-20',
          time: '10:00',
          status: 'ongoing',
          venue: 'Observatory Lab',
          speakers: [],
          registrationOpen: false
        },
        {
          _id: '3',
          title: 'Stellar Evolution and Supernovae',
          description: 'Conference on stellar lifecycle, from formation to dramatic supernova explosions.',
          date: '2023-12-10',
          time: '09:30',
          status: 'past',
          venue: 'UEM Conference Hall',
          speakers: [],
          registrationOpen: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => event.status === activeTab);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateCalendarEvent = (event: Event) => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PAKRC//Event Calendar//EN
BEGIN:VEVENT
UID:${event._id}@pakrc.uem.edu.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.venue}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '-')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: events.filter(e => e.status === 'upcoming').length },
    { key: 'ongoing', label: 'Ongoing', count: events.filter(e => e.status === 'ongoing').length },
    { key: 'past', label: 'Past', count: events.filter(e => e.status === 'past').length }
  ];

  if (loading) {
    return (
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl font-bold text-blue-900 mb-4 font-serif">Events & Conferences</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Join us for engaging seminars, workshops, and conferences that bring together the global astronomy community
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 lg:mb-16 px-4">
          <div className="bg-gray-100 p-1.5 rounded-xl shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-blue-900 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-blue-900 hover:bg-white'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {event.bannerImage && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                    event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-blue-900 mb-3 font-serif">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-amber-600" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  {event.venue && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                  )}
                </div>

                {event.speakers.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 mr-2 text-amber-600" />
                      <span className="text-sm font-semibold text-gray-700">Speakers:</span>
                    </div>
                    <div className="space-y-1">
                      {event.speakers.map((speaker, index) => (
                        <p key={index} className="text-xs text-gray-600">
                          {speaker.name}, {speaker.designation}, {speaker.institution}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => generateCalendarEvent(event)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Add to Calendar
                  </button>
                  
                  {event.registrationOpen && event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Register
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No {activeTab} events</h3>
            <p className="text-gray-500">Check back later for updates on our upcoming events.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;