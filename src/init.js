import '@babel/polyfill';
import 'bootstrap';
// почему недостаточно просто bootstrap  и необходима загрука css?
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './app';

export default () => {
  const element = document.getElementById('point');
  app(element);
};
