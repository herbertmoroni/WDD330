import { findProductById } from "./externalServices.mjs";
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

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.Id === product.Id);

    if (existingItemIndex >= 0) {
        // If item exists, increment its quantity
        cart[existingItemIndex].Quantity = (cart[existingItemIndex].Quantity || 1) + 1;
    } else {
        // If item is new, add it with quantity of 1
        product.Quantity = 1;
        cart.push(product);
    }

    //cart.push(product);
    setLocalStorage("so-cart", cart);
    updateCartCount();
    animateCart();
}

export function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;

    // Set up responsive image with srcset
    const imgElement = document.querySelector("#productImage");
    imgElement.srcset = `
        ${product.Images.PrimarySmall} 80w,
        ${product.Images.PrimaryMedium} 160w,
        ${product.Images.PrimaryLarge} 320w,
        ${product.Images.PrimaryExtraLarge} 600w
    `;
    imgElement.src = product.Images.PrimaryLarge; // Fallback for browsers that don't support srcset

    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("button#addToCart").dataset.id = product.Id;

     // Add debug info
    //  imgElement.addEventListener('load', function() {
    //      console.log('Loaded image:', {
    //          currentSrc: this.currentSrc,  // Shows which image from srcset was chosen
    //          naturalWidth: this.naturalWidth,
    //          naturalHeight: this.naturalHeight,
    //          offsetWidth: this.offsetWidth,
    //          offsetHeight: this.offsetHeight
    //      });
    //  });

    renderProductPrice(product);
}