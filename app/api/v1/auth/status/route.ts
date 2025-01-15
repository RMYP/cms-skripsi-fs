import { getFeCookies } from "@/lib/tokenValue";

export async function GET(request: Request) {
  try {
    await getFeCookies();
    return Response.json({
      status: 200,
      success: true,
      message: "JWT token found!",
    });
  } catch (err: unknown) {
    return Response.json({
      status: 500,
      success: false,
      message: err instanceof Error ? err.message : "Unexpected Server Error",
    });
  }
}
