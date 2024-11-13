import { loginRequest } from "./externalServices.mjs";
import {setLocalStorage, getLocalStorage} from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

export default async function login(creds, redirect="/"){
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        window.location = redirect;
      } catch (err) {
        alert(err.message.message);
      }
}

export function checkLogin(){
    const token = getLocalStorage(tokenKey);
    const valid = isTokenValid(token);

    if (!valid) {
        localStorage.removeItem(tokenKey);
        const location = window.location;
        console.log(location);
        window.location = `/login/index.html?redirect=${location.pathname}`;
    } else return token; 
}

function isTokenValid(token){
  if (token) {
    const decoded = jwt_decode(token);
    let currentDate = new Date();

    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      return false;
    } else {
      console.log("Valid token");
      return true;
    }
  } else return false;
}