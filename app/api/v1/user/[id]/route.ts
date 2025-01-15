import prisma from "@/lib/prisma";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/envConfig";
import { checkAuthorizationJwt } from "@/lib/jwt";
import bcrypt from "bcrypt";
import { SALT } from "@/lib/envConfig";

interface JwtPayloadWithId extends jwt.JwtPayload {
  id: string;
  email: string;
  user: string;
  iat: number;
  exp: number;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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

    const decodeToken = jwt.verify(token[1], JWT_SECRET) as JwtPayloadWithId;

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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get("authorization");
    const { password } = await request.json();

    if (!token) {
      return Response.json(
        {
          status: 404,
          success: false,
          message: "Account not found",
        },
        { status: 404 }
      );
    }

    await checkAuthorizationJwt(token, id);

    const authId = await prisma.auth.findFirst({
      where: {
        user: {
          id: id,
        },
      },
      select: {
        id: true,
      },
    });

    if (!authId?.id) {
      return Response.json({
        status: 404,
        success: false,
        message: "Account not found",
      });
    }

    const hashed = bcrypt.hashSync(password, SALT);

    await prisma.auth.update({
      where: {
        id: authId.id,
      },
      data: {
        password: hashed,
      },
    });

    return Response.json(
      { status: 200, success: true, message: "Success Updating Password" },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      "success" in err &&
      "message" in err
    ) {
      console.log(err.message);
      return Response.json({
        status: err.status,
        success: false,
        message: err.message,
      });
    }
    return Response.json(
      {
        status: 500,
        success: false,
        message: err instanceof Error ? err.message : "Unexpected server error",
      },
      { status: 500 }
    );
  }
}
