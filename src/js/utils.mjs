// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');
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

export async function renderWithTemplate(templateFn, parentElement, data,  callback, position = "afterbegin", clear = true) {
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

export function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("../partials/header.html");
  const footerTemplateFn = loadTemplate("../partials/footer.html");

  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");

  renderWithTemplate(headerTemplateFn, headerElement);
  renderWithTemplate(footerTemplateFn, footerElement);

  // headerTemplateFn().then((template) => {
  //     headerElement.innerHTML = template;
  // });

  // footerTemplateFn().then((template) => {
  //     footerElement.innerHTML = template;
  // });
}