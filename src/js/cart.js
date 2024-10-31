import { loadHeaderFooter } from "./utils.mjs";
import { renderCartContents } from "./shoppingCart.mjs";


renderCartContents();

loadHeaderFooter();

document.getElementById("checkout-button").addEventListener("click", () => {
    window.location.href = "/checkout/index.html";
})
