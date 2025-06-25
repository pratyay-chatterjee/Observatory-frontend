import express from 'express';
import { body, validationResult } from 'express-validator';
import Research from '../models/Research.js';

const router = express.Router();

// Get all research
router.get('/', async (req, res) => {
  try {
    const { type, year } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (year) filter.year = parseInt(year);
    
    const research = await Research.find(filter).sort({ year: -1, createdAt: -1 });
    res.json(research);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create research
router.post('/', [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('abstract').trim().isLength({ min: 1 }).withMessage('Abstract is required'),
  body('authors').isArray({ min: 1 }).withMessage('At least one author is required'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() + 5 }).withMessage('Valid year is required'),
  body('type').isIn(['paper', 'simulation', 'project']).withMessage('Valid type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const research = new Research(req.body);
    await research.save();
    res.status(201).json(research);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;