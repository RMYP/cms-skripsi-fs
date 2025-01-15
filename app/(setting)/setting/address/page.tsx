import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function page() {
  return (
    <div className="bg-white w-full p-3 sm:p-1 rounded-sm">
      <Card className={cn("border-gray-800 shadow-md shadow-gray-900")}>
        <CardHeader>
          <CardTitle>Alamat 1</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <p className="text-lg">Rizki Mauludin Yoga Prasetyo</p>
            <p>0895700561876</p>
          </div>
          <p>
            Jalan alam segar 2 no 16 rt 03, sempaja selatan, samarinda Utara,
            Samarinda, kalimantan Timur
          </p>
        </CardContent>
      </Card>
      <Card className={cn("mt-5")}>
        <CardHeader>
          <CardTitle>Alamat 2</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <p className="text-lg">Rizki Mauludin Yoga Prasetyo</p>
            <p>0895700561876</p>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur ratione exercitationem autem, sit eum animi. Et ut
            similique rerum maiores obcaecati. Iure, numquam adipisci. Minus
            tempora consectetur similique ea quae?
          </p>
        </CardContent>
      </Card>
      <Button className="mt-7">Tambah Alamat Baru</Button>
    </div>
  );
}
