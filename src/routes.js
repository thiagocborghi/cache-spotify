const express = require('express');

const routes = express.Router();
const spotify = require('./lib/spotify');


routes.get('/search', async (req, res) => {
    const params = req.query;

    const result = await spotify.search(params);

    return res.json(result);
});
  
routes.get('/artist/:id', async (req, res) => {
    const id = req.params.id;

    const result = await spotify.artist(id);

    return res.json(result);
});
  
routes.get('/artist/:id/top-tracks', async (req, res) => {
    const id = req.params.id;
    const params = req.query;

    const result = await spotify.topTracks(id, params);

    return res.json(result);
});

module.exports = routes;