import productList from "./productList.mjs";
import fetchAlerts from "./alert.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { createNewsletterForm } from "./newsletterForm.mjs";



document.addEventListener('DOMContentLoaded', () => {

    loadHeaderFooter();

    createNewsletterForm();

    productList();

    fetchAlerts();
});


