"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  user: string;
}

function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.email === "string" &&
    typeof obj.user === "string"
  );
}

export default function Profile({ user }: { user: User | unknown }) {

  if(!isUser(user)) {
    return <p>Invalid User</p>
  }

  return (
    <div className="container w-full bg-white shadow-md">
      <div className="flex flex-row border">
        <div className="basis-1/3 ">
          <div className="rounded-md m-3 py-3 border shadow-sm">
            <Image
              src="/image/profile.jpg"
              width={230}
              height={230}
              alt="profile"
              className="mx-auto"
            />
            <div className="flex justify-center mt-3">
              <Button className="w-10/12 mx-auto" variant="outline">
                Ubah Profile
              </Button>
            </div>
            <div className="flex justify-center my-2">
              <p className="text-xs text-gray-600 w-10/12">
                Besar file: maksimum 10 Megabytes. Ekstensi file yang
                diperbolehkan: .JPG .JPEG .PNG
              </p>
            </div>
          </div>
        </div>
        <div className="w-full py-3 px-3">
          <p className="text-xl text-gray-600">Informasi Akun</p>
          <Table className="w-full table-auto">
            <TableBody>
              <TableRow>
                <TableCell className="text-base text-left whitespace-nowrap">
                  Nama
                </TableCell>
                <TableCell className="text-base text-left whitespace-nowrap">
                  {user.user}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-base text-left whitespace-nowrap">
                  Tanggal Lahir
                </TableCell>
                <TableCell className="text-base text-left whitespace-nowrap">
                  16 Juli 2003
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-base text-left whitespace-nowrap">
                  Nomor Hp
                </TableCell>
                <TableCell className="text-base text-left whitespace-nowrap">
                  089678762891
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-base text-left whitespace-nowrap">
                  Email
                </TableCell>
                <TableCell className="text-base text-left whitespace-nowrap">
                  example@email.com
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
