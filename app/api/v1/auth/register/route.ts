import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { error } from "console";
import { SALT } from "@/lib/envConfig";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    req.email = req.email.toLowerCase();
    const checkAccount = await prisma.auth.findFirst({
      where: {
        email: req.email,
      },
    });

    if (checkAccount) {
      return Response.json({
        status: 409,
        success: false,
        message: "Email already has been taken, try another email",
      });
    }

    const hashed = bcrypt.hashSync(req.password, SALT);

    await prisma.user.create({
      data: {
        name: req.name,
        Auth: {
          create: {
            email: req.email,
            password: hashed,
          },
        },
      },
    });

    return Response.json({
      success: true,
      message: "Success Creating New Account",
    });
  } catch (err: any) {
    return Response.json({ success: false, message: err.message });
  }
}
