// modules/api.js
const URL = "https://api.github.com/";
const REPOS_PER_PAGE = 5;

// Класс для запроса по api гитхаба
export class Api {
  async searchRepos(query) {
    return await fetch(
      `${URL}search/repositories?q=${encodeURIComponent(
        query
      )}&per_page=${REPOS_PER_PAGE}`
    );
  }
}
