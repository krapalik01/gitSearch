// modules/search.js

// Класс для инпута
export class Search {
  constructor(view, api) {
    this.view = view;
    this.api = api;

    this.view.searchInput.addEventListener(
      "keyup",
      this.debounce(this.searchRepos.bind(this), 500) // задержка для запроса 0.5с
    );
  }

  // считываем значение с инпута, парсим и удаляем все поисковые подсказки когда инпут пуст
  searchRepos() {
    const searchValue = this.view.searchInput.value;
    if (searchValue) {
      this.api.searchRepos(searchValue).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            this.view.renderRepos(data.items, this.handleRepoClick.bind(this));
          });
        } else {
          this.view.clearRepos();
        }
      });
    } else {
      this.view.clearRepos();
    }
  }

  // клик по подсказке из поисковой строки (инпута)
  handleRepoClick(repo) {
    this.view.renderRepoBlock(repo);
  }
  // та самая суета добавляющая задержку между запросами пока печатаем в инпуте
  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
