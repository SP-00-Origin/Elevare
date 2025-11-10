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

// Get all blog articles
router.get('/', (req, res) => {
  const blogData = readJSONFile('blog.json');
  if (blogData) {
    res.json(blogData);
  } else {
    res.status(500).json({ error: 'Failed to load blog data' });
  }
});

// Get blog articles by category
router.get('/category/:category', (req, res) => {
  const blogData = readJSONFile('blog.json');
  if (blogData) {
    const category = req.params.category.toUpperCase();
    const filteredArticles = blogData.articles.filter(
      article => article.category === category
    );
    res.json({ articles: filteredArticles });
  } else {
    res.status(500).json({ error: 'Failed to load blog data' });
  }
});

// Get blog article by ID
router.get('/:id', (req, res) => {
  const blogData = readJSONFile('blog.json');
  if (blogData) {
    const articleId = parseInt(req.params.id);
    const article = blogData.articles[articleId];
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to load blog data' });
  }
});

// Search articles by title or content
router.get('/search/:query', (req, res) => {
  const blogData = readJSONFile('blog.json');
  if (blogData) {
    const query = req.params.query.toLowerCase();
    const filteredArticles = blogData.articles.filter(
      article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );
    res.json({ articles: filteredArticles, query: req.params.query });
  } else {
    res.status(500).json({ error: 'Failed to load blog data' });
  }
});

module.exports = router;