import { findProductById, getProductsByCategory  } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, updateCartCount, animateCart, renderProductPrice } from "./utils.mjs";

let product = {};
let selectedColor = null;

export async function productDetails(productID) {
    try {
        product = await findProductById(productID);

        if (!product) {
            throw new Error('Product not found');
        }

        renderProductDetails();
        setupColorSelection();

        document.getElementById("addToCart").addEventListener("click", addToCart);

        await addRecommendations(product.Category);

    } catch (error) {
        console.error('Error loading product:', error);
        renderErrorMessage();
    }
}

function setupColorSelection() {
    const colorSwatches = document.querySelector('.color-swatches');
    if (!product.Colors || product.Colors.length <= 1) {
        document.querySelector('.product-colors').style.display = 'none';
        return;
    }

    // Create color swatches
    colorSwatches.innerHTML = product.Colors.map((color, index) => `
        <div class="color-swatch ${index === 0 ? 'selected' : ''}"
             data-color="${color.ColorName}"
             style="background-image: url('${color.ColorChipImageSrc}')"
             role="button"
             tabindex="0"
             title="${color.ColorName}">
        </div>
    `).join('');

    // Set initial selected color
    selectedColor = product.Colors[0];
    updateSelectedColorDisplay(selectedColor);

    // Add click handlers
    colorSwatches.addEventListener('click', handleColorSelection);
}

function handleColorSelection(e) {
    const swatch = e.target.closest('.color-swatch');
    if (!swatch) return;

    // Remove selection from all swatches
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    
    // Add selection to clicked swatch
    swatch.classList.add('selected');

    // Find and update selected color
    const colorName = swatch.dataset.color;
    selectedColor = product.Colors.find(c => c.ColorName === colorName);
    
    // Update display
    updateSelectedColorDisplay(selectedColor);
    updateProductImage(selectedColor);
}

function updateSelectedColorDisplay(color) {
    const colorNameElement = document.querySelector("#productColorName");
    if (colorNameElement) {
        colorNameElement.textContent = color.ColorName;
    }
}

function updateProductImage(color) {
    const imgElement = document.querySelector("#productImage");
    // Check if ColorPreviewImageSrc exists and contains different sizes
    const baseImageUrl = color.ColorPreviewImageSrc.replace('160.jpg', '');
    
    imgElement.srcset = `
        ${baseImageUrl}80.jpg 80w,
        ${baseImageUrl}160.jpg 160w,
        ${baseImageUrl}320.jpg 320w,
        ${baseImageUrl}600.jpg 600w
    `;
    imgElement.src = baseImageUrl + '320.jpg';
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

    // Create product variant with selected color
    const productToAdd = {
        ...product,
        SelectedColor: selectedColor?.ColorName || product.Colors[0].ColorName
    };

    // Check if this exact variant exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.Id === product.Id && item.SelectedColor === productToAdd.SelectedColor
    );

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].Quantity = (cart[existingItemIndex].Quantity || 1) + 1;
    } else {
        productToAdd.Quantity = 1;
        cart.push(productToAdd);
    }

    setLocalStorage("so-cart", cart);
    updateCartCount();
    animateCart();
}

export function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;

    // Set up responsive image with srcset
    selectedColor = product.Colors[0];
    const imgElement = document.querySelector("#productImage");
    imgElement.srcset = `
        ${product.Images.PrimarySmall} 80w,
        ${product.Images.PrimaryMedium} 160w,
        ${product.Images.PrimaryLarge} 320w,
        ${product.Images.PrimaryExtraLarge} 600w
    `;
    
    imgElement.src = product.Images.PrimaryLarge; // Fallback for browsers that don't support srcset
    imgElement.alt = product.Name;

    document.querySelector("#productColorName").innerText = selectedColor.ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("button#addToCart").dataset.id = product.Id;

    renderProductPrice(product);
}