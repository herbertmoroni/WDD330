import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
        this.calculateOrdertotal();
    },
    calculateItemSummary: function () {
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );
        itemNumElement.innerText = this.list.length;

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
        summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
    },

    calculateOrdertotal: function () {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    },

    displayOrderTotals: function () {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");

        shipping.innerText = "$" + this.shipping.toFixed(2);
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    },
    checkout: async function (form) {
        const json = formDataToJSON(form);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
            const res = await checkout(json);
            console.log(res);

            // Clear the cart and show success message
            //localStorage.removeItem(this.key);
            //this.list = [];
            //alert("Order placed successfully! Thank you for your purchase.");
            //location.href = "/";  // Redirect to home page after successful checkout

        } catch (err) {
            // Handle different types of errors
            let errorMessage = "An error occurred during checkout. ";
            
            if (err.message === "Bad Response") {
                // Handle API-specific error
                errorMessage += "Please check your payment information and try again.";
            } else if (err.name === "TypeError") {
                // Handle network errors
                errorMessage += "Please check your internet connection and try again.";
            } else {
                // Handle any other unexpected errors
                errorMessage += "Please try again later or contact customer support.";
            }
            
            // Display error to user
            alert(errorMessage);

            console.error("Checkout Error:", err);
            
            // Re-enable submit button if it was disabled
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    },
};
export default checkoutProcess;