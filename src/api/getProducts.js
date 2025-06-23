/**
 * @param {Object} [options]
 * @param {Function} [options.filter] 
 * @param {Function} [options.sort] -
 * @returns {Promise<Array>} 
 */
export async function getProducts(options = {}) {
  try {
    const dataUrl = `${import.meta.env.BASE_URL}/data.json`;
    const response = await fetch(dataUrl, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Malformed data: Expected an array of products");
    }

    let products = data;

    if (typeof options.filter === "function") {
      products = products.filter(options.filter);
    }

    if (typeof options.sort === "function") {
      products = products.slice().sort(options.sort);
    }

    return products;
  } catch (error) {
    throw new Error(`getProducts error: ${error.message}`);
  }
}