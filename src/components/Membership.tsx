import React, { useState } from 'react';
import { UserPlus, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  institution: string;
  designation: string;
  areaOfInterest: string;
  whyJoin: string;
}

const Membership = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    institution: '',
    designation: '',
    areaOfInterest: '',
    whyJoin: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.areaOfInterest.trim()) newErrors.areaOfInterest = 'Area of interest is required';
    if (!formData.whyJoin.trim()) {
      newErrors.whyJoin = 'Please tell us why you want to join';
    } else if (formData.whyJoin.trim().length < 10) {
      newErrors.whyJoin = 'Please provide more details (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          institution: '',
          designation: '',
          areaOfInterest: '',
          whyJoin: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const designationOptions = [
    '', 'Professor', 'Associate Professor', 'Assistant Professor', 'Post-Doc Researcher',
    'PhD Student', 'Masters Student', 'Research Scholar', 'Industry Professional', 'Other'
  ];

  return (
    <section id="membership" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 lg:mb-20">
          <UserPlus className="h-16 w-16 text-blue-900 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-blue-900 mb-4 font-serif">Join Our Research Community</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            Become part of our vibrant community of astronomers, researchers, and space enthusiasts. 
            Collaborate on cutting-edge research and contribute to the advancement of astronomical science.
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-4">
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800">Application Submitted Successfully!</h3>
                <p className="text-green-700">
                  Thank you for your interest. We'll review your application and get back to you soon.
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Submission Failed</h3>
                <p className="text-red-700">
                  There was an error submitting your application. Please try again.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="your.email@institution.edu"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-semibold text-gray-700 mb-2">
                Institution/Organization *
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.institution ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Name of your university, research institute, or organization"
              />
              {errors.institution && <p className="mt-1 text-sm text-red-600">{errors.institution}</p>}
            </div>

            <div>
              <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 mb-2">
                Current Designation *
              </label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.designation ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
              >
                {designationOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {index === 0 ? 'Select your designation' : option}
                  </option>
                ))}
              </select>
              {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation}</p>}
            </div>

            <div>
              <label htmlFor="areaOfInterest" className="block text-sm font-semibold text-gray-700 mb-2">
                Area of Research Interest *
              </label>
              <input
                type="text"
                id="areaOfInterest"
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.areaOfInterest ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="e.g., Gravitational Waves, Exoplanets, Galaxy Formation, etc."
              />
              {errors.areaOfInterest && <p className="mt-1 text-sm text-red-600">{errors.areaOfInterest}</p>}
            </div>

            <div>
              <label htmlFor="whyJoin" className="block text-sm font-semibold text-gray-700 mb-2">
                Why do you want to join our research center? *
              </label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                rows={4}
                value={formData.whyJoin}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                  errors.whyJoin ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Please describe your research interests, goals, and how you would like to contribute to our center..."
              />
              {errors.whyJoin && <p className="mt-1 text-sm text-red-600">{errors.whyJoin}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your application will be reviewed by our faculty committee</li>
                <li>• You'll receive a confirmation email within 2-3 business days</li>
                <li>• Selected candidates may be invited for a brief discussion</li>
                <li>• Approved members gain access to our research resources and collaborations</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Membership;