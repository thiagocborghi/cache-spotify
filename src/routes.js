const express = require('express');

const routes = express.Router();
const SpotifyController = require('./app/controller/SpotifyController');


routes.get('/search', async (req, res) => {
    const params = req.query;

    const result = await SpotifyController.search(params);

    return res.json(result);
});
  
routes.get('/artist/:id', async (req, res) => {
    const id = req.params.id;

    const result = await SpotifyController.artist(id);

    return res.json(result);
});
  
routes.get('/artist/:id/top-tracks', async (req, res) => {
    const id = req.params.id;
    const params = req.query;

    const result = await SpotifyController.topTracks(id, params);

    return res.json(result);
});

module.exports = routes;