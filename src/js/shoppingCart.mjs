import { getLocalStorage } from "./utils.mjs";

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems ? cartItems.map((item) => cartItemTemplate(item)) : [];
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <button class="cart-card__remove" data-id="${item.id}">❌</button>
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
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

//working on this 
document.querySelector(".product-list").addEventListener("click", function (event) {
  if (event.target.classList.contains("cart-card__remove")) {
    const itemId = event.target.getAttribute("data-it");
    removeFromCart(itemId);
    renderCartContents();
  }
}) 