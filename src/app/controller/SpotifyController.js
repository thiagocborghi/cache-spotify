const api = require('../services/api');
const querystring = require('querystring');
const cache = require('../services/cache');

class SpotifyController {
  async search(options) {
    const params = querystring.stringify(options);

    const cached = await cache.get(params);

    if (cached) {
      return cached;
    }

    const { data } = await api.get(`/search?${params}`);

    const response = data;

    cache.set(params, response, 60 * 1);

    return response;
  }

  async artist(id) {
    const cached = await cache.get(id);

    if (cached) {
      return cached;
    }

    const { data } = await api.get(`/artists/${id}`);

    const response = data;

    cache.set(id, response, 60 * 1);

    return response;
  }

  async topTracks(id, options) {
    const params = querystring.stringify(options);

    const requestURL = `/artists/${id}/top-tracks?${params}`;

    const cached = await cache.get(requestURL);

    if (cached) {
      return cached;
    }

    const { data } = await api.get(`/artists/${id}/top-tracks?${params}`);

    const response = data;

    cache.set(requestURL, response, 60 * 1);

    return response;
  }
}

module.exports = new SpotifyController();