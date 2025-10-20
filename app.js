const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
const router = require('./routes/index'); // pastikan file ini ada
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

// ===== Root Route =====
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome To Vely -Docs Apikey',
    createdBy: 'Gxyenn',
    guide: 'Visit /api to see available endpoints',
    github: 'https://github.com/Gxyenn/VelyDocsApi'
  });
});

// ===== API Info Route =====
app.get('/api', (req, res) => {
  res.json({
    title: 'Vely Docs API Route',
    baseUrl: '/api',
    routes: {
      '/home': 'Homepage',
      '/complete': 'Complete/Finished Anime',
      '/complete/page/{page}': 'Complete Pagination',
      '/ongoing': 'Ongoing Anime',
      '/schedule': 'Schedule Anime',
      '/genres/{id}/page/{page}': 'Show Anime by Genre',
      '/search/{query}': 'Search Anime',
      '/anime/{id}': 'Detail Anime',
      '/batch/{id}': 'Detail Anime Batch',
      '/eps/{id}': 'Detail Anime Episode'
    },
    guide: 'Use /api/<endpoint> to access data (e.g. /api/home)',
    github: 'https://github.com/Gxyenn/VelyDocsApi'
  });
});

// ===== API Functional Routes =====
app.use('/api', router);

// ===== Not Found Handler =====
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'not found path',
    message: 'Read the docs here: https://github.com/Gxyenn/VelyDocsApi'
  });
});

module.exports = app;