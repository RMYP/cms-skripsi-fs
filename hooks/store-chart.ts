import { create } from "zustand";

interface Product {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  categoryId: string;
  tag: string;
}

interface ChartProduct {
  id: string;
  product: Product;
  productId: string;
  quantity: number;
  timeStamp: Date;
  totalPrice: number;
  userId: string;
}

interface Chart {
  product: ChartProduct[];
  updatedProduct?: ChartProduct;
  error: string;
  price: () => string;
  setProduct: (product: ChartProduct[]) => void;
  setError: (err: string) => void;
  setUpdateProduct: (Product: ChartProduct) => void;
  setQuantity: (quantity: number, id: string) => void;
}

export const useChart = create<Chart>((set, get) => ({
  product: [],
  updatedProduct: undefined,
  error: "",
  price: () => {
    const { product } = get();
    const total = product.reduce((total, item) => total + item.totalPrice, 0);
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  setError: (err) => set(() => ({ error: err })),
  setProduct: (product) => set(() => ({ product })),
  setUpdateProduct: (product) =>
    set((state) => {
      const findProductIndex = state.product.findIndex(
        (item) => item.id === product.id
      );

      if (findProductIndex) {
        const updateProduct = [...state.product];
        updateProduct[findProductIndex] = product;
        return {
          ...state,
        };
      }
      return {};
    }),
  setQuantity: (quantity, id) =>
    set((state) => {
      const productIndex = state.product.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        const product = state.product[productIndex];
        if (product.product.quantity >= quantity) {
          if (quantity > 0) {
            const updatedProduct = {
              ...product,
              quantity,
              totalPrice: quantity * product.product.price,
            };

            const updatedProducts = [...state.product];
            updatedProducts[productIndex] = updatedProduct;
            return {
              ...state,
              product: updatedProducts,
              updatedProduct: updatedProduct,
              error: "",
            };
          }
          return{}
        }

        return {
          ...state,
          error: "Stok tidak mencukupi",
        };
      }

      return {
        ...state,
        error: "Product tidak tersedia",
      };
    }),
}));
