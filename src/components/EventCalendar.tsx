import React, { useState, useEffect } from 'react';
import { Calendar, Download, Star, Moon, Sun, Telescope, Filter, ChevronDown } from 'lucide-react';

interface AstronomicalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'eclipse' | 'meteor-shower' | 'planetary' | 'lunar' | 'solar' | 'conjunction' | 'other';
  description: string;
  visibility: 'worldwide' | 'northern-hemisphere' | 'southern-hemisphere' | 'india' | 'local';
  magnitude?: number;
  duration?: string;
}

const EventCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [events, setEvents] = useState<AstronomicalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy astronomical events data
  const astronomicalEvents: AstronomicalEvent[] = [
    {
      id: '1',
      title: 'Total Solar Eclipse',
      date: '2024-04-08',
      time: '18:17 UTC',
      type: 'eclipse',
      description: 'A total solar eclipse will be visible across North America, with the path of totality crossing Mexico, the United States, and Canada.',
      visibility: 'northern-hemisphere',
      duration: '4 minutes 28 seconds'
    },
    {
      id: '2',
      title: 'Lyrid Meteor Shower Peak',
      date: '2024-04-22',
      time: '22:00 UTC',
      type: 'meteor-shower',
      description: 'The Lyrid meteor shower reaches its peak, producing up to 20 meteors per hour. Best viewed in dark skies after midnight.',
      visibility: 'worldwide',
      magnitude: 20
    },
    {
      id: '3',
      title: 'Jupiter-Venus Conjunction',
      date: '2024-05-12',
      time: '19:30 UTC',
      type: 'conjunction',
      description: 'Jupiter and Venus will appear very close together in the evening sky, separated by less than 1 degree.',
      visibility: 'worldwide',
      duration: '2 hours'
    },
    {
      id: '4',
      title: 'Partial Lunar Eclipse',
      date: '2024-09-18',
      time: '02:44 UTC',
      type: 'eclipse',
      description: 'A partial lunar eclipse will be visible from Europe, Africa, Asia, and Australia. The Moon will be partially covered by Earth\'s shadow.',
      visibility: 'india',
      duration: '3 hours 28 minutes'
    },
    {
      id: '5',
      title: 'Perseid Meteor Shower Peak',
      date: '2024-08-12',
      time: '21:00 UTC',
      type: 'meteor-shower',
      description: 'One of the most spectacular meteor showers of the year, producing up to 60 meteors per hour at its peak.',
      visibility: 'northern-hemisphere',
      magnitude: 60
    },
    {
      id: '6',
      title: 'Mars Opposition',
      date: '2024-01-16',
      time: '20:00 UTC',
      type: 'planetary',
      description: 'Mars reaches opposition, appearing at its brightest and largest in the night sky. Perfect time for telescopic observation.',
      visibility: 'worldwide',
      magnitude: -1.3
    },
    {
      id: '7',
      title: 'Geminid Meteor Shower Peak',
      date: '2024-12-14',
      time: '01:00 UTC',
      type: 'meteor-shower',
      description: 'The most reliable meteor shower of the year, producing up to 120 multicolored meteors per hour.',
      visibility: 'worldwide',
      magnitude: 120
    },
    {
      id: '8',
      title: 'Saturn at Opposition',
      date: '2024-09-08',
      time: '04:00 UTC',
      type: 'planetary',
      description: 'Saturn reaches opposition, offering the best views of the ringed planet and its moons through telescopes.',
      visibility: 'worldwide',
      magnitude: 0.4
    },
    {
      id: '9',
      title: 'Supermoon',
      date: '2024-10-17',
      time: '11:26 UTC',
      type: 'lunar',
      description: 'The Moon reaches its closest approach to Earth, appearing larger and brighter than usual.',
      visibility: 'worldwide',
      duration: 'All night'
    },
    {
      id: '10',
      title: 'Quadrantid Meteor Shower Peak',
      date: '2024-01-04',
      time: '03:00 UTC',
      type: 'meteor-shower',
      description: 'The first major meteor shower of the year, known for its bright fireball meteors.',
      visibility: 'northern-hemisphere',
      magnitude: 40
    }
  ];

  useEffect(() => {
    // Set dummy data with simulated loading
    setLoading(true);
    setTimeout(() => {
      setEvents(astronomicalEvents);
      setLoading(false);
    }, 500);
  }, []);

  const eventTypes = [
    { key: 'all', label: 'All Events', icon: Star },
    { key: 'eclipse', label: 'Eclipses', icon: Moon },
    { key: 'meteor-shower', label: 'Meteor Showers', icon: Star },
    { key: 'planetary', label: 'Planetary Events', icon: Sun },
    { key: 'lunar', label: 'Lunar Events', icon: Moon },
    { key: 'conjunction', label: 'Conjunctions', icon: Telescope },
    { key: 'other', label: 'Other Events', icon: Star }
  ];

  const months = [
    { key: 'all', label: 'All Months' },
    { key: 1, label: 'January' }, { key: 2, label: 'February' }, { key: 3, label: 'March' },
    { key: 4, label: 'April' }, { key: 5, label: 'May' }, { key: 6, label: 'June' },
    { key: 7, label: 'July' }, { key: 8, label: 'August' }, { key: 9, label: 'September' },
    { key: 10, label: 'October' }, { key: 11, label: 'November' }, { key: 12, label: 'December' }
  ];

  const years = [2023, 2024, 2025, 2026];

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const eventYear = eventDate.getFullYear();
    const eventMonth = eventDate.getMonth() + 1;

    const yearMatch = eventYear === selectedYear;
    const monthMatch = selectedMonth === 'all' || eventMonth === selectedMonth;
    const typeMatch = selectedType === 'all' || event.type === selectedType;

    return yearMatch && monthMatch && typeMatch;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'eclipse': return <Moon className="h-5 w-5" />;
      case 'meteor-shower': return <Star className="h-5 w-5" />;
      case 'planetary': return <Sun className="h-5 w-5" />;
      case 'lunar': return <Moon className="h-5 w-5" />;
      case 'conjunction': return <Telescope className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'eclipse': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meteor-shower': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planetary': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'lunar': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'conjunction': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateCalendarPDF = () => {
    // Create a simple text-based calendar content
    const calendarContent = `
ASTRONOMICAL EVENTS CALENDAR ${selectedYear}

Generated by Prof. Amal Kumar Roychaudhury Center for Astronomical Research
University of Engineering and Management, Kolkata

${filteredEvents.map(event => `
${formatDate(event.date)} - ${event.time}
${event.title}
Type: ${event.type.replace('-', ' ').toUpperCase()}
${event.description}
Visibility: ${event.visibility.replace('-', ' ').toUpperCase()}
${event.duration ? `Duration: ${event.duration}` : ''}
${event.magnitude ? `Magnitude/Rate: ${event.magnitude}` : ''}
${'='.repeat(80)}
`).join('')}

For more information, visit: https://pakrc.uem.edu.in
Contact: pakrc@uem.edu.in | +91 33 6652 4444

© ${new Date().getFullYear()} Prof. Amal Kumar Roychaudhury Center for Astronomical Research
    `.trim();

    const blob = new Blob([calendarContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Astronomical_Events_Calendar_${selectedYear}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <section id="event-calendar" className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading astronomical events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="event-calendar" className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 lg:mb-20">
          <Calendar className="h-16 w-16 text-blue-900 mx-auto mb-6" />
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-4 font-serif">Astronomical Events Calendar</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Discover upcoming celestial events, eclipses, meteor showers, and planetary phenomena visible from our observatory
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
        </div>

        {/* Filters and Download */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8 lg:mb-12 mx-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Year Filter */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-300 bg-white"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Month Filter */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-300 bg-white"
                >
                  {months.map(month => (
                    <option key={month.key} value={month.key}>{month.label}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-300 bg-white"
                >
                  {eventTypes.map(type => (
                    <option key={type.key} value={type.key}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={generateCalendarPDF}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3"
              >
                <Download className="h-5 w-5" />
                Download Calendar
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Get events for {selectedYear}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-700 mr-2">Quick Filters:</span>
              {eventTypes.slice(1).map(type => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.key}
                    onClick={() => setSelectedType(type.key)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedType === type.key
                        ? 'bg-blue-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="h-3 w-3" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getEventColor(event.type)}`}>
                    {getEventIcon(event.type)}
                    {event.type.replace('-', ' ').toUpperCase()}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{formatDate(event.date)}</p>
                    <p className="text-xs text-gray-600">{event.time}</p>
                  </div>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-3 font-serif leading-tight">
                  {event.title}
                </h3>

                <p className="text-gray-700 mb-4 leading-relaxed text-sm lg:text-base">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-600">Visibility:</span>
                    <span className="text-gray-800 capitalize">{event.visibility.replace('-', ' ')}</span>
                  </div>
                  {event.duration && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-600">Duration:</span>
                      <span className="text-gray-800">{event.duration}</span>
                    </div>
                  )}
                  {event.magnitude && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-600">
                        {event.type === 'meteor-shower' ? 'Rate/Hour:' : 'Magnitude:'}
                      </span>
                      <span className="text-gray-800">
                        {event.type === 'meteor-shower' ? `${event.magnitude} meteors` : event.magnitude}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-300 text-sm">
                    View Details
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold transition-colors duration-300 text-sm">
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 mx-4">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">No astronomical events match your current filters for {selectedYear}.</p>
            <button
              onClick={() => {
                setSelectedMonth('all');
                setSelectedType('all');
              }}
              className="mt-4 bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Observatory Information */}
        <div className="mt-12 lg:mt-16 bg-white rounded-2xl shadow-lg p-6 lg:p-8 mx-4">
          <div className="text-center">
            <Telescope className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-4 font-serif">Observe with Us</h3>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
              Join us at the UEM Space Observatory to witness these spectacular celestial events through our 
              Skywatcher EQ6 Pro telescope. Our 9.85 feet diameter dome provides optimal viewing conditions 
              for astronomical observations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                Book Observatory Visit
              </a>
              <a
                href="#events"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                View Our Events
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;