import productList from "./productList.mjs";
import fetchAlerts from "./alert.mjs";
import { loadHeaderFooter }  from "./utils.mjs";

productList();

document.addEventListener('DOMContentLoaded', () => {
    fetchAlerts();
}); //added fetchAlerts here

// const headerTemplateFn = loadTemplate("/partials/header.html");
// const footerTemplateFn = loadTemplate("/partials/footer.html");

// const headerElement = document.getElementById("main-header");
// const footerElement = document.getElementById("main-footer");


// headerTemplateFn().then((template) => {
//     headerElement.innerHTML = template;
// }); 

// footerTemplateFn().then((template) => {    
//     footerElement.innerHTML = template;
// }); 

loadHeaderFooter();