import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, GraduationCap } from 'lucide-react';

interface Member {
  _id: string;
  name: string;
  email: string;
  institution: string;
  designation: string;
  areaOfInterest: string;
  memberType: 'faculty-mentor' | 'core-committee' | 'student-researcher';
  photo?: string;
  profile?: string;
  status: 'approved';
}

const Members = () => {
  const [activeCategory, setActiveCategory] = useState<'faculty-mentor' | 'core-committee' | 'student-researcher'>('faculty-mentor');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members?status=approved');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      // Fallback mock data for development
      setMembers([
        {
          _id: '1',
          name: 'Prof. Amal Kumar Roychaudhury',
          email: 'amal.roy@uem.edu.in',
          institution: 'University of Engineering and Management, Kolkata',
          designation: 'Director & Professor',
          areaOfInterest: 'Gravitational Wave Astronomy, Black Hole Physics',
          memberType: 'faculty-mentor',
          photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
          profile: 'Leading expert in gravitational wave research with over 20 years of experience in theoretical astrophysics.',
          status: 'approved'
        },
        {
          _id: '2',
          name: 'Dr. Priya Sharma',
          email: 'priya.sharma@uem.edu.in',
          institution: 'University of Engineering and Management, Kolkata',
          designation: 'Associate Professor',
          areaOfInterest: 'Exoplanet Detection, Transit Photometry',
          memberType: 'faculty-mentor',
          photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
          profile: 'Specialist in exoplanet research with expertise in data analysis and astronomical instrumentation.',
          status: 'approved'
        },
        {
          _id: '3',
          name: 'Dr. Rajesh Kumar',
          email: 'rajesh.kumar@uem.edu.in',
          institution: 'University of Engineering and Management, Kolkata',
          designation: 'Research Coordinator',
          areaOfInterest: 'Stellar Evolution, Computational Astrophysics',
          memberType: 'core-committee',
          photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
          profile: 'Coordinates research activities and manages collaborative projects with national and international institutions.',
          status: 'approved'
        },
        {
          _id: '4',
          name: 'Ms. Anita Das',
          email: 'anita.das@student.uem.edu.in',
          institution: 'University of Engineering and Management, Kolkata',
          designation: 'PhD Student',
          areaOfInterest: 'Galaxy Formation, Cosmological Simulations',
          memberType: 'student-researcher',
          photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
          profile: 'PhD candidate working on large-scale structure formation and galaxy evolution models.',
          status: 'approved'
        },
        {
          _id: '5',
          name: 'Mr. Vikram Joshi',
          email: 'vikram.joshi@student.uem.edu.in',
          institution: 'University of Engineering and Management, Kolkata',
          designation: 'MSc Student',
          areaOfInterest: 'Machine Learning in Astronomy, Data Mining',
          memberType: 'student-researcher',
          photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          profile: 'Masters student developing AI algorithms for astronomical data analysis and pattern recognition.',
          status: 'approved'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'faculty-mentor', label: 'Faculty Mentors', icon: GraduationCap },
    { key: 'core-committee', label: 'Core Committee', icon: User },
    { key: 'student-researcher', label: 'Student Researchers', icon: User }
  ];

  const filteredMembers = members.filter(member => member.memberType === activeCategory);

  if (loading) {
    return (
      <section id="members" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading members...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="members" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl font-bold text-blue-900 mb-4 font-serif">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Meet the dedicated faculty, researchers, and students driving innovation in astronomical research
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16 px-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-blue-900 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:text-blue-900 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <div className="h-64 overflow-hidden bg-gray-200">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
                      <User className="h-24 w-24 text-white opacity-60" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white font-serif">{member.name}</h3>
                  <p className="text-amber-200 font-medium">{member.designation}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-amber-600 flex-shrink-0" />
                    <span className="text-sm">{member.institution}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-amber-600 flex-shrink-0" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm hover:text-blue-900 transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Research Interests:</h4>
                  <p className="text-sm text-gray-600">{member.areaOfInterest}</p>
                </div>

                {member.profile && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Profile:</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.profile}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
                    View Profile
                  </button>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 text-center"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No members found</h3>
            <p className="text-gray-500">No members in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Members;