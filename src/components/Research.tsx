import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Users, Tag, ExternalLink } from 'lucide-react';

interface Research {
  _id: string;
  title: string;
  abstract: string;
  authors: string[];
  year: number;
  type: 'paper' | 'simulation' | 'project';
  downloadLink?: string;
  status: 'published' | 'under-review' | 'in-progress';
  keywords: string[];
  journal?: string;
}

const Research = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'paper' | 'simulation' | 'project'>('all');
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const response = await fetch('/api/research');
      const data = await response.json();
      setResearch(data);
    } catch (error) {
      console.error('Error fetching research:', error);
      // Fallback mock data for development
      setResearch([
        {
          _id: '1',
          title: 'Gravitational Wave Detection from Binary Black Hole Mergers',
          abstract: 'This paper presents a comprehensive analysis of gravitational wave signals detected from binary black hole merger events using advanced LIGO data. We developed novel signal processing techniques to enhance the detection sensitivity and characterize the properties of the merging black holes.',
          authors: ['Dr. Priya Sharma', 'Prof. Rajesh Kumar', 'Dr. Amit Singh'],
          year: 2023,
          type: 'paper',
          downloadLink: '#',
          status: 'published',
          keywords: ['Gravitational Waves', 'Black Holes', 'LIGO', 'Binary Systems'],
          journal: 'Astrophysical Journal'
        },
        {
          _id: '2',
          title: 'N-Body Simulation of Galaxy Cluster Evolution',
          abstract: 'Advanced computational simulation studying the formation and evolution of galaxy clusters over cosmic time scales. The simulation incorporates dark matter dynamics, gas physics, and star formation processes.',
          authors: ['Dr. Anita Das', 'Prof. Suresh Patel'],
          year: 2023,
          type: 'simulation',
          status: 'published',
          keywords: ['Galaxy Clusters', 'N-Body Simulation', 'Dark Matter', 'Cosmology'],
        },
        {
          _id: '3',
          title: 'Automated Exoplanet Detection Pipeline',
          abstract: 'Development of an automated machine learning pipeline for detecting exoplanet transits in photometric data from space-based telescopes. The system achieved 95% accuracy in identifying confirmed exoplanet candidates.',
          authors: ['Ms. Ritu Gupta', 'Dr. Vikram Joshi'],
          year: 2024,
          type: 'project',
          status: 'in-progress',
          keywords: ['Exoplanets', 'Machine Learning', 'Transit Photometry', 'Automation'],
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredResearch = research.filter(item => 
    activeFilter === 'all' || item.type === activeFilter
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'paper': return <FileText className="h-5 w-5" />;
      case 'simulation': return <div className="h-5 w-5 bg-blue-600 rounded"></div>;
      case 'project': return <Tag className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filters = [
    { key: 'all', label: 'All Research' },
    { key: 'paper', label: 'Papers' },
    { key: 'simulation', label: 'Simulations' },
    { key: 'project', label: 'Projects' }
  ];

  if (loading) {
    return (
      <section id="research" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading research...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="research" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl font-bold text-blue-900 mb-4 font-serif">Research & Publications</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Explore our cutting-edge research in astrophysics, computational astronomy, and space science
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16 px-4">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-blue-900 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:text-blue-900 hover:shadow-md border border-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4">
          {filteredResearch.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-amber-600">
                    {getTypeIcon(item.type)}
                  </div>
                  <span className="text-sm font-semibold text-gray-600 capitalize">
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{item.year}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-blue-900 mb-3 font-serif leading-tight">
                {item.title}
              </h3>

              <div className="flex items-center text-gray-600 mb-3">
                <Users className="h-4 w-4 mr-2 text-amber-600" />
                <span className="text-sm">{item.authors.join(', ')}</span>
              </div>

              {item.journal && (
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Published in: {item.journal}
                </p>
              )}

              <p className="text-gray-700 mb-4 leading-relaxed">
                {item.abstract}
              </p>

              {item.keywords.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </button>
                
                {item.downloadLink && (
                  <a
                    href={item.downloadLink}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredResearch.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No research found</h3>
            <p className="text-gray-500">No research items match the current filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Research;