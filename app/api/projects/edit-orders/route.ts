import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "../../verify-token";
import { Project } from "@/app/generated/prisma/client";

export async function PUT(req: NextRequest) {
  const isValid = await verifyToken(req);
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "toaster.for-extra-security" },
      { status: 401 },
    );
  }

  const data = await req.json();

  try {
    await Promise.all(
      data.map(({ id, order }: Project) =>
        prisma.project.update({
          where: { id },
          data: { order },
        }),
      ),
    );

    return NextResponse.json({
      success: true,
      message: "toaster.edited-successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "toaster.error" },
      { status: 500 },
    );
  }
}
