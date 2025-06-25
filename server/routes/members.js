import express from 'express';
import Member from '../models/Member.js';

const router = express.Router();

// Fallback data when MongoDB is not available
const fallbackMembers = [
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
];

// Check if MongoDB is connected
const isMongoConnected = () => {
  try {
    return require('mongoose').connection.readyState === 1;
  } catch {
    return false;
  }
};

// GET all members
router.get('/', async (req, res) => {
  try {
    const { status, memberType } = req.query;
    
    if (!isMongoConnected()) {
      // Use fallback data when MongoDB is not available
      let filteredMembers = fallbackMembers;
      
      if (status) {
        filteredMembers = filteredMembers.filter(member => member.status === status);
      }
      
      if (memberType) {
        filteredMembers = filteredMembers.filter(member => member.memberType === memberType);
      }
      
      return res.json(filteredMembers);
    }

    // Use MongoDB when available
    const filter = {};
    if (status) filter.status = status;
    if (memberType) filter.memberType = memberType;

    const members = await Member.find(filter).sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    // Fallback to static data on error
    res.json(fallbackMembers.filter(member => 
      (!req.query.status || member.status === req.query.status) &&
      (!req.query.memberType || member.memberType === req.query.memberType)
    ));
  }
});

// POST new member
router.post('/', async (req, res) => {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({ 
        message: 'Database not available. Please try again later.',
        error: 'MongoDB connection not established'
      });
    }

    const member = new Member(req.body);
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(400).json({ 
      message: 'Error creating member',
      error: error.message 
    });
  }
});

// GET member by ID
router.get('/:id', async (req, res) => {
  try {
    if (!isMongoConnected()) {
      const member = fallbackMembers.find(m => m._id === req.params.id);
      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }
      return res.json(member);
    }

    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ 
      message: 'Error fetching member',
      error: error.message 
    });
  }
});

// PUT update member
router.put('/:id', async (req, res) => {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({ 
        message: 'Database not available. Please try again later.',
        error: 'MongoDB connection not established'
      });
    }

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(400).json({ 
      message: 'Error updating member',
      error: error.message 
    });
  }
});

// DELETE member
router.delete('/:id', async (req, res) => {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({ 
        message: 'Database not available. Please try again later.',
        error: 'MongoDB connection not established'
      });
    }

    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ 
      message: 'Error deleting member',
      error: error.message 
    });
  }
});

export default router;