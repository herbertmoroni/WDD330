import { findProductById, getProductsByCategory  } from "./externalServices.mjs";
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

        await addRecommendations(product.Category);

    } catch (error) {
        console.error('Error loading product:', error);
        renderErrorMessage();
    }
}

async function addRecommendations(category) {
    try {
        // Get all products in the same category
        const products = await getProductsByCategory(category);
        
        // Filter out the current product and get 2-3 random products
        const otherProducts = products.filter(p => p.Id !== product.Id);
        const numRecommendations = Math.floor(Math.random() * 2) + 2; // Random number between 2 and 3
        const recommendations = getRandomProducts(otherProducts, numRecommendations);
        
        // Render the recommendations
        renderRecommendations(recommendations);
    } catch (error) {
        console.error('Error loading recommendations:', error);
    }
}

function getRandomProducts(products, count) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function renderRecommendations(recommendations) {
    const recommendationsGrid = document.querySelector('.recommendations-grid');
    if (!recommendationsGrid) return;

    recommendationsGrid.innerHTML = recommendations.map(product => `
        <div class="recommendation-card">
            <a href="/product_pages/index.html?product=${product.Id}">
                <img 
                    src="${product.Images.PrimaryMedium}" 
                    alt="${product.Name}"
                    loading="lazy"
                />
                <div class="recommendation-card__content">
                    <h3 class="card__brand">${product.Brand.Name}</h3>
                    <h4 class="card__name">${product.NameWithoutBrand}</h4>
                    <p class="card__price" data-id="${product.Id}"></p>
                </div>
            </a>
        </div>
    `).join('');

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

    renderProductPrice(product);
}