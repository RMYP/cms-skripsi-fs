import prisma from "@/lib/prisma";
import * as jwt from "jsonwebtoken";

interface JwtPayloadWithId extends jwt.JwtPayload {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const token = request.headers.get("authorization")?.split("Bearer ");

    if (!token) {
      return Response.json({
        status: 403,
        success: false,
        message: "Token not found",
      });
    }

    const decodeToken = jwt.verify(token[1], "rahasia") as JwtPayloadWithId;

    if (decodeToken.id !== id) {
      return Response.json({
        status: 404,
        success: false,
        message: "Account not found",
      });
    }

    const checkAccount = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Auth: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!checkAccount) {
      return Response.json({
        status: 404,
        success: false,
        message: "Account not found",
      });
    }

    const payload = {
      name: checkAccount.name,
      email: checkAccount.Auth[0].email,
    };

    return Response.json({
      status: 200,
      success: true,
      data: payload,
    });
  } catch (err: any) {
    return Response.json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
}
