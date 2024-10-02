import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export async function productDetails(productID) {
    product = await findProductById(productID);
    renderProductDetails();
    document.getElementById("addToCart").addEventListener("click", addToCart);
}

export function addToCart() {
    const cart = Array.isArray(getLocalStorage("so-cart"))
        ? getLocalStorage("so-cart")
        : [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
    window.location.href = "/cart/index.html";
}

export function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
        product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText =
        product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
        product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}