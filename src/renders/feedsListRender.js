/* использовать что-то подобное для создания списка
  selectedNotebooks.forEach((notebook) => {
    // Создаем текстовый узел
    const textNode = document.createTextNode(notebook.model);
    // Создаем элемент li
    const liEl = document.createElement('li');
    // Добавляем textNode в конец списка childNodes элемента liEl
    liEl.append(textNode);
    // Добавляем liEl в конец списка childNodes элемента ulEl у notebooksList
    notebooksList.append(liEl);
  });
*/
