import View from './View.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  // _errMsg = 'Fix your sausage fuckry fingers. Fuck your brain harder and write a valid one, you fucker!';
  _errMsg = 'Kindly fix your query & search again!';
  _okMsg = '';

  _markup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}

export default new ResultsView();
