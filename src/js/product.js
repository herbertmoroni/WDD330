import { getLocalStorage, setLocalStorage, getParams } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { productDetails } from "./productDetails.mjs";

// function addProductToCart(product) {
// const cart = Array.isArray(getLocalStorage("so-cart"))
//   ? getLocalStorage("so-cart")
//   : [];
// cart.push(product);
// setLocalStorage("so-cart", cart);
// }

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);

  window.location.href = "/cart/index.html";
}

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

const productId = getParams('product');

console.log(findProductById(productId));

productDetails(productId);