const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images, HTML)
app.use(express.static(path.join(__dirname)));

// Import route modules
const coursesRoutes = require('./routes/courses');
const blogRoutes = require('./routes/blog');

// Use route modules
app.use('/api/courses', coursesRoutes);
app.use('/api/blog', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Elevare API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'courses.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/careers', (req, res) => {
  res.sendFile(path.join(__dirname, 'careers.html'));
});

app.get('/internships', (req, res) => {
  res.sendFile(path.join(__dirname, 'internships.html'));
});

app.get('/mentorship', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentorship.html'));
});

app.get('/resources', (req, res) => {
  res.sendFile(path.join(__dirname, 'resources.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'signin.html'));
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// 404 handler for all other routes
app.use('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Elevare server is running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`📚 Courses API: http://localhost:${PORT}/api/courses`);
  console.log(`📰 Blog API: http://localhost:${PORT}/api/blog`);
});