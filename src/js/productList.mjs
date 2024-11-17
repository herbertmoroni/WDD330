import { getProductsByCategory } from "./externalServices.mjs";
import { renderPriceAndDiscount } from "./utils.mjs";
import { productDetails } from "./productDetails.mjs";

export default async function productList(category) {
    const productList = document.querySelector(".product-list");
    const products = await getProductsByCategory(category);

    products.forEach(element => {
        //if (element.Id == "880RR" || element.Id == "985RF" || element.Id == "985PR" || element.Id == "344YJ") {
        const p = productCard(element);
        productList.append(p);
        //}
    });

    setupModal();
}

function productCard(product) {
    const template = document.getElementById("product-card-template");
    const clone = template.content.cloneNode(true);

    const urlRef = clone.querySelector(".card__url");
    urlRef.href = `/product_pages/index.html?product=${product.Id}`;

    // Update image to use srcset
    const image = clone.querySelector(".card__image");
    image.srcset = `
        ${product.Images.PrimarySmall} 80w,
        ${product.Images.PrimaryMedium} 160w,
        ${product.Images.PrimaryLarge} 320w
    `;
    // Add sizes attribute to help browser select correct image
    image.sizes = "(max-width: 500px) 80px, (max-width: 800px) 160px, 320px";
    image.src = product.Images.PrimaryMedium; // Fallback image
    image.alt = product.Name;
    
    // Add loading="lazy" for better performance in listings
    image.loading = "lazy";

    const name = clone.querySelector(".card__name");
    name.textContent = product.NameWithoutBrand;

    const brand = clone.querySelector(".card__brand");
    brand.textContent = product.Brand.Name;

    const priceElement = clone.querySelector(".card__price");
    renderPriceAndDiscount(priceElement, product.SuggestedRetailPrice, product.FinalPrice);

    // Set up quick view button
    const quickViewButton = clone.querySelector(".quick-view-button");
    quickViewButton.dataset.id = product.Id;

    return clone;
}

function setupModal() {
    const modal = document.getElementById('quickViewModal');
    const closeButton = modal.querySelector('.close-button');

    // Handle quick view button clicks
    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('quick-view-button')) {
            const productId = e.target.dataset.id;
            await showProductModal(productId);
        }
    });

    // Close modal when clicking close button or outside the modal
    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

async function showProductModal(productId) {
    const modal = document.getElementById('quickViewModal');
    modal.classList.add('show');
    
    // Use the existing productDetails function
    await productDetails(productId);
}