import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      return Response.json(
        {
          status: 404,
          success: false,
          message: "Not found!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        status: 201,
        success: true,
        data: data,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    return Response.json({
      status: 500,
      success: false,
      message: err instanceof Error ? err.message : "Unexpected server error",
    });
  }
}
