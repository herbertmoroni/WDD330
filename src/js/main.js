import productList from "./productList.mjs";
import fetchAlerts from "./alert.mjs";
import { loadHeaderFooter, searchBar, createRegistrationModal } from "./utils.mjs";
import { createNewsletterForm } from "./forms.mjs";



document.addEventListener('DOMContentLoaded', () => {

    loadHeaderFooter();

    searchBar();

    createRegistrationModal();

    createNewsletterForm();

    productList();

    fetchAlerts();
});


