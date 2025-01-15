import prisma from "@/lib/prisma";
import { checkJwt } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();
    const token = request.headers.get("authorization");
    let userId = "";
    let chart;

    if (!token) {
      return Response.json({
        status: 401,
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!productId || !quantity) {
      return Response.json(
        {
          status: 422,
          success: false,
          message: "Invalid input, there is a missing field",
        },
        { status: 422 }
      );
    }

    const decoded = await checkJwt(token);

    if (!decoded) {
      return Response.json({
        status: 401,
        success: false,
        message: "Unauthorized access",
      });
    }

    const checkProduct = await prisma.chart.findFirst({
      where: {
        productId: productId,
        userId: decoded.id  
      },
    });

    if (checkProduct) {
      const totalQuantity = checkProduct.quantity + quantity;
      chart = await prisma.chart.update({
        where: {
          id: decoded.id,
        },
        data: {
          quantity: totalQuantity,
        },
      });
    } else {
      chart = await prisma.chart.create({
        data: {
          userId: decoded.id,
          productId: productId,
          quantity: quantity,
          timeStamp: new Date(),
        },
      });
    }

    return Response.json({
      status: 200,
      success: true,
      message: "Success creating new chart",
      data: chart,
    });
  } catch (err: unknown) {
    return Response.json({
      status: 500,
      success: false,
      message: err instanceof Error ? err.message : "Unexpected server error",
    });
  }
}
