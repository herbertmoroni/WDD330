import productList from "./productList.mjs";
import fetchAlerts from "./alert.mjs";
import { loadHeaderFooter, createRegistrationModal } from "./utils.mjs";
import { createNewsletterForm } from "./forms.mjs";



document.addEventListener('DOMContentLoaded', () => {

    loadHeaderFooter();

    createRegistrationModal();

    createNewsletterForm();

    productList();

    fetchAlerts();
});


