import { loadHeaderFooter, getParams } from "./utils.mjs";
import {login} from "./auth.mjs";

loadHeaderFooter();

const parameters = getParams("redirect");
console.log(parameters);

document.querySelector("#loginButton").addEventListener("click", (e) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    login({ email, password }, parameters);
  });