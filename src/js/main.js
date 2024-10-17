import productList from "./productList.mjs";
import fetchAlerts from "./alert.mjs";
import { loadHeaderFooter  }  from "./utils.mjs";



document.addEventListener('DOMContentLoaded', () => {
    
    loadHeaderFooter();

    productList();
    
    fetchAlerts();
}); 


