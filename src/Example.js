export default class Example {
  constructor(element) {
    this.element = element;
  }

  init() {
    this.element.querySelector('.display-4').textContent = 'RSS-Feed';
    console.log('ehu!');
  }
}
