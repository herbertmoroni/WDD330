import { getProductsByCategory } from "./externalServices.mjs";
import { renderPriceAndDiscount } from "./utils.mjs";

export default async function productList(category) {
    const productList = document.querySelector(".product-list");
    const products = await getProductsByCategory(category);
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

    // Update image to use srcset
    const image = clone.querySelector(".card__image");
    image.srcset = `
        ${product.Images.PrimarySmall} 80w,
        ${product.Images.PrimaryMedium} 160w,
        ${product.Images.PrimaryLarge} 320w
    `;
    // Add sizes attribute to help browser select correct image
    image.sizes = "(max-width: 500px) 80px, (max-width: 800px) 160px, 320px";
    image.src = product.Images.PrimaryMedium; // Fallback image
    image.alt = product.Name;
    
    // Add loading="lazy" for better performance in listings
    image.loading = "lazy";

    const name = clone.querySelector(".card__name");
    name.textContent = product.NameWithoutBrand;

    const brand = clone.querySelector(".card__brand");
    brand.textContent = product.Brand.Name;

    const priceElement = clone.querySelector(".card__price");
    renderPriceAndDiscount(priceElement, product.SuggestedRetailPrice, product.FinalPrice);

    // Add debug info
    // image.addEventListener('load', function() {
    //     console.log('Loaded image:', {
    //         currentSrc: this.currentSrc,  // Shows which image from srcset was chosen
    //         naturalWidth: this.naturalWidth,
    //         naturalHeight: this.naturalHeight,
    //         offsetWidth: this.offsetWidth,
    //         offsetHeight: this.offsetHeight
    //     });
    // });

    return clone;
}