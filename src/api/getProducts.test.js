import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockProducts = [
  { name: "A", category: "Cake", price: 2 },
  { name: "B", category: "Pie", price: 1 },
  { name: "C", category: "Cake", price: 3 },
];

describe("getProducts", () => {
  let getProducts;
  let fetchSpy;

  beforeEach(async () => {
    vi.resetModules();
    // Re-import the module to use the mocked fetch
    getProducts = (await import("./getProducts.js")).getProducts;
    fetchSpy = vi.spyOn(global, "fetch");
  });

  afterEach(() => {
    // Restore the original fetch implementation
    vi.restoreAllMocks();
  });

  it("should return all products", async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
    const products = await getProducts();
    expect(products).toHaveLength(3);
    expect(products[0].name).toBe("A");
  });

  it("should filter by category", async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
    // The implementation expects a filter function
    const products = await getProducts({
      filter: (p) => p.category === "Cake",
    });
    expect(products).toHaveLength(2);
    expect(products.every((p) => p.category === "Cake")).toBe(true);
  });

  it("should sort by price ascending", async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
    // The implementation expects a sort function
    const products = await getProducts({ sort: (a, b) => a.price - b.price });
    expect(products[0].price).toBe(1);
    expect(products[2].price).toBe(3);
  });

  it("should sort by price descending", async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
    // The implementation expects a sort function
    const products = await getProducts({
      sort: (a, b) => b.price - a.price,
    });
    expect(products[0].price).toBe(3);
    expect(products[2].price).toBe(1);
  });

  it("should handle fetch failure gracefully", async () => {
    fetchSpy.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });
    // Match the error thrown by the implementation
    await expect(getProducts()).rejects.toThrow(
      "getProducts error: Failed to fetch products: 404 Not Found"
    );
  });

  it("should handle malformed data (not an array)", async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "this is not an array" }),
    });
    // Match the error thrown by the implementation
    await expect(getProducts()).rejects.toThrow(
      "getProducts error: Malformed data: Expected an array of products"
    );
  });

  it("should handle malformed data (invalid JSON)", async () => {
    const jsonError = new SyntaxError(
      "Unexpected token i in JSON at position 0"
    );
    fetchSpy.mockResolvedValue({
      ok: true,
      json: () => Promise.reject(jsonError),
    });
    await expect(getProducts()).rejects.toThrow(
      `getProducts error: ${jsonError.message}`
    );
  });

  it("should return empty array if data is empty", async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    const products = await getProducts();
    expect(products).toEqual([]);
  });
});
