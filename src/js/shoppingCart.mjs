import { getLocalStorage, setLocalStorage, updateCartCount, updateCartItemQuantity } from "./utils.mjs";

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
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
    updateCartTotal(cartItems);
    return;
  }

  // Handle items in cart
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Update cart total
  updateCartTotal(cartItems);

  // Add event listeners for remove buttons
  addRemoveButtonListeners();

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <button class="cart-card__remove" data-id="${item.Id}">❌</button>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 
      <input type="number" class="quantity-input" data-id="${item.Id}" value="${item.Quantity || 1}" min="1">
    </p>
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

  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach(input => {
    input.addEventListener("change", function(event) {
      const itemId = event.target.getAttribute("data-id");
      const newQuantity = parseInt(event.target.value);
      updateCartItemQuantity(itemId, newQuantity);
      updateCartTotal(getLocalStorage("so-cart"));
    });
  });
}

function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    cartItems = cartItems.filter(item => item.Id !== itemId);
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
    updateCartTotal(cartItems); 
  }
}

function calculateCartTotal(cartItems) {
  if (!cartItems) return 0;

  //return cartItems.reduce((total, item) => total + item.FinalPrice, 0).toFixed(2);
  return cartItems.reduce((total, item) => total + (item.FinalPrice * (item.Quantity || 1)), 0).toFixed(2);
}

function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");
  
  if (!cartItems || cartItems.length === 0) {
    cartFooter.classList.remove("show");
    return;
  }
  
  const total = calculateCartTotal(cartItems);
  cartTotalElement.textContent = `Total: $${total}`;
  cartFooter.classList.add("show");
}