const baseURL = import.meta.env.VITE_SERVER_URL;

//const baseURL = 'http://server-nodejs.cit.byui.edu:3000';

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(`${baseURL}/products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  try {
    const response = await fetch(baseURL + `/product/${id}`);
    const products = await convertToJson(response);
    return products.Result;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "/checkout/", options).then(convertToJson);
}

export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "/login/", options).then(convertToJson);
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };
  const response = await fetch(baseURL + "/orders/", options).then(convertToJson);
  return response;
}