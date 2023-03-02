class searchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearSearch();
    return query;
  }

  #clearSearch() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(callback) {
    this.#parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const theQuery = this.getQuery();
      if (theQuery) {
        callback(theQuery);
      }
    });
  }
}

export default new searchView();
