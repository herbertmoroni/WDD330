const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
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
