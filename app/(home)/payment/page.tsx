"use client";
import Navbar from "@/components/navbar";
import { MapPinned } from "lucide-react";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="bg-white my-2 py-5 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl">Pembayaran</h1>
          <p>{"Keranjang > Pembayaran > Selesai"}</p>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="bg-white w-full sm:p-1 rounded-sm shadow-sm">
          <div className="p-4">
            <div className="mb-2 flex flex-row gap-2">
              <MapPinned />
              <p className="text-lg">Rizki Mauludin Yoga Prasetyo</p>
            </div>
            <p>0895700561876</p>
            <p>
              Jalan alam segar 2 no 16 rt 03, sempaja selatan, samarinda Utara,
              Samarinda, kalimantan Timur
            </p>
          </div>
        </div>
        <div className="bg-white w-full sm:p-1 rounded-sm shadow-sm my-4">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa porro
            unde ducimus corrupti facere magni itaque dicta accusantium
            voluptates, culpa necessitatibus dignissimos amet, voluptatu  m iste
            distinctio earum assumenda ad deleniti?
          </div>
        </div>
      </div>
    </div>
  );
}
