const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Helper function to read JSON files
const readJSONFile = (filename) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Get all courses
router.get('/', (req, res) => {
  const coursesData = readJSONFile('courses.json');
  if (coursesData) {
    res.json(coursesData);
  } else {
    res.status(500).json({ error: 'Failed to load courses data' });
  }
});

// Get courses by level
router.get('/level/:level', (req, res) => {
  const coursesData = readJSONFile('courses.json');
  if (coursesData) {
    const level = req.params.level.charAt(0).toUpperCase() + req.params.level.slice(1).toLowerCase();
    const filteredCourses = coursesData.courses.filter(
      course => course.level === level
    );
    res.json({ courses: filteredCourses });
  } else {
    res.status(500).json({ error: 'Failed to load courses data' });
  }
});

// Get course by ID (if we want to add individual course endpoints later)
router.get('/:id', (req, res) => {
  const coursesData = readJSONFile('courses.json');
  if (coursesData) {
    const courseId = parseInt(req.params.id);
    const course = coursesData.courses[courseId];
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to load courses data' });
  }
});

module.exports = router;