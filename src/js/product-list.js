import productList from "./productList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

document.addEventListener('DOMContentLoaded', () => {

    loadHeaderFooter();
    const category = getParams("category");
    console.log(category);
    productList(category);
});

