export class View {
  constructor() {
    this.app = document.getElementById("app");
    this.title = this.createElement("h1", "title");
    this.title.textContent = "GitHub search repositories";

    this.searchLine = this.createElement("div", "search-line");
    this.searchInput = this.createElement("input", "search-input");
    this.searchInput.setAttribute(
      "placeholder",
      "Введите название репозитория"
    );
    this.searchLine.append(this.searchInput);

    this.reposList = this.createElement("ul", "repos-list");

    this.repoBlockList = this.createElement("div", "repo-block-list");

    this.app.append(this.title);
    this.app.append(this.searchLine);
    this.app.append(this.reposList);
    this.app.append(this.repoBlockList);
  }

  // метод создания элемента с классом(если он есть)
  createElement(tag, className) {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    return el;
  }

  clearRepos() {
    this.reposList.innerHTML = "";
  }

  // рендеринг 5-ти строчек под инпутом
  renderRepos(repos, onRepoClick) {
    this.clearRepos();
    repos.forEach((repo) => {
      const li = this.createElement("li", "repo-item");
      const span = this.createElement("span", "repo-item-text");
      span.textContent = repo.name;
      li.append(span);
      span.addEventListener("click", (e) => {
        e.stopPropagation();
        this.searchInput.value = "";
        this.clearRepos();
        onRepoClick(repo);
      });
      li.addEventListener("click", () => onRepoClick(repo));
      this.reposList.append(li);
    });
  }
  // рендер отдельных блоков по клику из подсказок поисковика
  renderRepoBlock(repo) {
    const repoBlock = this.createElement("div", "repo-block-items");
    const deleteButton = this.createElement("button", "button-delete");
    deleteButton.addEventListener("click", () => {
      repoBlock.remove();
    });
    repoBlock.innerHTML = `
    <p><strong>Репозиторий:</strong> ${repo.name}</p>
    <p><strong>Владелец:</strong> ${repo.owner.login}</p>
    <p><strong>Количество звезд:</strong> ${repo.stargazers_count}</p>
    `;
    this.repoBlockList.append(repoBlock);
    repoBlock.append(deleteButton);
  }
}
