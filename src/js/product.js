import { getLocalStorage, setLocalStorage, getParams, loadHeaderFooter } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { productDetails } from "./productDetails.mjs";


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);

  window.location.href = "/cart/index.html";
}

const productId = getParams('product');

productDetails(productId);

loadHeaderFooter();