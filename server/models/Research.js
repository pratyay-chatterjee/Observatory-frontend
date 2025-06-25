import mongoose from 'mongoose';

const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  abstract: {
    type: String,
    required: true
  },
  authors: [{
    type: String,
    required: true
  }],
  year: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['paper', 'simulation', 'project'],
    required: true
  },
  downloadLink: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['published', 'under-review', 'in-progress'],
    default: 'published'
  },
  keywords: [{
    type: String
  }],
  journal: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Research', researchSchema);