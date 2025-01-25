"use client";

import Navbar from "@/components/navbar";
import Image from "next/image";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash, HandCoins } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { ToastDestructive } from "@/components/errorToast";
import { getChart, ChartProduct, updateChart } from "../action/action";
import { Skeleton } from "@/components/ui/skeleton";

// Store
import { useLogin } from "@/hooks/user-info-store";
import { useChart } from "@/hooks/store-chart";

export default function Page() {
  const token = useLogin((state) => state.cookies);
  // const [chart, setChart] = useState<ChartProduct[]>([]);
  const chart = useChart((state) => state.product);
  const setChart = useChart((state) => state.setProduct);
  const setQuantity = useChart((state) => state.setQuantity);
  const updateProduct = useChart((state) => state.updatedProduct);
  const setError = useChart((state) => state.setError);
  const isError = useChart((state) => state.error);
  const totalPrice = useChart((state) => state.price());

  // debouncer
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await getChart(token);
        if (response) {
          setChart(response);
        } else {
          throw new Error("Gagal mengakses data, coba lagi");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected server error");
        }
        return;
      }
    };
    fetchChart();
  }, [setChart, setError, token]);

  useEffect(() => {
    const debounceUpdateFn = async () => {
      try {
        if (updateProduct) {
          const response = await updateChart(updateProduct, token);
          console.log(response);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected server error");
        }
        return;
      }
    };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      debounceUpdateFn();
    }, 1500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [updateProduct, setError, token]);
  const addQuantity = (id: string, currentQuantity: number) => {
    setQuantity(currentQuantity + 1, id);
  };

  const reduceQuantity = (id: string, currentQuantity: number) => {
    setQuantity(currentQuantity - 1, id);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white my-2 py-5 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl">Keranjang</h1>
          <p>Satu langkah lagi sebelum checkout pesanan kamu!</p>
        </div>
      </div>
      <div className="container mx-auto my-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white col-span-2 rounded-lg p-1 shadow-sm ">
            {chart && chart.length > 0 ? (
              chart.map((item, index) => (
                <div key={index}>
                  <div className="py-2 flex flex-row justify-between">
                    <div className="flex flex-row gap-3">
                      <Image
                        src="/image/profile.jpg"
                        width={100}
                        height={100}
                        alt={item.product.productName}
                        className="ms-2"
                      />
                      <div>
                        <p>{item.product.productName}</p>
                        <div className="h-12"></div>
                        <div className="border rounded-lg flex justify-center items-center">
                          <Plus
                            size={15}
                            onClick={() => addQuantity(item.id, item.quantity)}
                          />
                          <input
                            type="text"
                            className="w-10 text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <Minus
                            size={15}
                            onClick={() =>
                              reduceQuantity(item.id, item.quantity)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-2 grid grid-cols-1 md:grid-cols-1">
                      <p>
                        Rp.
                        {item.product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </p>
                      <div className="self-end">
                        <Trash />
                      </div>
                    </div>
                  </div>
                  <Separator className="border" />
                </div>
              ))
            ) : (
              <div>
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="py-2 flex flex-row justify-between"
                  >
                    <div className="flex flex-row gap-3">
                      <Skeleton className="ms-2 w-24 h-24" />{" "}
                      <div>
                        <Skeleton className="w-32 h-5 mb-2" />{" "}
                        <Skeleton className="w-20 h-5" />{" "}
                      </div>
                    </div>
                    <div className="px-2 grid grid-cols-1 md:grid-cols-1">
                      <Skeleton className="w-16 h-5 mb-2" />{" "}
                      <Skeleton className="w-10 h-10" />{" "}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Total Price Section */}
          <div className="border bg-white max-h-40 min-h-40 col-span-1 p-4">
            <div className="flex gap-2">
              <h3 className="text-lg font-bold">Ringkasan</h3>
              <HandCoins />
            </div>
            <div className="flex text-lg justify-between my-3">
              <p className="">Total Harga</p>
              <p className="font-semibold">Rp.{totalPrice}</p>
            </div>
            <Button className="w-full">Bayar</Button>
          </div>
        </div>
      </div>
      {isError && <ToastDestructive message={isError} />}
    </div>
  );
}
