import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {updatedProducts} = await request.json();

    console.log(updatedProducts.id)
    if (!updatedProducts.id || !updatedProducts.quantity) {
      return Response.json(
        {
          status: 400,
          success: false,
          message:
            "Invalid payload format. 'id' must be a string and 'quantity' must be a number.",
        },
        { status: 400 }
      );
    }

    const checkChart = await prisma.chart.findUnique({
      where: { id: updatedProducts.id },
      include: { product: true },
    });

    if (!checkChart) {
      return Response.json(
        {
          status: 404,
          success: false,
          message: "Product not found!",
        },
        { status: 404 }
      );
    }

    const currentQuantity = checkChart.product.quantity;

    if (currentQuantity < updatedProducts.quantity) {
      return Response.json(
        {
          status: 400,
          success: false,
          message: "Not enough stock.",
        },
        { status: 400 }
      );
    }

    const newPrice = updatedProducts.quantity * checkChart.product.price;

    const updatedChart = await prisma.chart.update({
      where: { id: updatedProducts.id },
      data: {
        quantity: updatedProducts.quantity,
        totalPrice: newPrice,
      },
    });

    return Response.json(
      {
        status: 200,
        success: true,
        message: "Product successfully updated.",
        data: updatedChart,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : err);
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
