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