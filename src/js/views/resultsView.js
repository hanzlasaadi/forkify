import View from './View.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errMsg =
    'Fix your sausage fuckry fingers. Fuck your brain harder and write a valid one, you fucker!';
  _okMsg = '';

  _markup() {
    const id = window.location.hash.slice(1);

    return this._data
      .map(res => {
        return `
        <li class="preview">
            <a class="preview__link ${
              id === res.id ? 'preview__link--active' : ''
            }" href="#${res.id}">
                <figure class="preview__fig">
                    <img src="${res.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${res.title}</h4>
                    <p class="preview__publisher">${res.publisher}</p>
                </div>
            </a>
        </li>
        `;
      })
      .join('');
  }
}

export default new ResultsView();
