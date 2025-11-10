import type { Product } from "../pages/Products";

const API_BASE = "http://localhost:3001";

export const productApi = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },

  // Get product by ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json();
  },

  // Add new product
  addProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    return response.json();
  },

  // Update product
  updateProduct: async (
    id: number,
    product: Partial<Product>
  ): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    return response.json();
  },

  // Delete product
  deleteProduct: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  },
};
