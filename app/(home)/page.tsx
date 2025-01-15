"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import {
  getHomepage,
  Product,
  getProductById,
  checkLoginStatus,
} from "./action/action";
import { useEffect, useState } from "react";
import { Banner } from "@/components/banner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [productArray, setProductArray] = useState<Product[]>([]);
  const [isError, setIsError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const truncateTitle = (title: string, maxLength: number): string => {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength - 3).trimEnd() + "...";
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setIsLogin(await checkLoginStatus());
      } catch (err) {
        setIsLogin(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const products = await getHomepage();
        if (Array.isArray(products)) {
          setProductArray(products);
        } else {
          setIsError("Failed to load products, please try again");
        }
      } catch (err) {
        setIsError("Unexpected server error");
      }
    };
    checkLogin();
    fetchProducts();
  }, []);

  const skeletonCard = () => {
    return (
      <div className="space-y-4">
        <Card className="hover:shadow-md">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-3/4" />
            </CardTitle>
            <Skeleton className="h-4 w-1/2 mt-2" />{" "}
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
          <CardFooter className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Navbar isLogin={isLogin} />
      <div className="container mx-auto">
        <Banner />
        <div className="relative overflow-hidden shadow-md py-2 border-2 mx-2 my-4 hidden sm:flex">
          <div className="whitespace-nowrap animate-scroll">
            <span className="text-lg">
              "Rizki Putra E-Commerce Prototype – Shaping Innovation, Welcoming
              Feedback for a Better Future!"
            </span>
          </div>
        </div>
        <div className="flex justify-center text-lg shadow-xl py-2 border-2 rounded-md mx-2 bg-zinc-900 text-white font-bold">
          <p>Rekomendasi</p>
        </div>
        <div className="grid grid-flow-row auto-rows-max grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-2 py-5">
          {isError ? (
            <div className="text-red-500">{isError}</div>
          ) : productArray.length > 0 ? (
            productArray.map((product: Product, index: number) => (
              <div key={index}>
                <Link href={`/product/${product.id}`}>
                  <Card className="hover:border-4 hover:shadow-md">
                    <CardHeader>
                      <CardTitle>
                        {truncateTitle(
                          product.productName || "Default Title",
                          35
                        )}
                      </CardTitle>
                      <CardDescription>
                        {`Rp.${product.price || "90.000"}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={"/image/profile.jpg"}
                        width={200}
                        height={200}
                        alt={product.productName || "Product Image"}
                        className="mx-auto"
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <p className="text-lg font-bold ps-1 position">
                        {`Rp.${product.price || "90.000"}`}
                      </p>
                      <Button
                        className="w-full hover:bg-zinc-800 hover:text-white hover:font-bold mt-1"
                        variant="outline"
                      >
                        Masukan Keranjang
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            ))
          ) : (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>{skeletonCard()}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
