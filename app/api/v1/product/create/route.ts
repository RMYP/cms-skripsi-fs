import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const { name, price, quantity, category, tag } = await request.json();

    if (!name || !price || !quantity || !category || !tag) {
      return Response.json(
        {
          status: 422,
          success: false,
          message: "Invalid input, there is a missing field",
        },
        { status: 422 }
      );
    }

    const data = await prisma.product.create({
      data: {
        id: randomUUID(),
        productName: name,
        price: price,
        quantity: quantity,
        categoryId: category,
        tag: tag,
      },
    });

    return Response.json({
      status: 200,
      success: true,
      message: "Success creating new product",
      data: data
    });

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
