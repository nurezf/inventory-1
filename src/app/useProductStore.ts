import { create } from "zustand";
import { Product } from "./Products/Columns";
import { products } from "./Products/productData";

interface ProductState {
  allProducts: Product[];
  setAllProducts: (allProducts: Product[]) => void;
  loadProducts: () => void;
}

function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
}

export const useProductStore = create<ProductState>((set) => ({
  allProducts: [],
  setAllProducts: (allProducts) => {
    set({ allProducts: allProducts });
  },
  loadProducts: async () => {
    const fetchedProducts = await fetchProducts();
    console.log(fetchedProducts);
    set({ allProducts: fetchedProducts });
  },
}));
