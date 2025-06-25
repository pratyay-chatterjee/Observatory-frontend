import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'past'],
    required: true
  },
  bannerImage: {
    type: String,
    default: ''
  },
  registrationLink: {
    type: String,
    default: ''
  },
  venue: {
    type: String,
    default: ''
  },
  speakers: [{
    name: String,
    designation: String,
    institution: String
  }],
  registrationOpen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);