import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, updateCartCount, animateCart, renderProductPrice } from "./utils.mjs";

let product = {};

export async function productDetails(productID) {
    try {
        product = await findProductById(productID);

        if (!product) {
            throw new Error('Product not found');
        }

        renderProductDetails();

        document.getElementById("addToCart").addEventListener("click", addToCart);

    } catch (error) {
        console.error('Error loading product:', error);
        renderErrorMessage();
    }
}

function renderErrorMessage() {
    const productDetail = document.querySelector('.product-detail');
    productDetail.innerHTML = `
        <div class="error-message" style="text-align: center; padding: 2em;">
            <h2 style="color: #B12704;">Product Not Found</h2>
            <p>We're sorry, but the product you're looking for could not be found.</p>
            <a href="/index.html" 
               style="display: inline-block; margin-top: 1em; padding: 0.5em 1em; 
                      background-color: var(--secondary-color); color: white; 
                      text-decoration: none; border-radius: 4px;">
                Continue Shopping
            </a>
        </div>
    `;
}

export function addToCart() {
    const cart = Array.isArray(getLocalStorage("so-cart"))
        ? getLocalStorage("so-cart")
        : [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
    updateCartCount();
    animateCart();
}

export function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("button#addToCart").dataset.id = product.Id;

    renderProductPrice(product);
}