import axios from "axios";

import { updateQuantity } from "@/hooks/store";
export interface Product {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  categoryId: string;
  tag: string;
}

export interface ChartProduct {
  id: string;
  product: Product;
  productId: string;
  quantity: number;
  timeStamp: Date;
  totalPrice: number;
  userId: string;
}

export const getHomepage = async (): Promise<Product[] | null | string> => {
  try {
    const response = await axios.get("/api/v1/product/getProduct");
    return response.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
    console.log(err);
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`/api/v1/product/getProduct/${id}`);
    if (response.status == 404) {
      console.log(true);
      throw new Error("Not Found!");
    }
    console.log("trus");
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    } else {
      console.log(err);
      return "Unexpected Error";
    }
  }
};

export const checkLoginStatus = async () => {
  try {
    const response = await axios.get("/api/v1/auth/status");
    if (response.status == 200) {
      return true;
    }
    throw new Error();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return false;
  }
};

// chart

export const getChart = async (token: string) => {
  try {
    console.log("masuk");
    const response = await axios.get("api/v1/chart/getChart", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    console.log("tes", response.data.data);
    return response.data.data;
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return false;
  }
};

export const updateChart = async (
  updatedProducts: ChartProduct,
  token: string
) => {
  try {
    const response = await axios.post(
      "api/v1/chart/detailChart",
      { updatedProducts },
      { headers: { Authorization: `bearer ${token}` } }
    );
    if (response.status == 200) {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err: unknown) {
    return err instanceof Error ? err.message : "Unexpected Error";
  }
};
