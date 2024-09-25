import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  if (!cart) {
    cart = [];
  }

  if (!Array.isArray(cart)) {
    cart = [cart];
  }

  cart.push(product);
 
  setLocalStorage("so-cart", cart);

}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);

  window.location.href = "/cart/index.html";
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
