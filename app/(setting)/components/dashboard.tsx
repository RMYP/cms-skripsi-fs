"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Profile({ value }: { value: string | undefined }) {
  return (
    <div className="container w-full bg-white">
      <div className="flex flex-row">
        <div className="basis-1/3 border">
          <div className="rounded-md m-3 py-3 border">
            <Image
              src="/image/profile.jpg"
              width={230}
              height={230}
              alt="profile"
              className="mx-auto"
            />
            <div className="flex justify-center mt-3">
              <Button className="w-10/12 mx-auto" variant="outline">Ubah Profile</Button>
            </div>
          </div>
        </div>
        <div className="w-full border">info</div>
      </div>
    </div>
  );
}
