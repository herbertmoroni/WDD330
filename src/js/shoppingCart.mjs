import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  //const htmlItems = cartItems ? cartItems.map((item) => cartItemTemplate(item)) : [];
  //document.querySelector(".product-list").innerHTML = htmlItems.join("");
  const productList = document.querySelector(".product-list");

   // Handle empty cart
   if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = `
      <li>
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart to see them here!</p>
        <a href="/index.html" 
               style="display: inline-block; margin-top: 1em; padding: 0.5em 1em; 
                      background-color: var(--secondary-color); color: white; 
                      text-decoration: none; border-radius: 4px;">
                Continue Shopping
            </a>
      </li>`;
    return;
  }

  // Handle items in cart
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Add event listeners for remove buttons
  addRemoveButtonListeners();

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <button class="cart-card__remove" data-id="${item.id}">❌</button>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryLarge}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function addRemoveButtonListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      const itemId = event.target.getAttribute("data-id");
      removeFromCart(itemId);
      renderCartContents();
    });
  });
}


function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    // Filter out the item with the matching ID
    cartItems = cartItems.filter(item => item.Id !== itemId);
    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cartItems);
    // Update the cart count in the header
    updateCartCount();
  }
}