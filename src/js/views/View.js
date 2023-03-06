import icons from '../../img/icons.svg';

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _insert(html) {
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErr();

    this._data = data;

    const html = this._markup();

    this._clear();
    this._insert(html);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErr();

    this._data = data;

    const newMarkup = this._markup();
    const virtualDOM = document
      .createRange()
      .createContextualFragment(newMarkup);
    const virtualElements = Array.from(virtualDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    virtualElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //Changed TEXT is updated
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;

      //Changed ATRRIBUTES are updated
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(att =>
          curEl.setAttribute(att.name, att.value)
        );
    });
  }

  renderSpinner() {
    const html = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
         `;
    this._clear();
    this._insert(html);
  }

  renderErr(msg = this._errMsg) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>
        `;

    this._clear();
    this._insert(markup);
  }

  renderMsg(msg = this._okMsg) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>
        `;

    this._clear();
    this._insert(markup);
  }
}
