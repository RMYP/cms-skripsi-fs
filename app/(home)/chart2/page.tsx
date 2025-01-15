"use client";

import Navbar from "@/components/navbar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useCheckChart } from "@/hooks/store";
import { Plus, Minus } from "lucide-react";
import { getCookie } from "cookies-next";
import { getChart, ChartProduct, updateChart } from "../action/action";

export default function Page() {
  const products = useCheckChart((state) => state.products);
  // const details = useCheckChart((state) => state.index);
  const addChart = useCheckChart((state) => state.addToChart);
  const removeChart = useCheckChart((state) => state.removeFromChart);
  const addQuantity = useCheckChart((state) => state.addQuantity);
  const reduceQuantity = useCheckChart((state) => state.reduceQuantity);
  const finalPrice = useCheckChart((state) => state.finalPrice);
  const temporaryQuantity = useCheckChart((state) => state.updateQuantity);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // const [temporaryQuantity, setTemporaryQuantity] = useState<number>(0);
  const [updateData, setUpdateData] = useState(0);
  const [getProduct, setGetProduct] = useState<ChartProduct[]>();
  const [token, setToken] = useState("");
  const [checkedStates, setCheckedStates] = useState(
    Array(products.length).fill(false)
  );
  // const totalPrice = details.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCardClick = (
    index: number,
    id: string,
    price: number,
    quantity: number
  ) => {
    setCheckedStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = !updatedStates[index];
      if (updatedStates[index]) {
        addChart(id, quantity, price);
      } else {
        removeChart(id);
      }
      return updatedStates;
    });
  };

  useEffect(() => {
    const token = async () => {
      try {
        const token = getCookie("_token") as string | undefined;
        if (token) {
          setToken(token);
          const data = await getChart(token);
          setGetProduct(data);
        } else {
          throw new Error("token not found");
        }
      } catch (err: unknown) {
        console.log("token not found");
        const message = err instanceof Error ? err.message : "unexpected error";
        return message;
      }
    };
    token();
  }, [updateData]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    const debounceUpdate = async () => {
      if (token) {
        await updateChart(temporaryQuantity, token);
        setUpdateData((prev) => prev + 1);
      }
    };

    debounceTimeout.current = setTimeout(() => {
      debounceUpdate();
    }, 1500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [temporaryQuantity, token]);

  return (
    <div>
      <Navbar isLogin={true} />
      <div className="container mx-auto my-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white col-span-2 rounded-lg p-1 shadow-sm">
            {getProduct &&
              getProduct.map((product, index) => (
                <div key={product.id}>
                  <Card className="rounded-none flex shadow-none border-none  p-2 justify-between">
                    {/* Left Section */}
                    <div className="flex my-2">
                      <Checkbox
                        className="cursor-pointer"
                        onClick={() =>
                          handleCardClick(
                            index,
                            product.id,
                            product.totalPrice,
                            product.quantity
                          )
                        }
                        checked={checkedStates[index]}
                      />
                      <Image
                        src="/image/profile.jpg"
                        width={100}
                        height={100}
                        alt={product.product.productName}
                        className="ms-2"
                      />
                      <div className="ml-4">
                        <p className="font-bold">
                          {product.product.productName}
                        </p>
                        <p className="text-sm text-gray-500">Original</p>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col justify-between mt-2 items-end">
                      {/* Price */}
                      <div className="font-bold text-lg">
                        $
                        {product.product.price &&
                          product.product.price.toFixed(2)}
                      </div>
                      {/* Input for Quantity */}
                      <div className="flex items-center space-x-2 mt-4 border rounded-3xl">
                        <button
                          className=" border-gray-300 ps-2 py-1 rounded text-sm"
                          onClick={() =>
                            reduceQuantity(product.id, 1, product.quantity)
                          }
                        >
                          <Minus size={15} />
                        </button>
                        <input
                          type="text"
                          value={(() => {
                            const detail = temporaryQuantity.find(
                              (detail) => detail.id === product.id
                            );
                            return (
                              (detail ? detail.quantity : product.quantity) ??
                              product.quantity
                            );
                          })()}
                          readOnly
                          className="w-10 text-center border-gray-300 rounded"
                        />

                        <button
                          className=" cursor-pointer border-gray-300 pe-2 py-1 rounded text-sm"
                          onClick={() =>
                            addQuantity(product.id, 1, product.quantity)
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </Card>
                  <Separator />
                </div>
              ))}
          </div>

          {/* Total Price Section */}
          <div className="border bg-white max-h-40 min-h-40 col-span-1 p-4">
            <h3 className="text-lg font-bold">Total Price</h3>
            <p className="text-xl font-semibold">Rp {finalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
