import productList from "./productList.mjs";
import fetchAlerts from "./alert.mjs";

productList();
document.addEventListener('DOMContentLoaded', () => {
    fetchAlerts();
}); //added fetchAlerts here