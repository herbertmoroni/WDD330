// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = await templateFn(data);

  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }

}

export function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);

    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}


export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    //cartCount.textContent = cartItems.length.toString();
    //cartCount.style.display = cartItems.length > 0 ? "inline" : "none";
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.Quantity || 1), 0);
    cartCount.textContent = totalQuantity.toString();
    cartCount.style.display = totalQuantity > 0 ? "inline" : "none";
  }
}

export function animateCart() {
  const cartIcon = document.querySelector('.cart');
  if (cartIcon) {
    cartIcon.classList.add('animating');
    setTimeout(() => {
      cartIcon.classList.remove('animating');
    }, 500); // nimation duration
  }
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("../partials/header.html");
  const footerTemplateFn = loadTemplate("../partials/footer.html");

  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");

  await renderWithTemplate(headerTemplateFn, headerElement);

  updateCartCount();

  renderWithTemplate(footerTemplateFn, footerElement);
}

export function calculateDiscount(suggestedPrice, finalPrice) {
  return ((suggestedPrice - finalPrice) / suggestedPrice * 100).toFixed(0);
}

export function renderPriceAndDiscount(priceElement, suggestedPrice, finalPrice) {
  const discount = calculateDiscount(suggestedPrice, finalPrice);

  const discountSpan = document.createElement('span');
  discountSpan.className = 'product-card__discount';
  discountSpan.textContent = `-${discount}%`;

  const priceSpan = document.createElement('span');
  priceSpan.className = 'product-card__final-price';
  priceSpan.textContent = finalPrice;

  priceElement.innerHTML = '';
  if (discount > 0) {
    priceElement.appendChild(discountSpan);
  }
  priceElement.appendChild(priceSpan);
}

export function renderProductPrice(product) {
  const priceElement = document.querySelector("#productFinalPrice");
  renderPriceAndDiscount(priceElement, product.SuggestedRetailPrice, product.FinalPrice);
}

// modal
// *** TESTING MODAL: go to dev tools, application tab, and delete "hasVisitedBefore" ***

export function createRegistrationModal() {
  const modal = document.getElementById("registration-modal");
  const closeButton = document.querySelector(".close-button");
  const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

  if (!hasVisitedBefore) {
    setTimeout(() => {
      modal.style.display = "block";
    }, 2000);

    localStorage.setItem("hasVisitedBefore", "true");
  }

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });

  return {
    open: () => { modal.style.display = "block"; },
    close: () => { modal.style.display = "none"; }
  };
}

export function searchBar(containerId) {
  const container = document.getElementById(containerId);

  const form = document.createElement("form");
  form.action = "/search";
  form.method = "get";
  form.className = "search-bar";

  form.id = "searchForm";

  const input = document.createElement("input");
  input.type = "text";
  input.name = "query";
  input.placeholder = "Search Products...";
  input.setAttribute("aria-label", "Search");

  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      form.submit();
    }
  });

  form.appendChild(input);

  container.appendChild(form);
}

// searchBar("search-container");