import { apiClient } from "@/lib/api-client";
import {
  Product,
  ProductCreatePayload,
  ProductUpdatePayload,
  QuantityUpdatePayload,
  MaterialCategory,
  MaterialCategoryCreatePayload,
  MaterialSubCategory,
  MaterialSubCategoryCreatePayload,
  ProductMaterialItem,
} from "@/types/products";

export const productsService = {
  // 1. Parent Categories
  getCategories: async (): Promise<MaterialCategory[]> => {
    const res = await apiClient.get<MaterialCategory[]>("/products/categories");
    return res.data;
  },

  createCategory: async (payload: MaterialCategoryCreatePayload): Promise<MaterialCategory> => {
    const res = await apiClient.post<MaterialCategory>("/products/categories", payload);
    return res.data;
  },

  // 2. Material Subcategories
  getSubCategories: async (categoryId?: string): Promise<MaterialSubCategory[]> => {
    const res = await apiClient.get<MaterialSubCategory[]>("/products/sub-categories", {
      params: categoryId ? { category_id: categoryId } : undefined,
    });
    return res.data;
  },

  createSubCategory: async (payload: MaterialSubCategoryCreatePayload): Promise<MaterialSubCategory> => {
    const res = await apiClient.post<MaterialSubCategory>("/products/sub-categories", payload);
    return res.data;
  },

  // 3. Products CRUD
  getProducts: async (): Promise<Product[]> => {
    const res = await apiClient.get<Product[]>("/products");
    return res.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const res = await apiClient.get<Product>(`/products/${id}`);
    return res.data;
  },

  createProduct: async (payload: ProductCreatePayload): Promise<Product> => {
    const res = await apiClient.post<Product>("/products", payload);
    return res.data;
  },

  updateProduct: async (id: string, payload: ProductUpdatePayload): Promise<Product> => {
    const res = await apiClient.put<Product>(`/products/${id}`, payload);
    return res.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },

  // 4. Composition & Weights
  getProductMaterials: async (productId: string): Promise<ProductMaterialItem[]> => {
    const res = await apiClient.get<ProductMaterialItem[]>(`/products/${productId}/materials`);
    return res.data;
  },

  // 5. Quantity Management
  updateQuantity: async (productId: string, payload: QuantityUpdatePayload): Promise<{ total_quantity: number }> => {
    const res = await apiClient.put<{ total_quantity: number }>(`/products/${productId}/quantity`, payload);
    return res.data;
  },

  // 6. PDF Generation Binary Stream
  downloadProductPdf: async (productId: string, sku: string): Promise<void> => {
    const res = await apiClient.get(`/products/${productId}/pdf`, {
      responseType: "blob",
    });
    const blob = new Blob([res.data], { type: "application/pdf" });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `SpecSheet_${sku}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  },
};