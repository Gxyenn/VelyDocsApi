const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

// Route utama API
app.use('/api', router);

// ==========================
// 🔹 Root Route ("/")
// ==========================
app.get('/', (req, res) => {
  res.json({
    project: 'Vely -Docs Apikey',
    description: 'Unofficial Anime API — allows you to get anime data from sources integrated with this service.',
    createdBy: 'Gxyenn',
    github: 'https://github.com/Gxyenn/VelyDocsApi',
    baseUrl: 'https://velydocsapikey.vercel.app/api/',
    usage: 'Append endpoints below to the baseUrl',
    endpoints: [
      {
        endpoint: '/home',
        params: '-',
        description: 'Homepage (List of latest anime updates)'
      },
      {
        endpoint: '/complete',
        params: '-',
        description: 'List of completed/finished anime'
      },
      {
        endpoint: '/complete/page/:page',
        params: 'page',
        description: 'Paginated list of completed anime'
      },
      {
        endpoint: '/ongoing',
        params: '-',
        description: 'List of ongoing anime'
      },
      {
        endpoint: '/schedule',
        params: '-',
        description: 'Anime release schedule'
      },
      {
        endpoint: '/genres',
        params: '-',
        description: 'List of available genres'
      },
      {
        endpoint: '/genres/:id/page/:page',
        params: 'id, page',
        description: 'Anime list filtered by genre'
      },
      {
        endpoint: '/search/:query',
        params: 'query',
        description: 'Search anime by keyword'
      },
      {
        endpoint: '/anime/:id',
        params: 'id',
        description: 'Get detailed anime information'
      },
      {
        endpoint: '/batch/:id',
        params: 'id',
        description: 'Get batch (complete download info) for specific anime'
      },
      {
        endpoint: '/eps/:id',
        params: 'id',
        description: 'Get episode details for specific anime'
      }
    ],
    example: {
      home: 'https://velydocsapikey.vercel.app/api/home',
      search: 'https://velydocsapikey.vercel.app/api/search/boruto',
      anime: 'https://velydocsapikey.vercel.app/api/anime/boruto-naruto-next-generations'
    }
  });
});

// ==========================
// 🔹 /api (secondary info)
// ==========================
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Vely Docs API routes',
    docs: 'Visit the root (/) for full documentation or GitHub for details.',
    github: 'https://github.com/Gxyenn/VelyDocsApi'
  });
});

// ==========================
// 🔹 Not Found Handler
// ==========================
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Not Found',
    message: 'Endpoint not found. Read the docs at https://github.com/Gxyenn/VelyDocsApi'
  });
});

module.exports = app;