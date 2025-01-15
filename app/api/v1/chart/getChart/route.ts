import prisma from "@/lib/prisma";
import { type NextRequest } from "next/server";
import { checkJwt } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const offset = (page - 1) * limit;
    let userId;

    if (!token) {
      return Response.json(
        {
          status: 401,
          success: false,
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    const decoded = await checkJwt(token);

    if (decoded) {
      userId = decoded.id;
    }

    const data = await prisma.chart.findMany({
      where: { userId: userId },
      skip: offset,
      take: limit,
      include: {
        product: true
      }
    });

    if (!data) {
      return Response.json(
        {
          status: 404,
          success: false,
          message: "Not Found!",
        },
        { status: 404 }
      );
    }

    const count = await prisma.chart.count({ where: { userId: userId } });

    return Response.json(
      {
        status: 200,
        success: true,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          pageItems: data.length,
          nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
          prevPage: page > Math.ceil(count / limit) ? page - 1 : null,
        },
        data: data,
      },
      { status: 200 }
    );
  } catch (err) {
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
