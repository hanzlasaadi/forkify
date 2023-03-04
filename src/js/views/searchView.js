import View from './View.js';

class searchView extends View {
  _parentElement = document.querySelector('.search');

  renderSearchResults(data) {
    this._data = data;
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearSearch();
    return query;
  }

  _clearSearch() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(callback) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const theQuery = this.getQuery();
      if (theQuery) {
        callback(theQuery);
      }
    });
  }
}

export default new searchView();
