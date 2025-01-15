import prisma from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const offset = (page - 1) * limit;

    const data = await prisma.product.findMany({
      skip: offset,
      take: limit,
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

    const count = await prisma.product.count();

    return Response.json(
      {
        status: 200,
        success: true,
        pagination: {
            totalPage: Math.ceil(count/limit),
            currentPage: page,
            pageItems: data.length,
            nextPage: page < Math.ceil(count/limit) ? page + 1 : null,
            prevPage: page > Math.ceil(count/limit) ? page - 1 : null
        },
        data: data,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
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
