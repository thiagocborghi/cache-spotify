const api = require("./api");
const querystring = require("querystring");
const cache = require("./cache");

class Spotify {
  async search(options) {
    const params = querystring.stringify(options);

    const cached = await cache.get(params);

    if (cached) {
      return cached;
    }

    const { data } = await api.get(`/search?${params}`);

    const response = data.artists.items.map((item) => {
      return {
        name: item.name,
      };
    });

    cache.set(params, response, 60 * 5);

    return response;
  }
}

module.exports = new Spotify();