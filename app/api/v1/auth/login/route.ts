import prisma from "@/lib/prisma";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const checkAccount = await prisma.auth.findFirst({
      where: {
        email: data.email,
      },
      include: {
        user: true,
      },
    });

    if (!checkAccount) {
      return Response.json({
        status: 404,
        success: false,
        message: "Account not found",
      });
    }

    const checkPassword = bcrypt.compareSync(
      data.password,
      checkAccount.password
    );
    if (!checkPassword) {
      return Response.json({
        status: 403,
        success: false,
        message: "Wrong password!",
      });
    }
    const payload = {
      id: checkAccount.id,
      email: checkAccount.email,
      user: checkAccount.user.name,
    };
    const _token =
      "Bearer " +
      jwt.sign(payload, "rahasia", {
        expiresIn: "1d",
      });

    return Response.json({
      status: 200,
      success: true,
      data: {
        token: _token,
      },
    });
  } catch (err: any) {
    return Response.json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
}
