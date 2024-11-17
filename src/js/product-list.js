import productList from "./productList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

document.addEventListener('DOMContentLoaded', () => {
    const category = getParams("category");

    loadHeaderFooter();
    updateProductTitle(category);
    
    // Initialize product list and then sort by name
    initializeProducts(category);
});

async function initializeProducts(category) {
    await productList(category);
    
    // Set dropdown to "name" by default
    const sortDropdown = document.getElementById('sort-options');
    sortDropdown.value = 'name';
    
    // Initial sort by name
    sortProductList('name');
    
    // Add event listener for future changes
    sortDropdown.addEventListener('change', () => {
        const selectedValue = sortDropdown.value;
        sortProductList(selectedValue);
    });
}

function updateProductTitle(category) {
    const titleElement = document.querySelector('h2');
    titleElement.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}

function getPrice(element) {
    const priceElement = element.querySelector('.card__price');
    if (!priceElement) return 0;
    
    const priceText = priceElement.textContent;
    const matches = priceText.match(/\d+\.?\d*/g);
    if (matches && matches.length > 0) {
        return parseFloat(matches[matches.length - 1]);
    }
    return 0;
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function getName(element) {
    const nameElement = element.querySelector('.card__name');
    return nameElement ? nameElement.textContent : '';
}

function sortProductList(sortBy) {
    const productList = document.querySelector('.product-list');
    if (!productList) return;

    const products = Array.from(productList.children);
    if (products.length === 0) return;

    products.sort((a, b) => {
        if (sortBy === 'name') {
            return getName(a).localeCompare(getName(b));
        } else if (sortBy === 'price') {
            return getPrice(a) - getPrice(b);
        }
        return 0;
    });

    // Clear and re-append sorted products
    productList.innerHTML = '';
    products.forEach(product => productList.appendChild(product));
}