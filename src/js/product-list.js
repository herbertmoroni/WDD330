import productList from "./productList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

document.addEventListener('DOMContentLoaded', () => {

    loadHeaderFooter();
    const category = getParams("category");
    console.log(category);

    const titleElement = document.querySelector('h2');
    titleElement.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

    productList(category);
});

