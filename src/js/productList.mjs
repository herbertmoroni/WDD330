import { getData } from "./productData.mjs";
import { renderPriceAndDiscount } from "./utils.mjs";

export default async function productList(category) {
    const productList = document.querySelector(".product-list");
    const products = await getData(category);
    console.log(category);
    console.log(products);

    products.forEach(element => {
        //if (element.Id == "880RR" || element.Id == "985RF" || element.Id == "985PR" || element.Id == "344YJ") {
            const p = productCard(element);
            productList.append(p);
        //}
    });
}

function productCard(product) {
    const template = document.getElementById("product-card-template");
    const clone = template.content.cloneNode(true);

    const urlRef = clone.querySelector(".card__url");
    urlRef.href = `/product_pages/index.html?product=${product.Id}`;

    const image = clone.querySelector(".card__image");
    image.src = product.Images.PrimaryLarge;
    image.alt = product.Name;

    const name = clone.querySelector(".card__name");
    name.textContent = product.NameWithoutBrand;

    const brand = clone.querySelector(".card__brand");
    brand.textContent = product.Brand.Name;

    const priceElement = clone.querySelector(".card__price");
    renderPriceAndDiscount(priceElement, product.SuggestedRetailPrice, product.FinalPrice);

    return clone;
}