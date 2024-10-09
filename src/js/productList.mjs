import { getData } from "./productData.mjs";
export default async function productList() {
    const productList = document.querySelector(".product-list");
    const products = await getData();
    products.forEach(element => {
        const p = productCard(element);
        productList.append(p);
    });
}
function productCard(product) {
    const template = document.getElementById("product-card-template");
    const clone = template.content.cloneNode(true);
    const name = clone.querySelector(".card__name");
    name.textContent = product.NameWithoutBrand;
    return clone;
}