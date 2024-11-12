import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export function renderComments(productID) {
    console.log("Rendering comments for product ID:", productID);
    const commentsContainer = document.querySelector(".comments");
    commentsContainer.innerHTML = ""; 

    const comments = getLocalStorage(`comments_${productID}`) || [];

    comments.forEach(comment => {
        const commentElement = document.createElement("p");
        commentElement.textContent = comment;
        commentsContainer.appendChild(commentElement);
    });
}

export function addComment(event, productID) {
    event.preventDefault();

    const commentInput = document.getElementById("commentInput");
    const newComment = commentInput.value.trim();

    if (newComment) {
        const comments = getLocalStorage(`comments_${productID}`) || [];
        comments.push(newComment);
        setLocalStorage(`comments_${productID}`, comments);

        commentInput.value = ""; 
        renderComments(); 
    }
}