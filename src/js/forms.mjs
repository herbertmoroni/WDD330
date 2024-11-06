import checkoutProcess from "./checkoutProcess.mjs";

export function createNewsletterForm() {
    const container = document.getElementById("newsletter-container");

    const form = document.createElement("form");
    form.id = "newsletter-form";
    form.className = "newsletter-form"

    const heading = document.createElement("h2");
    heading.textContent = "Subscribe to Our Newsletter";

    const description = document.createElement("p");
    description.textContent = "Stay updated on the latest product releases and special offers!"

    const label = document.createElement("label");
    label.for - "email";
    label.textContent = "Email:";

    const input = document.createElement("input");
    input.type = "email";
    input.id = "email";
    input.name = "email";
    input.placeholder = "Please enter your email";
    input.required = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Sign Up";

    form.appendChild(heading);
    form.appendChild(description);
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);

    container.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Thank you for subscribing!");
        form.reset();
    });
}

export function createCheckoutForm() {
    const container = document.getElementById("checkout-container");

    const form = document.createElement("form");
    form.id = "checkout-form";
    form.className = "checkout-form";

    const heading = document.createElement("h2");
    heading.textContent = "Review & Place your Order";
    form.appendChild(heading);

    const shippingFieldset = document.createElement("fieldset");
    const shippingLegend = document.createElement("legend");
    shippingLegend.textContent = "Shipping";
    shippingFieldset.appendChild(shippingLegend);

    const shippingFields = [
        { label: "First Name", name: "first-name", type: "text", required: true },
        { label: "Last Name", name: "last-name", type: "text", required: true },
        { label: "Street", name: "street", type: "text", required: true },
        { label: "City", name: "city", type: "text", required: true },
        { label: "State", name: "state", type: "text", required: true },
        { label: "Zip", name: "zip", type: "text", required: true }
    ];

    shippingFields.forEach(field => {
        const label = document.createElement("label");
        label.textContent = field.label;

        const input = document.createElement("input");
        input.type = field.type;
        input.name = field.name;
        input.id = field.name;
        if (field.required) input.required = true;

        label.appendChild(input);
        shippingFieldset.appendChild(label);
    });
    form.appendChild(shippingFieldset);

    const paymentFieldset = document.createElement("fieldset");
    const paymentLegend = document.createElement("legend");
    paymentLegend.textContent = "Payment";
    paymentFieldset.appendChild(paymentLegend);

    const paymentFields = [
        { label: "Card Number", name: "card-number", type: "text", required: true },
        { label: "Expiration", name: "expiration", type: "text", required: true },
        { label: "Security Code", name: "security-code", type: "text", required: true }
    ];

    paymentFields.forEach(field => {
        const label = document.createElement("label");
        label.textContent = field.label;

        const input = document.createElement("input");
        input.type = field.type;
        input.name = field.name;
        input.id = field.name;
        if (field.required) input.required = true;

        label.appendChild(input);
        paymentFieldset.appendChild(label);
    });
    form.appendChild(paymentFieldset);

    const orderSummary = document.createElement("fieldset");
    const summaryLegend = document.createElement("legend");
    summaryLegend.textContent = "Order Summary";
    orderSummary.appendChild(summaryLegend);

    const itemSubtotal = document.createElement("p");
    itemSubtotal.textContent = "Item Subtotal";
    orderSummary.appendChild(itemSubtotal);

    const shippingEstimate = document.createElement("p");
    shippingEstimate.textContent = "Shipping Estimate";
    orderSummary.appendChild(shippingEstimate);

    const tax = document.createElement("p");
    tax.textContent = "Tax";
    orderSummary.appendChild(tax);

    const orderTotal = document.createElement("p");
    orderTotal.textContent = "Order Total";
    orderSummary.appendChild(orderTotal);

    form.appendChild(orderSummary);

    const finalCheckoutButton = document.createElement("button");
    finalCheckoutButton.type = "submit";
    finalCheckoutButton.textContent = "Checkout";
    finalCheckoutButton.className = "final-checkout-button";

    form.appendChild(finalCheckoutButton);

    container.appendChild(form);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        try {
            await checkoutProcess.checkout(form);
            alert("Thank you for your order!");
            setLocalStorage("so-cart", []);
            form.reset();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    });
}