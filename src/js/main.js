import productList from "./productList.mjs";
import fetchAlerts from "./alert.mjs";
import { loadHeaderFooter, updateBreadcrumb, createRegistrationModal } from "./utils.mjs";
import { createNewsletterForm } from "./forms.mjs";



document.addEventListener('DOMContentLoaded', () => {

    loadHeaderFooter();

    updateBreadcrumb();

    createRegistrationModal();

    createNewsletterForm();

    productList();

    fetchAlerts();
});


