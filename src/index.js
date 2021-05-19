import React from 'react';
import ReactDOM from 'react-dom';
import { isMobile } from 'react-device-detect';
import App from './App';

if (isMobile) {
  window.location.href = 'https://m.vidula.tk';
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
