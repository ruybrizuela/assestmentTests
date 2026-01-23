const EventEmitter = require('events');
const API = require('./mock-api');

class Search extends EventEmitter {
  async searchCount(searchTerm) {
    this.emit('SEARCH_STARTED', searchTerm);

    if (searchTerm === undefined) {
      this.emit('SEARCH_ERROR', { message: 'INVALID_TERM', term: searchTerm });
      return;
    }

    try {
      const count = await API.countMatches(searchTerm);
      this.emit('SEARCH_SUCCESS', { count, term: searchTerm });
      return count;
    } catch (err) {
      this.emit('SEARCH_ERROR', {
        message: err?.message || String(err),
        term: searchTerm,
      });
    }
  }
}

module.exports = Search;