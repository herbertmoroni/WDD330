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

function calculateDiscount(suggestedPrice, finalPrice) {
    return ((suggestedPrice - finalPrice) / suggestedPrice * 100).toFixed(0);
}

export function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;

    const priceElement = document.querySelector("#productFinalPrice");
    const discount = calculateDiscount(product.SuggestedRetailPrice, product.FinalPrice);

    const discountSpan = document.createElement('span');
    discountSpan.className = 'product-card__discount';
    discountSpan.textContent = `-${discount}%`;

    const priceSpan = document.createElement('span');
    priceSpan.className = 'product-card__final-price';
    priceSpan.textContent = product.FinalPrice;

    priceElement.innerHTML = '';
    if (discount > 0) {
        priceElement.appendChild(discountSpan);
    }
    priceElement.appendChild(priceSpan);
}