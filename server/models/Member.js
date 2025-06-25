import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  institution: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  areaOfInterest: {
    type: String,
    required: true
  },
  whyJoin: {
    type: String,
    required: true
  },
  memberType: {
    type: String,
    enum: ['faculty-mentor', 'core-committee', 'student-researcher', 'member'],
    default: 'member'
  },
  photo: {
    type: String,
    default: ''
  },
  profile: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model('Member', memberSchema);