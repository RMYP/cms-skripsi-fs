import Image from "next/image";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function SingleProductPage() {
  return (
    <div>
      <Navbar isLogin={true} />
      <div className="container mx-auto mt-5 p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
        <div className="flex justify-center items-center">
          <Image
            src="/image/profile.jpg"
            width={500}
            height={500}
            alt="Product Name"
            className="rounded-md shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Gooseneck Coffee Pot 400ml
          </h1>

          <div className="flex items-center space-x-4">
            <Image
              src="/image/profile.jpg"
              width={50}
              height={50}
              alt="Seller Logo"
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-gray-800">Toso Store</p>
              <p className="text-sm text-gray-500">Jakarta, Indonesia</p>
            </div>
          </div>

          <p className="text-3xl font-bold text-red-600">Rp 120.000</p>

          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md">
              -
            </button>
            <p className="w-8 text-center">1</p>
            <button className="px-4 py-2 border border-gray-300 rounded-md">
              +
            </button>
          </div>

          <div className="flex space-x-4">
            <Button className="w-full bg-green-600 text-white hover:bg-green-700">
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="w-full hover:bg-gray-100 text-gray-700"
            >
              Add to Cart
            </Button>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold">Product Description</h2>
            <p className="text-gray-700">
              This gooseneck coffee pot is perfect for precise pouring when
              brewing coffee or tea. Made with high-quality stainless steel, it
              holds 400ml and features a stylish, ergonomic design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
