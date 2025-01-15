import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { updatedProducts } = await request.json();

    console.log(updatedProducts)
    if (!Array.isArray(updatedProducts)) {
      return Response.json(
        {
          status: 400,
          success: false,
          message: "Invalid payload format. 'updatedProducts' must be an array.",
        },
        { status: 400 }
      );
    }

    const results = [];

    for (const product of updatedProducts) {
      const { id, quantity } = product;

      if (!id || typeof quantity !== "number") {
        results.push({
          id,
          success: false,
          message: "Invalid product data",
        });
        continue;
      }

      const checkChart = await prisma.chart.findUnique({
        where: { id },
        include: { product: true },
      });

      if (!checkChart) {
        results.push({
          id,
          success: false,
          message: "Not Found!",
        });
        continue;
      }

      const currentQuantity = checkChart.product.quantity;

      if (currentQuantity < quantity) {
        results.push({
          id,
          success: false,
          message: "Not enough stock",
        });
        continue;
      }

      const newPrice = quantity * checkChart.totalPrice;

      const updateChart = await prisma.chart.update({
        where: { id },
        data: {
          quantity,
          totalPrice: newPrice,
        },
      });

      console.log("updateChart", updateChart)
      results.push({
        id,
        success: true,
        message: "Successfully updated",
        data: updateChart,
      });
    }

    console.log(results)
    return Response.json(
      {
        status: 200,
        success: true,
        message: "Batch process completed",
        results,
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
