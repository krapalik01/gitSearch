import { Search } from "./modules/search.js";
import { View } from "./modules/view.js";
import { Api } from "./modules/api.js";

const api = new Api();
const view = new View();
const app = new Search(view, api);
