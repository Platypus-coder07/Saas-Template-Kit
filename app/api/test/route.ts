import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Testing Prisma...");

    const result = await prisma.user.findMany({
      take: 1,
    });

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Prisma Error:", error);

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      },
    );
  }
}
